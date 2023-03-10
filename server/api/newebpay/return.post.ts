import { z } from 'zod';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const bodySchema = z.object({
      Status: z.string(),
      TradeInfo: z.string(),
    });

    const { Status, TradeInfo } = await bodySchema.parseAsync(body);

    console.log('Bang!!');
    console.log(Status, TradeInfo);

    // return sendNoContent(event);
    return sendRedirect(event, `/result/${'success'}`);
  } catch (error) {
    return sendRedirect(event, `/result/${'fail'}`);
    // return sendNoContent(event);
  }
});
