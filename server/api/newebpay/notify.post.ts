import { z } from 'zod';
import { createDecipheriv } from 'node:crypto';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const bodySchema = z.object({
      Status: z.string(),
      TradeInfo: z.string(),
    });

    const { Status, TradeInfo } = await bodySchema.parseAsync(body);

    if (Status !== 'SUCCESS') throw new Error();

    const { Result }: { Result: { MerchantOrderNo: string } } = JSON.parse(
      aesDecrypt(TradeInfo),
    );

    console.log(Result.MerchantOrderNo);

    const db = useDB();

    const order = db.orders.find(({ id }) => id === Result.MerchantOrderNo);

    if (!order) throw new Error();

    order.paid = true;

    console.log(order);

    return sendNoContent(event);
  } catch (error) {
    return sendNoContent(event);
  }
});
