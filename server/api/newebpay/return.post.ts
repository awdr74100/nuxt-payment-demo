export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    console.log('Return: ');
    console.log(body);

    // return sendNoContent(event);
    return sendRedirect(event, `/result/${'success'}`);
  } catch (error) {
    return sendRedirect(event, `/result/${'fail'}`);
    // return sendNoContent(event);
  }
});
