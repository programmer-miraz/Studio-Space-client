import Benner from "@/components/Benner";
import Cetagory from "@/components/cetagory";
import About from "@/components/How-abt-footer/About";
import Footer from "@/components/How-abt-footer/Footer";
import Host_Guarantee from "@/components/How-abt-footer/Host_Guarantee";
import How_Booking from "@/components/How-abt-footer/How_Booking";
import Feature_studios from "@/components/Studion";




export default function Home() {
  return (
    <div>
      <Benner></Benner>
     <Feature_studios></Feature_studios>
      <Cetagory></Cetagory>
      <How_Booking></How_Booking>
      <Host_Guarantee></Host_Guarantee>
      <About></About>
      <Footer></Footer>


    </div>
  );
}
