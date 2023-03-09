import { z } from 'zod';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const bodySchema = z.object({
      Status: z.string(),
      TradeInfo: z.string(),
    });

    const { Status, TradeInfo } = await bodySchema.parseAsync(body);

    console.log(await readBody(event));

    if (Status !== 'SUCCESS') throw new Error();

    const JSONData: { Result: { MerchantOrderNo: string } } = JSON.parse(
      aesDecrypt(TradeInfo),
    );

    console.log(JSONData);

    const { Result } = JSONData;

    const db = useDB();

    console.log(db.orders);

    const order = db.orders.find(({ id }) => id === Result.MerchantOrderNo);

    if (!order) throw new Error();

    console.log(order);

    order.paid = true;

    console.log(order);

    return sendNoContent(event);
  } catch (error) {
    return sendNoContent(event);
  }
});
