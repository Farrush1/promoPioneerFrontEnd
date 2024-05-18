import DetailUserPage from "@/components/dashboard/DetailUserPage";

export default function SpecificUserPage({params}) {
  const {id} = params
  return <DetailUserPage userParams= {id}/>;
}
