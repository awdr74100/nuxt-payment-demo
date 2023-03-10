import { z } from 'zod';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const bodySchema = z.object({
      Status: z.string(),
      TradeInfo: z.string(),
    });

    const { Status, TradeInfo } = await bodySchema.parseAsync(body);

    if (Status !== 'SUCCESS') throw new Error();

    console.log(TradeInfo);
    console.log(aesDecrypt(TradeInfo));
    console.log(JSON.parse(aesDecrypt(TradeInfo)));

    // return sendNoContent(event);
    return sendRedirect(event, `/result/${'success'}`);
  } catch (error) {
    return sendRedirect(event, `/result/${'fail'}`);
    // return sendNoContent(event);
  }
});
