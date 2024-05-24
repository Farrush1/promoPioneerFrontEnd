import CardProduct from "@/components/CardProduct";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <main className="xl:max-w-6xl pt-16 mx-auto px-4 xl:px-0">
      <Carousel />

      {/* contoh penggunaan card menggunakan grid */}
      <div className="grid xl:grid-flow-row grid-rows-2-2 auto-cols-max gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <CardProduct />
      </div>
      <h1>Home</h1>
    </main>
  );
}


