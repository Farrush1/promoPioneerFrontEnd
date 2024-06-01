import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "Homepage Promo Pioneer",
  description: "Find your product mom and baby with big disount here!",
  keywords: ["promo", "pioneer", "baby", "mom", "baby", "discount"],
  icons: {
    icon: "/logo-orange.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light">
      <body className={sourceSans3.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
