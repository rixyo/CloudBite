import LandingPage from '@/components/landing_pages/landing_page'
import MobileLandingPage from '@/components/landing_pages/mobile_landing_page'
import Footer from '@/components/ui/footer'
import MobileWhyUs from '@/components/why-us/mobile_why_us'
import MobileWhyUsSecond from '@/components/why-us/mobile_why_us_second '
import WhyUs from '@/components/why-us/why_us'
import WhyUsSecond from '@/components/why-us/why_us_second'


export default function Home() {
  return (
    <div className=' p-5'>
      {/** This part is for landing page */}
      <div className='hidden md:block p-5'>
        <LandingPage />
      </div>
      <div className='block md:hidden'>
        <MobileLandingPage/>
      </div>
      <div className='p-5 hidden md:block'>
        <WhyUs/>
      </div>
      <div className='block md:hidden'>
        <MobileWhyUs/>
      </div>
      <div className=' p-5 hidden lg:block'>
        <WhyUsSecond/>
      </div>
      <div className='block lg:hidden mt-10'>
        <MobileWhyUsSecond/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}
