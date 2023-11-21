import LandingPage from '@/components/landing_pages/landing_page'
import WhyUs from '@/components/why-us/why_us'
import WhyUsSecond from '@/components/why-us/why_us_second'
import Image from 'next/image'

export default function Home() {
  return (
    <div className=' p-5'>
      {/** This part is for landing page */}
      <div className=' p-5 flex justify-center'>
        <LandingPage />
      </div>
      <div className='p-5'>
        <WhyUs/>
      </div>
      <div className=' p-5'>
        <WhyUsSecond/>
      </div>
    </div>
  )
}
