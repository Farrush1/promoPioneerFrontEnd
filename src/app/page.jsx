import CardProduct from "@/components/CardProduct";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <main className="h-[9999px] xl:max-w-6xl mx-auto px-4 xl:px-0">
      <Carousel />

      {/* contoh penggunaan card menggunakan grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <CardProduct />
      </div>
      <h1>Home</h1>
    </main>
  );
}
