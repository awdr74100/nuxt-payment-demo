import { z } from 'zod';
import { stringify } from 'node:querystring';

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
    ItemDesc: string;
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

    const qs = stringify({
      Status: JSONData.Status,
      MerchantID: JSONData.Result.MerchantID,
      Amt: JSONData.Result.Amt,
      MerchantOrderNo: JSONData.Result.MerchantOrderNo,
      EscrowBank: JSONData.Result.EscrowBank,
      ItemDesc: JSONData.Result.ItemDesc,
      PaymentType: JSONData.Result.PaymentType,
      PayTime: JSONData.Result.PayTime,
      PayBankCode: JSONData.Result.PayBankCode,
    });

    return sendRedirect(event, `/result?${qs}`);
  } catch (error) {
    return sendRedirect(event, `/result?Status=FAIL`);
  }
});
