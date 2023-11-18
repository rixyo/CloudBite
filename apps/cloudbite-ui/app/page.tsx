import Catagorie from "@/components/catagories/catagorie";
import LandingPage from "@/components/landingpages/landing-page-desktop";
import OtherLandingPage from "@/components/landingpages/other-landing-page";
import SpecialDishes from "@/components/special-dishes/special-dishes";

export default function Home() {
  return (
    <main className="">
      {/* desktop view */}
      <div className="hidden lg:block md:p-5">
        <LandingPage />
      </div>
      {/* mobile/tab view */}
      <div className="block lg:hidden mb-5">
        <OtherLandingPage />
      </div>
      <div className="p-5 w-full">
        <Catagorie />
      </div>
      <div className="p-5 w-full">
        <SpecialDishes />
      </div>
    </main>
  );
}
