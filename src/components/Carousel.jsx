/* eslint-disable react/jsx-key */
"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/bundle";
import { useEffect, useState } from "react";

export default function Carousel() {
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const [promoListing, setPromoListing] = useState([]);

  useEffect(() => {
    const promoList = [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1554343594-1c9d305bd51f?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1595930013415-ca6958dc8a8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ];
    // const fetchPromoListing = async () => {
    //   try {
    //     const res = await fetch("your link");
    //     const data = await res.json();
    //     setPromoListing(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    setPromoListing(promoList);
  }, []);

  return (
    <div className="xl:max-w-6xl mt-10 mx-auto">
      <Swiper
        effect={"fade"}
        // autoplay={true}
        navigation={true}
        modules={[EffectFade]}
        className="mySwiper">
        {promoListing &&
          promoListing.length > 0 &&
          promoListing.map(listing => (
            <SwiperSlide>
              <Link href={`${listing.id}`}>
                <div
                  style={{
                    background: `url(${listing.url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-52 md:h-[420px] object-cover rounded-lg"
                  key={listing.id}></div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
