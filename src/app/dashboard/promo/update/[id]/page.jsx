import CreateFormPage from "@/components/dashboard/promo/PromoFormPage";

export default async function Promo({ params }) {
  const { id } = params;

  return <CreateFormPage id={id} />;
}
