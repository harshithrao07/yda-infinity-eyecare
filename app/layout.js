import { Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ShaderBackground from "@/components/shader-background";

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
      <body className={`${outfit.className} min-h-screen bg-[#f8f8f8]`}>
        <ShaderBackground>
          <Navigation />
          {children}
        </ShaderBackground>
      </body>
    </html>
  );
}
