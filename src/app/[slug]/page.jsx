import React from "react";
import FilterPage from "@/components/filter/FilterPage";

export async function generateMetadata({ params }) {
  const category = params.slug;
  return {
    title: decodeURIComponent(category),
  };
}
const Page = ({params}) => {
  const category = params.slug;
  return <FilterPage categoryParams={category} />
};

export default Page;
