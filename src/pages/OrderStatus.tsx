import React from 'react';
import { useParams } from 'react-router-dom';

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [status, setStatus] = React.useState<OrderStatus>("pending");

  React.useEffect(() => {
    // Simulate fetching order status
    setTimeout(() => {
      setStatus("delivered");
    }, 2000);
  }, [orderId]);

  return (
    <div>
      <h1>Order Status</h1>
      <p>Order ID: {orderId}</p>
      <p>Status: {status}</p>

      {status === ("cancelled" as const) && (
        <p>Your order has been cancelled.</p>
      )}

      {status === "delivered" && (
        <p>Your order has been delivered.</p>
      )}
    </div>
  );
};

export default OrderStatusPage;
