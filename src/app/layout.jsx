import { Inter, Manrope, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "../lib/redux/provider";
import "./globals.css";
import LoadingScreen from "@/components/layouts/LoadingScreen";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "ERP Cloud 17 HR Mangement System",
  description: "The Smart HR Mangement solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${manrope.className}  antialiased `}
        suppressHydrationWarning
      >
        <NextTopLoader showSpinner={false} />
        <Toaster />

        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
