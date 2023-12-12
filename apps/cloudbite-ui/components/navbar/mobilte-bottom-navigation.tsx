"use client"
import React, { Suspense } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import  useAuthModal  from "@/hooks/useAuthModal";
import { useQuery } from '@apollo/client';
import CURRENT_USER from '@/graphql/actions/currentuser.action';
import { useRouter } from 'next/navigation';



const MobileBottomNavigation:React.FC = () => {
       const { data, loading, error } = useQuery(CURRENT_USER);
       const route= useRouter()
       const authModal = useAuthModal();
       const fullName = data?.user?.fullName;
       const firstLetter = fullName?.charAt(0);
       const secondLetter = fullName?.charAt(fullName.length - 1).toUpperCase();
       const handleClick = () => {
         if (data.user) {
          route.push(`/${data.user.id}/profile`)
         } else {
           authModal.onOpen();
         }
       };
    return (
      <div className=" fixed bottom-0  left-0 right-0 h-[3.5rem] w-[22.5625rem] justify-center items-center gap-5  bg-white p-4 flex md:hidden ">
        <div className="w-[2.5625rem] h-[2.4375rem] text-[#B3B3B3] cursor-pointer" onClick={()=>route.push("/")}>
          <svg
            width="25"
            height="19"
            viewBox="0 0 25 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="&#240;&#159;&#166;&#134; icon &#34;home&#34;">
              <g id="Vector">
                <path
                  d="M24.8078 9.3068L21.1796 6.38395V0.508985C21.1796 0.373994 21.1247 0.244532 21.027 0.149078C20.9294 0.0536252 20.7969 0 20.6588 0H18.2284C18.0903 0 17.9578 0.0536252 17.8602 0.149078C17.7625 0.244532 17.7076 0.373994 17.7076 0.508985V3.58877L13.8221 0.464449C13.4492 0.164563 12.9813 0.000599477 12.4984 0.000599477C12.0155 0.000599477 11.5476 0.164563 11.1747 0.464449L0.189004 9.3068C0.136268 9.3494 0.0926378 9.40173 0.0606055 9.46082C0.0285733 9.5199 0.00876702 9.58458 0.00231846 9.65115C-0.00413009 9.71772 0.00290544 9.78487 0.0230231 9.84878C0.0431407 9.91269 0.0759461 9.9721 0.119565 10.0236L1.22625 11.3385C1.26975 11.3902 1.32326 11.433 1.3837 11.4645C1.44415 11.4959 1.51035 11.5154 1.57852 11.5218C1.64669 11.5283 1.71548 11.5215 1.78096 11.5019C1.84645 11.4823 1.90733 11.4503 1.96013 11.4076L12.1685 3.19007C12.2626 3.11598 12.3798 3.07557 12.5006 3.07557C12.6214 3.07557 12.7385 3.11598 12.8326 3.19007L23.0414 11.4076C23.0941 11.4503 23.1549 11.4823 23.2203 11.502C23.2857 11.5216 23.3544 11.5285 23.4225 11.5222C23.4906 11.5159 23.5568 11.4966 23.6173 11.4653C23.6777 11.434 23.7313 11.3913 23.7749 11.3398L24.8815 10.0249C24.9251 9.97308 24.9578 9.91336 24.9777 9.84917C24.9975 9.78498 25.0042 9.71758 24.9974 9.65085C24.9905 9.58412 24.9703 9.51938 24.9377 9.46033C24.9052 9.40129 24.861 9.34911 24.8078 9.3068Z"
                  fill="#B3B3B3"
                />
                <path
                  d="M12.1685 4.9291L4.167 11.3699V18.3214C4.167 18.5013 4.24015 18.674 4.37038 18.8012C4.5006 18.9285 4.67722 19 4.86139 19L9.72473 18.9877C9.90829 18.9868 10.084 18.9149 10.2135 18.7877C10.343 18.6606 10.4156 18.4885 10.4156 18.3091V14.2495C10.4156 14.0695 10.4888 13.8969 10.619 13.7696C10.7493 13.6423 10.9259 13.5708 11.11 13.5708H13.8876C14.0718 13.5708 14.2484 13.6423 14.3786 13.7696C14.5088 13.8969 14.582 14.0695 14.582 14.2495V18.3061C14.5817 18.3954 14.5995 18.4839 14.6342 18.5664C14.669 18.649 14.7201 18.7241 14.7846 18.7873C14.8491 18.8506 14.9258 18.9008 15.0101 18.935C15.0945 18.9692 15.185 18.9869 15.2764 18.9869L20.138 19C20.3221 19 20.4988 18.9285 20.629 18.8012C20.7592 18.674 20.8324 18.5013 20.8324 18.3214V11.3652L12.8326 4.9291C12.7385 4.85501 12.6214 4.81461 12.5006 4.81461C12.3798 4.81461 12.2626 4.85501 12.1685 4.9291Z"
                  fill="#B3B3B3"
                />
              </g>
            </g>
          </svg>
        </div>
        <div className="w-[2.5625rem] h-[2.4375rem] text-[#B3B3B3]">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="&#240;&#159;&#166;&#134; icon &#34;clutery&#34;">
              <path
                id="Vector"
                d="M3.42447 19.9894H7.09833M7.09833 19.9894H10.7722M7.09833 19.9894V13.8663"
                stroke="#707070"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M16.8953 19.9894V10.1925C16.8953 10.1925 19.9569 8.96784 19.9569 6.5186C19.9569 4.3665 19.9569 1.00781 19.9569 1.00781"
                stroke="#707070"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_3"
                d="M16.8953 5.90629V1.00781"
                stroke="#707070"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_4"
                d="M1.58756 8.96784C2.81208 11.5739 7.09834 13.8663 7.09834 13.8663C7.09834 13.8663 11.3846 11.5739 12.6091 8.96784C13.9311 6.15436 12.6091 1.00781 12.6091 1.00781H1.58756C1.58756 1.00781 0.265555 6.15436 1.58756 8.96784Z"
                stroke="#707070"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </div>
        <div className="w-[2.5625rem] h-[2.4375rem] text-[#B3B3B3]">
          <div>
            <div className="relative cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_1_198)">
                  <path
                    d="M21 6H18C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6H3C2.20435 6 1.44129 6.31607 0.87868 6.87868C0.31607 7.44129 0 8.20435 0 9L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V9C24 8.20435 23.6839 7.44129 23.1213 6.87868C22.5587 6.31607 21.7956 6 21 6ZM12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6H8C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2ZM22 19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V9C2 8.73478 2.10536 8.48043 2.29289 8.29289C2.48043 8.10536 2.73478 8 3 8H6V10C6 10.2652 6.10536 10.5196 6.29289 10.7071C6.48043 10.8946 6.73478 11 7 11C7.26522 11 7.51957 10.8946 7.70711 10.7071C7.89464 10.5196 8 10.2652 8 10V8H16V10C16 10.2652 16.1054 10.5196 16.2929 10.7071C16.4804 10.8946 16.7348 11 17 11C17.2652 11 17.5196 10.8946 17.7071 10.7071C17.8946 10.5196 18 10.2652 18 10V8H21C21.2652 8 21.5196 8.10536 21.7071 8.29289C21.8946 8.48043 22 8.73478 22 9V19Z"
                    fill="#272727"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_198">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="absolute top-[27%] left-5 text-[#FF6868] text-[1.25rem] font-[600]  transform -translate-x-1/2 -translate-y-1/2 p-2">
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
                  1
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div
          className="cursor-pointer"
          onClick={handleClick}
        >
          {data?.user ? (
            <div className="border-2 border-[#FF3D00]  h-[3rem] w-[3rem] rounded-full   ">
              <p className="text-2xl font-[800] text-[#53EC62] p-1">
                {firstLetter}
                <span className="text-[#FF3D00]"> {secondLetter}</span>
              </p>
            </div>
          ) : (
            <Avatar>
              <Suspense fallback={<AvatarFallback>user</AvatarFallback>}>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Suspense>
            </Avatar>
          )}
        </div>
      </div>
    );
}
export default MobileBottomNavigation;