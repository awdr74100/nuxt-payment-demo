import { z } from 'zod';
import { stringify } from 'node:querystring';
import { createCipheriv, createHash } from 'node:crypto';
import getURL from 'requrl';

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);

    const paramsSchema = z.object({
      id: z.string().length(17),
    });

    const { id } = await paramsSchema.parseAsync(params);

    const db = useDB();

    const order = db.orders.find((order) => order.id === id);

    if (!order) throw new Error('not found order');

    const config = useRuntimeConfig();

    const qs = stringify({
      MerchantID: config.NEWEBPAY_MERCHANT_ID,
      RespondType: 'JSON',
      TimeStamp: order.updatedAt,
      Version: '2.0',
      MerchantOrderNo: order.id,
      Amt: order.amount,
      ItemDesc: order.title,
      Email: order.email,
      EmailModify: 0,
      // ReturnURL: `${getURL(event.node.req)}/orders`,
      NotifyURL: `${getURL(event.node.req)}/api/newebpay/notify`,
    });

    const TradeInfo = aesEncrypt(qs);
    const TradeSha = shaEncrypt(
      `HashKey=${config.NEWEBPAY_HASH_KEY}&${TradeInfo}&HashIV=${config.NEWEBPAY_HASH_IV}`,
    ).toUpperCase();

    return {
      success: true,
      order,
      mpg: {
        MerchantID: config.NEWEBPAY_MERCHANT_ID,
        TradeInfo,
        TradeSha,
        Version: '2.0',
      },
    };
  } catch (error) {
    return { success: false };
  }
});

/**
 * Use crypto-js package
 */
// const crypto = useCrypto();

// const TradeInfo = crypto.aesEncrypt(query);
// const TradeSha = crypto
//   .shaEncrypt(
//     `HashKey=${config.NEWEBPAY_HASH_KEY}&${TradeInfo}&HashIV=${config.NEWEBPAY_HASH_IV}`,
//   )
//   .toUpperCase();
