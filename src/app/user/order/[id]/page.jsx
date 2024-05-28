import OrderDetailPage from "@/components/user/OrderDetailPage";

export default function UserOrderDetailPage({ params }) {
  const { id } = params;
  
  return <OrderDetailPage paymentId={id}/>;
}
