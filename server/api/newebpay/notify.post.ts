import { z } from 'zod';

interface JSONData {
  Status: string;
  Message: string;
  Result: {
    MerchantID: string;
    Amt: number;
    TradeNo: string;
    MerchantOrderNo: string;
    RespondType: string;
    IP: string;
    EscrowBank: string;
    PaymentType: string;
    PayTime: string;
    PayerAccount5Code: string;
    PayBankCode: string;
  };
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const bodySchema = z.object({
      Status: z.string(),
      TradeInfo: z.string(),
    });

    const { Status, TradeInfo } = await bodySchema.parseAsync(body);

    if (Status !== 'SUCCESS') throw new Error();

    const JSONData: JSONData = JSON.parse(aesDecrypt(TradeInfo));

    const db = useDB();

    const order = db.orders.find(
      ({ id }) => id === JSONData.Result.MerchantOrderNo,
    );

    if (!order) throw new Error();

    order.paid = true;

    return sendNoContent(event);
  } catch (error) {
    return sendNoContent(event);
  }
});
