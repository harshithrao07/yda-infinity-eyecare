import { Outfit, Playfair_Display, Figtree, Oswald } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SlowScroll from "@/components/SlowScroll";
import Footer from "@/components/Footer";
import WhatsAppContactButton from "@/components/WhatsAppContactButton";

const outfit = Outfit({
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "Infinity Eye Care",
  description:
    "At Infinity Eye Care, we provide comprehensive eye exams, a wide range of lenses and frames, and expert Contact Lens fittings.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${figtree.variable} ${oswald.variable}`}
    >
      <body className={`${outfit.className} min-h-screen`}>
        <Navigation />
        <WhatsAppContactButton />
        {/* <SlowScroll /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
