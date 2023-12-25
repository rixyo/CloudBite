import Signinform from '@/components/forms/signin-form'

export default function Home() {
  return (
    <div className='p-5 flex items-center justify-center'>
      <div className='flex-col p-5 border-2 border-gray-200 w-[50rem] mt-10'>
      <h1 className='text-2xl text-center border-b-2 border-black mb-5 tracking-[.5rem]'>Login Page</h1>
      <Signinform />

      </div>
    </div>
  )
}
