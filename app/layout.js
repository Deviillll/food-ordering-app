import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Nunito({
  weight: [ '300', '500', '600', '700', ],
   subsets: ["latin"] });

export const metadata = {
  title: "Food Bay",
  description: "Food Bay is a food delivery service and  that provide best food in your area Lahore resturant, food delivery, food, food delivery service, food delivery in lahore",
   
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      
        

      
      <body className={inter.className} >
       <div className="overflow-x-hidden"> 
       <Navbar />
        {children}
        <Footer />
       </div>
        </body>
    </html>
  );
}
