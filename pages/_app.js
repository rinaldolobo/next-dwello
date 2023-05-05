import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.scss";
import localFont from "next/font/local";
import ErrorBoundary from "@/components/errorBoundary";

const neusa = localFont({
  src: [
    {
      path: "../public/fonts/8b6c8bfb-dbab-47fb-9b4b-9fe6554f0fe0.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../public/fonts/87cbd261-98cd-447c-96bd-9b224dd41d82.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/7275026b-d221-454c-abae-8ca6ac9a5672.woff2",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../public/fonts/c586f736-84bd-4884-8ea2-5e745504dea3.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/91474296-9e73-432e-9824-0031aea2bf7a.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/6195078f-69f6-4b98-be9a-73fc55525711.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  display: "swap",
});

const dwelloicfont = localFont({
  src: "../public/fonts/dwelloicfont.woff",
  variable: "--font-dwelloIcons",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${neusa.className} ${dwelloicfont.variable}`}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </main>
  );
}
