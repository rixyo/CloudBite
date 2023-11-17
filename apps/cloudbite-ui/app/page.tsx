import LandingPage from "@/components/landingpages/landing-page-desktop";
import OtherLandingPage from "@/components/landingpages/other-landing-page";

export default function Home() {
  return (
    <main className="">
     

      {/* desktop view */}
     <div className="hidden lg:block md:p-5">
      <LandingPage/>
     </div>
     {/* mobile/tab view */}
     <div className="block lg:hidden">
      <OtherLandingPage/>
      </div>
    </main>
  )
}
