import { HeroSection } from "../components/specific/HeroSection";
import { BrandRibbon } from "../components/specific/BrandRibbon";
import { Services } from "../components/specific/Services";
import { Offers } from "../components/specific/Offers";
import { TrendingProducts } from "../components/specific/TrendingProducts";
import { Testimonials } from "../components/specific/Testimonials";
export const DashBoard = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <BrandRibbon />
      <Services />
      <BrandRibbon />
      <Offers />
      <BrandRibbon />
      <TrendingProducts />
      <BrandRibbon />
      <Testimonials />
    </div>
  );
};
