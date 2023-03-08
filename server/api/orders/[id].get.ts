import { z } from 'zod';

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);

    const paramsSchema = z.object({
      id: z.string().min(10),
    });

    const { id } = await paramsSchema.parseAsync(params);

    const db = useDB();

    const order = db.orders.find((order) => order.id === id);

    if (!order) throw new Error('not found order');

    return { success: true, order };
  } catch (error) {
    return { success: false };
  }
});
