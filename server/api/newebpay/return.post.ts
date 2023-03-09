export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    console.log('Return: ');
    console.log(body);

    return sendNoContent(event);
  } catch (error) {
    return sendNoContent(event);
  }
});
