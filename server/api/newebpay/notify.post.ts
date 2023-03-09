export default defineEventHandler(async (event) => {
  try {
    console.log(getRouterParams(event));
    console.log(await readBody(event));
    console.log(getQuery(event));

    return { success: true };
  } catch (error) {
    return { success: false };
  }
});
