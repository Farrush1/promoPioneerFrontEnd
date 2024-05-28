"use client";

import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  const pathname = usePathname();
  const isNestedDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <>
      {!isNestedDashboardRoute && (
        <footer className="bg-gradient-to-l mt-6 from-orange-600 to-orange-500 text-white shadow-t">
          <div className="xl:max-w-6xl mx-auto px-4 py-8 xl:py-14 xl:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex items-start flex-row gap-6 lg:gap-0 flex-wrap text-sm justify-between">
              <div className="flex flex-col justify-center">
                <Image
                  src={"/logo-white.svg"}
                  alt="logo"
                  width={120}
                  height={120}
                  className="w-32 lg:mx-auto lg:w-40"
                />
                <p className="font-sans font-bold dark:text-white text-xl lg:text-2xl">
                  Promo Pioneer
                </p>
              </div>
              <div>
                <h1 className="font-bold mb-4">Developer</h1>
                <ul className="space-y-2">
                  <li>Muhammad Farras Amali</li>
                  <li>Muhammad Syaifullah Al Arief</li>
                  <li>Fahdi Alan Fawwazi</li>
                  <li>Muhammad Luthfi Zuhair</li>
                  <li>Weli Erlina</li>
                  <li>Mohammad Hanif Fadhal</li>
                </ul>
              </div>
              <div>
                <h1 className="font-bold mb-4">Customer Service</h1>
                <ul className="space-y-2">
                  <li className="hover:opacity-75 duration-300 cursor-pointer">
                    Help
                  </li>
                  <li className="hover:opacity-75 duration-300 cursor-pointer">
                    Payment Methods
                  </li>
                  <li className="hover:opacity-75 duration-300 cursor-pointer">
                    Track Orders
                  </li>
                  <li className="hover:opacity-75 duration-300 cursor-pointer">
                    Profile
                  </li>
                  <li className="hover:opacity-75 duration-300 cursor-pointer">
                    Free Shipping
                  </li>
                  <li className="hover:opacity-75 duration-300 cursor-pointer">
                    Contact
                  </li>
                </ul>
              </div>
              <div>
                <h1 className="font-bold mb-4">Delivery</h1>
                <ul className="space-y-2">
                  <li className="hover:opacity-75 duration-300">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/New_Logo_JNE.png/1200px-New_Logo_JNE.png"
                      alt="jne"
                      className="w-16 h-8 object-contain bg-white p-2 rounded-md"
                    />
                  </li>
                  <li className="hover:opacity-75 duration-300">
                    <img
                      src="https://play-lh.googleusercontent.com/y3-hbWMz3Wdim6LgaSQUPqHgpvVpQd7nOor9Ca1SZ2LwLK-5upY-ARkl91DqQxOmwS4"
                      alt="pos aja"
                      className="w-16 h-8 object-contain bg-white px-2 rounded-md"
                    />
                  </li>
                  <li className="hover:opacity-75 duration-300">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfzVC7tKrUrmYXiaK0L3a0DEBT34LAJM65Yg&s"
                      alt="tiki"
                      className="w-16 h-8 object-contain bg-white rounded-md"
                    />
                  </li>
                  <li className="hover:opacity-75 duration-300">
                    <img
                      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPaySFEABMm1yx-iftFWLRuq3Ci5yvjxKh-_6u1RQYId0Qr9v9p-HrImaUOfHwvHiXX9PVigLx4Dn-Infgf5R1uVChSf_E1JEgwXzQ0KGidVm8GKry1wJ-HYRG4lLUVZ2L2foy3W2RpNQ/s1600/logo+esl+express.png"
                      alt="esl express"
                      className="w-16 h-8 object-contain py-1 bg-white rounded-md"
                    />
                  </li>
                </ul>
              </div>
              <div>
                <h1 className="font-bold mb-4">Payment</h1>
                <ul className="space-y-2">
                  <li className="hover:opacity-75 duration-300">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
                      alt="BCA"
                      className="w-16 h-8 object-contain bg-white p-2 rounded-md"
                    />
                  </li>
                  <li className="hover:opacity-75 duration-300">
                    <img
                      src="https://kjpphmr.co.id/wp-content/uploads/2022/01/Logo-BNI.png"
                      alt="BNI"
                      className="w-16 h-8 object-contain bg-white px-2 rounded-md"
                    />
                  </li>
                  <li className="hover:opacity-75 duration-300">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/2560px-BRI_2020.svg.png"
                      alt="BRI"
                      className="w-16 h-8 px-2 object-contain bg-white rounded-md"
                    />
                  </li>
                  <li className="hover:opacity-75 duration-300">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
                      alt="mandiri"
                      className="w-16 h-8 object-contain py-2 px-2 bg-white rounded-md"
                    />
                  </li>
                </ul>
              </div>
              <div>
                <h1 className="font-bold mb-4">Follow Us</h1>
                <ul className="space-y-2">
                  <Link
                    href={"/"}
                    className="hover:opacity-75 duration-300 flex gap-2">
                    <FaFacebook className="text-lg" />
                    <span>Promo Pioneer</span>
                  </Link>
                  <Link
                    href={"/"}
                    className="hover:opacity-75 duration-300 flex gap-2">
                    <AiFillInstagram className="text-lg" />
                    <span>promo_pioneer</span>
                  </Link>
                  <Link
                    href={"/"}
                    className="hover:opacity-75 duration-300 flex gap-2">
                    <FaXTwitter className="text-lg" />
                    <span>@promo_pioneer</span>
                  </Link>
                  <Link
                    href={"/"}
                    className="hover:opacity-75 duration-300 flex gap-2">
                    <BsLinkedin className="text-lg" />
                    <span>Promo Pioneer</span>
                  </Link>
                  <Link
                    href={"/"}
                    className="hover:opacity-75 duration-300 flex gap-2">
                    <FaGithub className="text-lg" />
                    <span>Promo Pioneer</span>
                  </Link>
                  <Link
                    href={"/"}
                    className="hover:opacity-75 duration-300 flex gap-2">
                    <RiWhatsappFill className="text-lg" />
                    <span>0889 7766 5544</span>
                  </Link>
                </ul>
              </div>
              <div>
                <h1 className="font-bold mb-4">Security</h1>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/83/OJK_Logo.png"
                  alt="OJK"
                  className="w-24 h-12 object-contain p-1 bg-white rounded-md"
                />
              </div>
            </div>
          </div>
          <p className="text-center text-sm py-2 bg-white text-slate-800">
            Copyright &copy; 2024 - PromoPioneer
          </p>
        </footer>
      )}
    </>
  );
}
