export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    console.log(typeof body);
    console.log(body.Status);
    console.log(body.MerchantID);
    console.log(body.Version);
    console.log(body.TradeInfo);
    console.log(body.TradeSha);

    return sendNoContent(event);
    // return { success: true };
  } catch (error) {
    return { success: false };
  }
});
