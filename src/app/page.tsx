import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import MenuSection from "@/components/menu/MenuSection";
import Bakery from "@/components/Bakery";
import Gallery from "@/components/Gallery";
import Journey from "@/components/Journey";
import InstagramStrip from "@/components/InstagramStrip";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import LocationExperience from "@/components/LocationExperience";
import ReservationSection from "@/components/reservation/ReservationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Hero />
      <About />
      <WhyChooseUs />
      <MenuSection />
      <Bakery />
      <Gallery />
      <Journey />
      <InstagramStrip />
      <Testimonials />
      <Process />
      <LocationExperience />
      <ReservationSection />
      <Footer />
    </main>
  );
}
