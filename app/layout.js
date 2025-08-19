import { Outfit } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Infinity Eye Care",
  description:
    "At Infinity Eye Care, we provide comprehensive eye exams, a wide range of lenses and frames, and expert Contact Lens fittings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
