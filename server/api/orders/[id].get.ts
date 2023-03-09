import { z } from 'zod';
import { stringify } from 'node:querystring';
import { createCipheriv, createHash } from 'node:crypto';

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);

    const paramsSchema = z.object({
      id: z.string().length(20),
    });

    const { id } = await paramsSchema.parseAsync(params);

    const db = useDB();

    const order = db.orders.find((order) => order.id === id);

    if (!order) throw new Error('not found order');

    const config = useRuntimeConfig();

    const cipher = createCipheriv(
      'aes-256-cbc',
      config.NEWEBPAY_HASH_KEY,
      config.NEWEBPAY_HASH_IV,
    );

    const qs = stringify({
      MerchantID: config.NEWEBPAY_MERCHANT_ID,
      RespondType: 'JSON',
      TimeStamp: order.updatedAt,
      Version: '2.0',
      MerchantOrderNo: order.id,
      Amt: order.amount,
      ItemDesc: order.title,
      Email: order.email,
    });

    const TradeInfo = cipher.update(qs, 'utf-8', 'hex') + cipher.final('hex');

    const TradeSha = createHash('sha256')
      .update(
        `HashKey=${config.NEWEBPAY_HASH_KEY}&${TradeInfo}&HashIV=${config.NEWEBPAY_HASH_IV}`,
      )
      .digest('hex')
      .toUpperCase();

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

    return {
      success: true,
      order,
      MerchantID: config.NEWEBPAY_MERCHANT_ID,
      TradeInfo,
      TradeSha,
      Version: '2.0',
    };
  } catch (error) {
    return { success: false };
  }
});
