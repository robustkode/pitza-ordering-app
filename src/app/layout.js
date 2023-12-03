import { AppProvider } from "@/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Pitza hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={montserrat.className}>
        <main>
          <AppProvider>
            <Toaster />
            <div className="main-container grid-Container">
              <Header />
              <div className=" mx-auto p-4 max-w-4xl md:px-0">{children}</div>
              <div className="">
                <Footer />
              </div>
            </div>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
