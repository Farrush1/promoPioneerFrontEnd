/* eslint-disable @next/next/no-img-element */
'use client';

import AOS from "aos";
import CardProduct from "@/components/CardProduct";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { RiDiscountPercentFill } from "react-icons/ri";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productPromo, setProductsPromo] = useState([]);
  // console.log(products);

  // fetching disini
  useEffect(() => {
    AOS.init({
      duration: 500, // Durasi animasi dalam milidetik
    });
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        const products = data.products || [];
        setProducts(products);
        productFilterByPromo(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productFilterByPromo = products => {
    const filteredProduct = products.filter(
      product => product.PromoProduct.length > 0
    );

    console.log(filteredProduct);
    setProductsPromo(filteredProduct);
  };

  if (loading)
    return (
      <div className="relative h-screen w-screen ">
        <BiLoaderCircle className="absolute top-1/2 left-1/2 text-5xl animate-spin-slow duration-1000  text-orange-600" />
      </div>
    );

  return (
    <main className="xl:max-w-6xl pt-16 mx-auto px-4 xl:px-0">
      {/* hero 1 */}
      <div className="md:flex max-h-64 md:flex-row gap-2 my-8">
        <div className="w-full md:w-2/3">
          <Carousel style={"md:rounded-r-none"} />
        </div>
        <div className="md:w-1/3 hidden md:flex flex-col h-full justify-between">
          <Link href={"/category"}>
            <img
              className="object-cover w-full max-h-32 h-1/2 pb-1 rounded-tr-md"
              src="https://img.freepik.com/free-photo/paper-style-black-friday-assortment_23-2149074084.jpg?t=st=1716817263~exp=1716820863~hmac=24df03a9b92a60eb72bd7c1c8eb6960356cf56edd113f7d1871b906e50985e2c&w=1060"
              alt="Promo 1"
            />
          </Link>
          <Link href={"/category"}>
            <img
              className="object-cover w-full max-h-32 h-1/2 pt-1 rounded-br-md"
              src="https://img.freepik.com/premium-photo/happy-kid-celebration-halloween-party-child-backgroud-with-copy-space_916191-122640.jpg?w=1380"
              alt="Promo 1"
            />
          </Link>
        </div>
      </div>

      {/* special promo */}
      <div className="rounded-md shadow-md p-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-slate-800 font-bold md:text-3xl rounded-t-md">
            Special Promo
          </h1>
          <div className="bg-orange-500 text-xs animate-bounce-x text-white font-bold px-4 py-2 rounded-full flex gap-1 items-center">
            <RiDiscountPercentFill />
            <p className="">DISCOUNT 25%</p>
          </div>
        </div>
        <div className="grid xl:grid-flow-row grid-cols-2 auto-cols-max gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productPromo.map(product => (
            // contoh penggunaan component CardProduct
            <CardProduct
              promo={"Special Promo"} // opsional kalo product promo
              productId={product.id}
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.product_image}
              qty={product.stock}
            />
          ))}
        </div>
      </div>

      {/* hero 2 */}
      <div className="flex gap-12 my-14 md:py-28 flex-col md:flex-row">
        <div className="w-full flex gap-8 lg:gap-24 flex-col md:w-[40%] justify-between">
          <h1
            data-aos="fade-right"
            className="md:text-5xl text-4xl font-extrabold text-slate-800">
            Love Mom for Baby
          </h1>
          <div className="w-full min-h-60 md:hidden relative">
            <img
              className="max-w-96 rounded-md object-cover max-h-40"
              src="https://img.freepik.com/free-photo/cute-baby-with-stuffed-animal_23-2150573639.jpg?t=st=1716907375~exp=1716910975~hmac=1b192e5fbeecef66545281492d250e8d5527bbcff76511f8e439326847d4adc8&w=1060"
              alt="image 1"
            />
            <img
              className="ini max-w-96 absolute bottom-0 z-10 left-1/3 rounded-md object-cover max-h-40"
              src="https://img.freepik.com/free-photo/faceless-mother-with-naked-baby-infant-holding-mommy-s-finger-mum-spending-time-with-her-tiny-child-light-background_176532-13966.jpg?t=st=1716907530~exp=1716911130~hmac=1b96fe3fa792414f04d6443d399e5e2da8b85484c24ad9819cc4872b9c2a146e&w=1060"
              alt="image 1"
            />
          </div>
          <div className="space-y-8">
            <p data-aos="fade-right">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque officia consectetur enim, a, tempora obcaecati veniam
              tempore atque optio debitis delectus nesciunt earum error laborum
              eveniet laudantium maiores animi eos!
            </p>
            <button
              data-aos="fade-right"
              className="px-4 py-2 bg-orange-500 text-white font-bold rounded-full shadow-md hover:bg-slate-800 duration-300">
              Explore
            </button>
          </div>
        </div>
        <div className="w-[60%] hidden md:block md:relative">
          <img
            data-aos="zoom-in-left"
            className="max-w-[26rem] rounded-md object-cover max-h-48"
            src="https://img.freepik.com/free-photo/cute-baby-with-stuffed-animal_23-2150573639.jpg?t=st=1716907375~exp=1716910975~hmac=1b192e5fbeecef66545281492d250e8d5527bbcff76511f8e439326847d4adc8&w=1060"
            alt="image 1"
          />
          <img
            data-aos="zoom-in-left"
            className="ini max-w-[26rem] absolute bottom-0 z-10 left-1/3 rounded-md object-cover max-h-48"
            src="https://img.freepik.com/free-photo/faceless-mother-with-naked-baby-infant-holding-mommy-s-finger-mum-spending-time-with-her-tiny-child-light-background_176532-13966.jpg?t=st=1716907530~exp=1716911130~hmac=1b96fe3fa792414f04d6443d399e5e2da8b85484c24ad9819cc4872b9c2a146e&w=1060"
            alt="image 1"
          />
          <img
            data-aos="zoom-in-left"
            className="ini max-w-[26rem] hidden lg:absolute lg:block top-0 right-0 rounded-md object-cover max-h-48"
            src="https://img.freepik.com/free-photo/holding-hands_1112-1539.jpg?t=st=1716907998~exp=1716911598~hmac=844bfff3284e843094e4a0b4344a1e0def3764281abfab52fd16fad225b671a2&w=1060"
            alt="image 1"
          />
        </div>
      </div>

      {/* rekomendasi */}
      <div className="rounded-md shadow-md p-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-slate-800 font-bold md:text-3xl rounded-t-md">
            Rekomendasi
          </h1>
        </div>
        <div className="grid xl:grid-flow-row grid-cols-2 auto-cols-max gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map(product => (
            // contoh penggunaan component CardProduct
            <CardProduct
              productId={product.id}
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.product_image}
              qty={product.stock}
            />
          ))}
        </div>
      </div>

      {/* official brand */}
      <div className="my-14 md:py-24 space-y-24">
        <h1
          data-aos="zoom-in"
          className="md:text-5xl text-center text-4xl font-extrabold text-slate-800">
          Official Brand
        </h1>
        <div className="marquee-container w-full relative overflow-hidden h-14">
          <div className="flex w-fit animate-marquee">
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://id.mamypoko.com/content/dam/sites/common/images/logo-mamypoko-02.png"
              alt="Momy poko"
            />
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://www.sarihusada.co.id//assets/uploads/product/13-logo-970abc8f34fb4a24c5f1c1ef13e002ea.png"
              alt="SGM"
            />
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://www.indokids.co.id/assets/images/merk/sweety.png"
              alt="Sweety"
            />
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://logos-world.net/wp-content/uploads/2020/11/Johnsons-Baby-Symbol.png"
              alt="Johnson's"
            />
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://tokokamas.id/storage/brands/mybaby-logo.-WvlrNKA7no.png"
              alt="My Baby"
            />
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://careers.danone.com/content/corp/global/careers/id/en/brands/_jcr_content/root/container/brandscarousel_copy/specialized_nutrition_item/brandIconsLeft/item2.coreimg.png/1683891173235/bebelac-logo.png?fmt=png-alpha&fit=wrap"
              alt="Bebelac"
            />
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://kalbenutritionals.com/images/history/corporate/17_69_history_corporate.png"
              alt="Prenagen"
            />
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwGJCVnivqf1COCVXhup-ebFIUMEEiTdmtYzNxSrX5Lw&s"
              alt="Lactamil"
            />
            <img
              className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
              src="https://seeklogo.com/images/A/anmum-logo-4003102726-seeklogo.com.png"
              alt="Anmun"
            />
            <div className="flex">
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://id.mamypoko.com/content/dam/sites/common/images/logo-mamypoko-02.png"
                alt="Momy poko"
              />
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://www.sarihusada.co.id//assets/uploads/product/13-logo-970abc8f34fb4a24c5f1c1ef13e002ea.png"
                alt="SGM"
              />
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://www.indokids.co.id/assets/images/merk/sweety.png"
                alt="Sweety"
              />
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://logos-world.net/wp-content/uploads/2020/11/Johnsons-Baby-Symbol.png"
                alt="Johnson's"
              />
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://tokokamas.id/storage/brands/mybaby-logo.-WvlrNKA7no.png"
                alt="My Baby"
              />
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://careers.danone.com/content/corp/global/careers/id/en/brands/_jcr_content/root/container/brandscarousel_copy/specialized_nutrition_item/brandIconsLeft/item2.coreimg.png/1683891173235/bebelac-logo.png?fmt=png-alpha&fit=wrap"
                alt="Bebelac"
              />
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://kalbenutritionals.com/images/history/corporate/17_69_history_corporate.png"
                alt="Prenagen"
              />
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwGJCVnivqf1COCVXhup-ebFIUMEEiTdmtYzNxSrX5Lw&s"
                alt="Lactamil"
              />
              <img
                className="w-auto h-auto max-w-36 max-h-14 mr-7 inline-block"
                src="https://seeklogo.com/images/A/anmum-logo-4003102726-seeklogo.com.png"
                alt="Anmun"
              />
            </div>
          </div>
        </div>
        <p
          data-aos="zoom-in"
          className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          accusantium ullam nisi porro laudantium saepe beatae provident modi,
          repellat, esse facere! Numquam atque deleniti quidem architecto
          deserunt itaque ullam temporibus.
        </p>
      </div>

      {/* our products */}
      <div className="rounded-md shadow-md p-4 mb-24 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-slate-800 font-bold md:text-3xl rounded-t-md">
            Our Products
          </h1>
        </div>
        <div className="grid xl:grid-flow-row grid-cols-2 auto-cols-max gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map(product => (
            // contoh penggunaan component CardProduct
            <CardProduct
              productId={product.id}
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.product_image}
              qty={product.stock}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
