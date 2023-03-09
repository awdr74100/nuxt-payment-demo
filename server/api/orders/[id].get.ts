import { z } from 'zod';
import { stringify } from 'node:querystring';
// import CryptoJS from 'crypto-js';
// import { createCipheriv, createHash } from 'node:crypto';

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

    const query = stringify({
      MerchantID: config.NEWEBPAY_MERCHANT_ID,
      RespondType: 'JSON',
      TimeStamp: order.updatedAt,
      Version: '2.0',
      MerchantOrderNo: order.id,
      Amt: order.amount,
      ItemDesc: order.title,
      Email: order.email,
    });

    const crypto = useCrypto();

    const TradeInfo = crypto.aesEncrypt(query);
    const TradeSha = crypto
      .shaEncrypt(
        `HashKey=${config.NEWEBPAY_HASH_KEY}&${TradeInfo}&HashIV=${config.NEWEBPAY_HASH_IV}`,
      )
      .toUpperCase();

    // const TradeInfo = CryptoJS.AES.encrypt(
    //   query,
    //   CryptoJS.enc.Utf8.parse(config.NEWEBPAY_HASH_KEY),
    //   {
    //     iv: CryptoJS.enc.Utf8.parse(config.NEWEBPAY_HASH_IV),
    //     mode: CryptoJS.mode.CBC, // default
    //     padding: CryptoJS.pad.Pkcs7, // default
    //   },
    // ).toString(CryptoJS.format.Hex);

    // const TradeSha = CryptoJS.SHA256(
    //   `HashKey=${config.NEWEBPAY_HASH_KEY}&${TradeInfo}&HashIV=${config.NEWEBPAY_HASH_IV}`,
    // )
    //   .toString(CryptoJS.enc.Hex)
    //   .toUpperCase();

    // const query = stringify({
    //   MerchantId: config.NEWEBPAY_MERCHANT_ID,
    //   RespondType: 'JSON',
    //   TimeStamp: order.updatedAt,
    //   Version: '2.0',
    //   MerchantOrderNo: order.id,
    //   Amt: order.amount,
    //   ItemDesc: order.title,
    // });
    // console.log('-------------------');
    // console.log(query);

    // const cipher = createCipheriv(
    //   'aes-256-cbc',
    //   config.NEWEBPAY_HASH_KEY,
    //   config.NEWEBPAY_HASH_IV,
    // );
    // const encrypted =
    //   cipher.update(query, 'utf8', 'base64') + cipher.final('base64');

    // console.log('-------------------');
    // console.log(encrypted);

    // const hash = createHash('sha256')
    //   .update(
    //     `${config.NEWEBPAY_HASH_KEY}&${encrypted}&${config.NEWEBPAY_HASH_IV}`,
    //   )
    //   .digest('hex')
    //   .toUpperCase();

    // console.log('-------------------');
    // console.log(hash);

    // return {
    //   success: true,
    //   order,
    //   TradeInfo: encrypted,
    //   TradeSha: hash,
    //   MerchantId: config.NEWEBPAY_MERCHANT_ID,
    //   Version: '2.0',
    // };

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
