"use client";
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import CURRENT_USER from '@/graphql/actions/currentuser.action';
import USE_PENDING_ORDERS from '@/graphql/actions/getUsePendingOrders';
import useAuthModal from '@/hooks/useAuthModal';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React from 'react';

type profileProps = {
    userId:string;
};

const Profile:React.FC<profileProps> = () => {
    const {data,loading,error} = useQuery(CURRENT_USER)
    const {
      data: pendingOrders,
      loading: loadingOrders,
      error: errorOrders,
    } = useQuery(USE_PENDING_ORDERS);
    console.log(pendingOrders?.getUserOrders);
     const authModal = useAuthModal();
     const router=useRouter()
   const currentDate = new Date();
   const localTime = currentDate.toLocaleTimeString("en-US", {
     hour: "numeric",
     minute: "numeric",
     hour12: true,
   });
   const handleClick=()=>{
    router.push('/')
    authModal.onOpen();
   }
     if (loading) {
       return <Loader />;
     }
   if(error){
       return (
         <div className="text-center text-[1rem] font-[500]">
           <p>{error.message}</p>
           <Button className='mt-5 ' onClick={handleClick}>Login</Button>
         </div>
       )
   }

    const fullName = data?.user?.fullName;
    const firstLetter = fullName?.charAt(0);
    const secondLetter = fullName?.charAt(fullName.length - 1).toUpperCase();
    return (
      <div>
        <div className="bg-[#EB5B3B] rounded-tl rounded-tr rounded-br-sm rounded-bl-sm p-5">
          <div className="mb-3 md:mb-0">
            <h1 className="text-white text-2xl font-bold">{localTime}</h1>
          </div>
          <div className="flex gap-10  md:justify-center md:items-center ">
            <div className="flex  md:justify-center gap-2  mx-5 ">
              <div className="border-2 border-white md:h-[5rem] md:w-[5rem] p-2 md:p-5 rounded-full">
                <p className="text-2xl font-[800] text-[#53EC62] ">
                  {firstLetter}
                  <span className="text-white"> {secondLetter}</span>
                </p>
              </div>
              <div className="flex-col">
                <div className="mt-3 text-[#fff] text-[0.875rem] font-[500] tracking-[-0.012rem] leading-normal">
                  {data?.user?.fullName}
                </div>
                <div className=" cursor-pointer  flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="11"
                    viewBox="0 0 7 11"
                    fill="none"
                  >
                    <path
                      d="M7 4.16842C7.00055 3.55074 6.852 2.94292 6.56816 2.40145C6.28432 1.85997 5.87439 1.4024 5.37645 1.07124C4.87851 0.74008 4.30872 0.546076 3.72001 0.507249C3.13129 0.468421 2.54276 0.586032 2.00908 0.849153C1.47539 1.11227 1.01387 1.51237 0.667395 2.01228C0.320915 2.51218 0.100715 3.09567 0.0272508 3.70855C-0.0462139 4.32143 0.02944 4.94381 0.247185 5.51787C0.464929 6.09194 0.8177 6.59906 1.27273 6.99214V10.1657C1.2724 10.2225 1.28615 10.2785 1.31264 10.3282C1.33913 10.3778 1.37745 10.4194 1.42386 10.4489C1.4699 10.4792 1.52259 10.4966 1.5769 10.4996C1.63121 10.5025 1.68533 10.4908 1.73409 10.4656L3.5 9.53681L5.26591 10.4656C5.31107 10.4865 5.35973 10.4978 5.40909 10.4989C5.49348 10.4989 5.57441 10.4638 5.63408 10.4013C5.69375 10.3388 5.72727 10.2541 5.72727 10.1657V6.99214C6.12532 6.64904 6.44588 6.2179 6.66593 5.72968C6.88598 5.24147 7.00007 4.70828 7 4.16842ZM0.636363 4.16842C0.636363 3.57535 0.804312 2.99559 1.11897 2.50247C1.43363 2.00935 1.88087 1.62501 2.40413 1.39805C2.92739 1.17109 3.50318 1.1117 4.05867 1.22741C4.61416 1.34311 5.12441 1.6287 5.52489 2.04807C5.92538 2.46743 6.19812 3.00174 6.30861 3.58342C6.4191 4.1651 6.3624 4.76802 6.14565 5.31595C5.92891 5.86388 5.56187 6.3322 5.09095 6.6617C4.62003 6.99119 4.06637 7.16706 3.5 7.16706C2.74084 7.16596 2.01307 6.84968 1.47626 6.28756C0.939457 5.72545 0.637415 4.96337 0.636363 4.16842ZM5.09091 9.62844L3.64318 8.86628C3.59851 8.84377 3.54957 8.83208 3.5 8.83208C3.45042 8.83208 3.40149 8.84377 3.35682 8.86628L1.90909 9.62844V7.4336C2.40182 7.69653 2.94698 7.83359 3.5 7.83359C4.05301 7.83359 4.59818 7.69653 5.09091 7.4336V9.62844ZM3.5 6.50069C3.94051 6.50069 4.37113 6.36391 4.73741 6.10764C5.10368 5.85136 5.38915 5.48711 5.55773 5.06094C5.72631 4.63478 5.77041 4.16584 5.68447 3.71342C5.59854 3.261 5.38641 2.84543 5.07492 2.51926C4.76343 2.19308 4.36657 1.97096 3.93452 1.88097C3.50247 1.79097 3.05464 1.83716 2.64766 2.01368C2.24068 2.19021 1.89283 2.48914 1.64809 2.87268C1.40335 3.25622 1.27273 3.70714 1.27273 4.16842C1.27273 4.78698 1.50738 5.3802 1.92508 5.81759C2.34277 6.25497 2.90929 6.50069 3.5 6.50069ZM3.5 2.50251C3.81465 2.50251 4.12224 2.60022 4.38386 2.78327C4.64548 2.96632 4.84939 3.2265 4.96981 3.53091C5.09022 3.83531 5.12172 4.17027 5.06034 4.49343C4.99895 4.81658 4.84743 5.11342 4.62494 5.3464C4.40245 5.57938 4.11898 5.73804 3.81037 5.80232C3.50176 5.8666 3.18189 5.83361 2.89118 5.70752C2.60048 5.58143 2.35202 5.36791 2.17721 5.09395C2.0024 4.81999 1.90909 4.49791 1.90909 4.16842C1.91014 3.72693 2.07809 3.30384 2.37622 2.99166C2.67434 2.67948 3.07839 2.50361 3.5 2.50251Z"
                      fill="#FFC700"
                    />
                  </svg>
                  <p className="font-[600] text-[.9rem] tracking-[-0.012rem] text-[#fff]">
                    Gold Member
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[24.1875rem] h-[8.375rem] rounded-[0.625rem] bg-[#fff] md:mx-36 xl:mx-[50rem] shadow-md flex md:justify-center items-center mx-5 gap-16">
          <div>
            <div>
              <div className="relative cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2_44)">
                    <path
                      d="M15.0875 10.6713C14.9885 10.6706 14.8932 10.7091 14.8225 10.7784C14.7518 10.8477 14.7113 10.9422 14.71 11.0413V13.8063C14.7113 13.9055 14.7519 14.0002 14.8229 14.0695C14.8939 14.1389 14.9895 14.1773 15.0887 14.1763H23.4175C23.5167 14.1773 23.6123 14.1389 23.6833 14.0695C23.7543 14.0002 23.7949 13.9055 23.7962 13.8063V11.0413C23.7949 10.942 23.7543 10.8473 23.6833 10.778C23.6123 10.7086 23.5167 10.6702 23.4175 10.6713H15.0887H15.0875ZM20.195 1.87625C21.3475 1.93125 22.1763 2.15875 22.7013 2.64125C23.22 3.11875 23.4862 3.81 23.5387 4.725V7.34625C23.5361 7.56948 23.445 7.78254 23.2854 7.93863C23.1258 8.09472 22.9107 8.18109 22.6875 8.17875C22.5769 8.18007 22.467 8.15959 22.3643 8.11846C22.2616 8.07734 22.168 8.01638 22.0888 7.93908C22.0097 7.86177 21.9465 7.76963 21.9029 7.66791C21.8594 7.56619 21.8363 7.45689 21.835 7.34625L21.8363 4.7725C21.8088 4.2975 21.695 4.0025 21.5325 3.8525C21.375 3.7075 20.895 3.5775 20.1537 3.54H3.80875C3.1375 3.565 2.70125 3.6925 2.49 3.87375C2.3275 4.0125 2.205 4.395 2.20375 5.05625L2.2 19.7688C2.2625 20.4113 2.40375 20.84 2.585 21.0538C2.7225 21.2163 3.14875 21.3788 3.77625 21.4588H20.1713C20.9388 21.4738 21.3912 21.3588 21.5437 21.205C21.7125 21.0338 21.835 20.5838 21.835 19.8475V17.2913C21.835 16.8325 22.2162 16.4588 22.6875 16.4588C23.1575 16.4588 23.5387 16.8325 23.5387 17.2913V19.8475C23.5387 20.9725 23.3088 21.8138 22.77 22.36C22.215 22.9225 21.3325 23.1475 20.1537 23.1225L3.675 23.1188C2.55375 22.9888 1.75 22.6813 1.27125 22.115C0.8375 21.6025 0.59625 20.8713 0.5 19.8488V5.055C0.5025 3.96 0.765 3.13625 1.3675 2.62125C1.92 2.14625 2.7175 1.915 3.77625 1.875H20.195V1.87625ZM23.4175 9.00625C24.5675 9.00625 25.5 9.9175 25.5 11.0413V13.8063C25.5 14.93 24.5675 15.8413 23.4175 15.8413H15.0887C13.9387 15.8413 13.0063 14.9288 13.0063 13.8063V11.0413C13.0063 9.9175 13.9387 9.00625 15.0887 9.00625H23.4175ZM17.1712 11.4313C16.5963 11.4313 16.13 11.8813 16.13 12.435C16.13 12.99 16.5963 13.4388 17.1712 13.4388C17.7463 13.4388 18.2125 12.9888 18.2125 12.435C18.2125 11.88 17.7463 11.43 17.1712 11.43V11.4313Z"
                      fill="#3E3E3E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2_44">
                      <rect
                        width="25"
                        height="25"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div className="absolute top-[27%] left-5  text-[1.25rem] font-[600]  transform -translate-x-1/2 -translate-y-1/2 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle cx="10" cy="10" r="10" fill="#39DB4A" />
                  </svg>
                  <h1 className="absolute text-white top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    {pendingOrders?.getUserOrders.length}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-[#2E2D2D] text-[0.625rem] font-[500]  tracking-[-0.012rem]">
                To Receive
              </p>
            </div>
          </div>
          <div>
            <div>
              <div className="relative cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M13.7863 3.175C14.1576 2.9688 14.5753 2.8606 15 2.8606C15.4247 2.8606 15.8424 2.9688 16.2137 3.175L25.6075 8.3925C25.8023 8.5008 25.9645 8.6592 26.0775 8.85129C26.1904 9.04337 26.25 9.26216 26.25 9.485V19.7788C26.2499 20.2246 26.1306 20.6622 25.9044 21.0464C25.6783 21.4306 25.3535 21.7473 24.9638 21.9638L16.2137 26.8263C15.8424 27.0325 15.4247 27.1407 15 27.1407C14.5753 27.1407 14.1576 27.0325 13.7863 26.8263L5.03625 21.9638C4.64669 21.7474 4.32204 21.4309 4.09589 21.047C3.86975 20.663 3.75033 20.2256 3.75 19.78V9.485C3.74999 9.26216 3.80955 9.04337 3.92252 8.85129C4.03548 8.6592 4.19775 8.5008 4.3925 8.3925L13.7875 3.175H13.7863Z"
                    stroke="#3E3E3E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 15V26.875M3.75 8.75L15 15L3.75 8.75ZM15 15L26.25 8.75L15 15Z"
                    stroke="#3E3E3E"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5 15.41L11.25 17.5M9.375 11.875L20.625 5.625L9.375 11.875Z"
                    stroke="#3E3E3E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="absolute top-[27%] left-5  text-[1.25rem] font-[600]  transform -translate-x-1/2 -translate-y-1/2 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle cx="10" cy="10" r="10" fill="#39DB4A" />
                  </svg>
                  <h1 className="absolute text-white top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                   0
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[#2E2D2D] text-[0.625rem] font-[500]  tracking-[-0.012rem]">
                Delivered
              </p>
            </div>
          </div>
          <div>
            <div>
              <div className="relative cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                >
                  <path
                    d="M18.5375 12.5L16.7 6.45C16.3375 5.2625 14.6625 5.2625 14.3125 6.45L12.4625 12.5H6.90001C5.68751 12.5 5.18751 14.0625 6.17501 14.7625L10.725 18.0125L8.93751 23.775C8.57501 24.9375 9.92501 25.875 10.8875 25.1375L15.5 21.6375L20.1125 25.15C21.075 25.8875 22.425 24.95 22.0625 23.7875L20.275 18.025L24.825 14.775C25.8125 14.0625 25.3125 12.5125 24.1 12.5125H18.5375V12.5Z"
                    fill="#3E3E3E"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[#2E2D2D] text-[0.625rem] font-[500]  tracking-[-0.012rem]">
                To Review
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 mx-5 rounded-[0.625rem] md:mx-36 xl:mx-[50rem]  shadow-md w-[23.625rem] h-[19.8125rem] bg-[#FFF]">
          <div className="flex items-center gap-10">
            <div className="flex items-center">
              <div className="">
                <div className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16 2L20 12H30L22 19L25 30L16 23L7 30L10 19L2 12H12L16 2Z"
                      stroke="#26DCBB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-[#26DCBB] text-[0.75rem] font-[400] mt-2">
                  My Rating
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="">
                <div className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                  >
                    <path
                      d="M7.01827 9H22.9817C24.9772 9 26.64 11 26.9726 13L28.968 25C29.3008 27.0011 26.9726 29 24.9772 29H5.02284C3.02741 29 0.699234 27.0011 1.03198 25L3.02741 13C3.35998 11 5.02284 9 7.01827 9Z"
                      stroke="#2E2D2D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.01379 13V6.97678"
                      stroke="#2E2D2D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20.9863 7.00003V13"
                      stroke="#2E2D2D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.41724 22.9148H28.5825"
                      stroke="#2E2D2D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20.9864 7C20.9864 5 19.8266 2.86838 17.9816 1.80073C16.1366 0.733089 13.8635 0.733089 12.0185 1.80073C10.1735 2.86838 9.01376 5 9.01376 7"
                      stroke="#2E2D2D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-[#2E2D2D] text-[0.75rem] font-[400] mt-2">
                  My Orders
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="">
                <div className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <path
                      d="M4.25 17C1.0625 12.75 2.125 6.375 7.4375 4.25C12.75 2.125 15.9375 6.375 17 8.5C18.0625 6.375 22.3125 2.125 27.625 4.25C32.9375 6.375 32.9375 12.75 29.75 17C26.5625 21.25 17 29.75 17 29.75C17 29.75 7.4375 21.25 4.25 17Z"
                      stroke="#FF3D00"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-[#FF3D00] text-[0.75rem] font-[400] mt-2">
                  My Likes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Profile;