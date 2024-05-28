import BioUserPage from "@/components/user/BioUserPage";

export default async function Page() {
  // const bio = await fetch("http://localhost:5000/api/users/bio", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  // });
  // const data = await bio.json();
  // console.log(data);
  return <BioUserPage />;
}
