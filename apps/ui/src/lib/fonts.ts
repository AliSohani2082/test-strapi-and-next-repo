import { Roboto } from "next/font/google"
import localFont from "next/font/local"

export const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  variable: "--font-roboto",
})

export const fontSans = localFont({
  src: [
    {
      path: "./fonts/IRANSansX-Regular.woff",
      weight: "400",
    },
    {
      path: "./fonts/IRANSansX-Medium.woff",
      weight: "500",
    },
    {
      path: "./fonts/IRANSansX-DemiBold.woff",
      weight: "600",
    },
    {
      path: "./fonts/IRANSansX-Bold.woff",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-ir-sans",
  preload: true,
})
