import { z } from 'zod';
import { randomBytes } from 'node:crypto';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const bodySchema = z.object({
      email: z.string().email(),
      title: z.string().min(6),
      amount: z.number().gt(0),
    });

    const { email, title, amount } = await bodySchema.parseAsync(body);

    const db = useDB();

    const order = {
      id: randomBytes(16).toString('hex'),
      email,
      title,
      amount,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    };

    db.orders.push(order);

    // return sendRedirect(event, 'https://awdr74100.github.io');

    return { success: true, orderId: order.id };

    // return sendRedirect(event, `/${order.id}`);
  } catch (error) {
    return { success: false };
  }
});
