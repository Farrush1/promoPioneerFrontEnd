import Carousel from "@/components/Carousel";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-[9999px] xl:max-w-6xl mx-auto px-4 xl:px-0">
      <Carousel />
      <h1>Home</h1>
    </main>
  );
}
