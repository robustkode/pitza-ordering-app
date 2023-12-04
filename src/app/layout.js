import { AppProvider } from "@/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/layout/ScrollTop";
import { OrdersProvider } from "@/OrdersContext";

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
            <OrdersProvider>
              <Toaster />
              <div className="main-container">
                <Header />
                <div className=" body-container mx-auto p-4 max-w-4xl md:px-2">
                  {children}
                </div>

                <Footer />

                <ScrollToTop />
              </div>
            </OrdersProvider>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
