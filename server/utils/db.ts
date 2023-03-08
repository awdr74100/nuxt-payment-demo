interface Order {
  id: string;
  email: string;
  title: string;
  amount: number;
  createdAt: number;
  updatedAt: number;
}

let _orders: Order[];

export const useDB = () => {
  if (!_orders) {
    _orders = [];
  }

  return { orders: _orders };
};
