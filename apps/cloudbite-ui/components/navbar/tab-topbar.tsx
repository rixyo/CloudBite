'use client';
import React, { Suspense } from 'react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import  useAuthModal  from '@/hooks/useAuthModal';
import { useQuery } from '@apollo/client';
import CURRENT_USER from '@/graphql/actions/currentuser.action';
import {useRouter} from 'next/navigation'


const TabTopbar:React.FC = () => {
      const { data, loading, error } = useQuery(CURRENT_USER);
      const router = useRouter();
      const authModal = useAuthModal();
      const fullName = data?.user?.fullName;
      const firstLetter = fullName?.charAt(0);
      const secondLetter = fullName?.charAt(fullName.length - 1).toUpperCase();
      const handleClick = () => {
        if (data?.user) {
          router.push(`/${data.user.id}/profile`);
        } else {
          authModal.onOpen();
        }
      };
    return (
      <div className=" left-0 shadow-4xl right-1 top-[1rem] p-2 h-[5rem] gap-3 hidden md:flex items-center justify-between lg:hidden ">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="bg-[#39DB4A] w-[2rem] h-[2rem] p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="25"
              viewBox="0 0 19 25"
              fill="none"
            >
              <path
                d="M15.85 0.078125C16.3713 0.078125 16.7567 0.100792 17.006 0.146126C17.278 0.168793 17.5727 0.270792 17.89 0.452124C18.23 0.633458 18.468 0.939458 18.604 1.37012C18.74 1.80079 18.808 2.37879 18.808 3.10412C18.808 3.82946 18.74 4.40746 18.604 4.83812C18.468 5.26879 18.23 5.57479 17.89 5.75612C17.55 5.91479 17.244 6.01679 16.972 6.06213C16.7227 6.08479 16.326 6.09612 15.782 6.09612H5.37799V9.53013H12.076C12.62 9.53013 13.0167 9.55279 13.266 9.59813C13.538 9.62079 13.844 9.72279 14.184 9.90413C14.7733 10.2441 15.068 11.1395 15.068 12.5901C15.068 14.1768 14.6373 15.1175 13.776 15.4121C13.4133 15.5255 12.8353 15.5821 12.042 15.5821H5.37799V22.0081C5.37799 22.5521 5.35532 22.9488 5.30999 23.1981C5.28732 23.4475 5.27247 23.7276 5 24.0001C4.90542 24.0947 3.76923 24.0001 3.35199 24.0001C1.76532 24.0001 0.835985 23.5695 0.563985 22.7081C0.427985 22.3455 0.359985 21.7675 0.359985 20.9741V4.07013C0.359985 2.91412 0.575319 2.13212 1.00599 1.72412C1.43665 1.29346 2.25265 1.07812 3.45399 1.07812L15.85 0.078125Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="71"
              height="24"
              viewBox="0 0 71 24"
              fill="none"
            >
              <path
                d="M15.5 0.5C18.2627 0.5 14.448 1.78434 17.948 5.22012C19.9827 7.21746 21 9.70012 21 12.6681C21 15.6175 20.0293 18.1375 18.088 20.2281C16.1467 22.3001 13.7573 23.3361 10.92 23.3361C8.08268 23.3361 5.66535 22.3095 3.66801 20.2561C1.68935 18.2028 0.700012 15.7575 0.700012 12.9201C0.700012 11.3708 0.980012 9.92412 1.54001 8.58012C2.10001 7.21746 2.84668 6.07879 3.78001 5.16412C4.71335 4.24945 5.78668 3.53079 7.00001 3.00812C8.21335 2.48545 14.212 0.5 15.5 0.5ZM5.65601 12.7801C5.65601 14.4415 6.18801 15.7948 7.25201 16.8401C8.33468 17.8668 9.53868 18.3801 10.864 18.3801C12.1893 18.3801 13.384 17.8761 14.448 16.8681C15.512 15.8601 16.044 14.5068 16.044 12.8081C16.044 11.1095 15.5027 9.74679 14.42 8.72012C13.356 7.69346 12.1613 7.18012 10.836 7.18012C9.51068 7.18012 8.31601 7.70279 7.25201 8.74812C6.18801 9.77479 5.65601 11.1188 5.65601 12.7801Z"
                fill="black"
              />
              <path
                d="M33.0229 2.22412C35.7856 2.22412 38.1843 3.22279 40.2189 5.22012C42.2536 7.21746 43.271 9.70012 43.271 12.6681C43.271 15.6175 42.3003 18.1375 40.359 20.2281C38.4176 22.3001 36.0283 23.3361 33.1909 23.3361C30.3536 23.3361 27.9363 22.3095 25.9389 20.2561C23.9603 18.2028 22.9709 15.7575 22.9709 12.9201C22.9709 11.3708 23.2509 9.92412 23.8109 8.58012C24.3709 7.21746 25.1176 6.07879 26.0509 5.16412C26.9843 4.24945 28.0576 3.53079 29.2709 3.00812C30.4843 2.48545 31.7349 2.22412 33.0229 2.22412ZM27.9269 12.7801C27.9269 14.4415 28.459 15.7948 29.5229 16.8401C30.6056 17.8668 31.8096 18.3801 33.1349 18.3801C34.4603 18.3801 35.6549 17.8761 36.7189 16.8681C37.7829 15.8601 38.3149 14.5068 38.3149 12.8081C38.3149 11.1095 37.7736 9.74679 36.691 8.72012C35.627 7.69346 34.4323 7.18012 33.1069 7.18012C31.7816 7.18012 30.587 7.70279 29.5229 8.74812C28.459 9.77479 27.9269 11.1188 27.9269 12.7801Z"
                fill="black"
              />
              <path
                d="M48.1539 2.44812L53.3339 2.47612C56.0406 2.47612 58.4206 3.45612 60.4739 5.41612C62.5272 7.35745 63.5539 9.75612 63.5539 12.6121C63.5539 15.4495 62.5459 17.8855 60.5299 19.9201C58.5326 21.9548 56.1059 22.9721 53.2499 22.9721H48.1259C46.9872 22.9721 46.2779 22.7388 45.9979 22.2721C45.7739 21.8801 45.6619 21.2828 45.6619 20.4801V4.91212C45.6619 4.46412 45.6712 4.13745 45.6899 3.93212C45.7272 3.72679 45.8206 3.48412 45.9699 3.20412C46.2312 2.70012 46.9592 2.44812 48.1539 2.44812ZM53.3339 18.0161C54.6779 18.0161 55.8912 17.5215 56.9739 16.5321C58.0566 15.5241 58.5979 14.2641 58.5979 12.7521C58.5979 11.2401 58.0659 9.98012 57.0019 8.97212C55.9566 7.94545 54.7246 7.43212 53.3059 7.43212H50.6179V18.0161H53.3339Z"
                fill="black"
              />
              <path
                d="M65.9367 4.94012C65.9367 4.51079 65.9461 4.19345 65.9647 3.98812C66.0021 3.76412 66.0954 3.51212 66.2447 3.23212C66.5061 2.72812 67.2341 2.47612 68.4287 2.47612C69.7354 2.47612 70.5101 2.82145 70.7527 3.51212C70.8461 3.82945 70.8927 4.31479 70.8927 4.96812V20.5361C70.8927 20.9841 70.8741 21.3108 70.8367 21.5161C70.8181 21.7215 70.7341 21.9641 70.5847 22.2441C70.3234 22.7481 69.5954 23.0001 68.4007 23.0001C67.0941 23.0001 66.3287 22.6455 66.1047 21.9361C65.9927 21.6375 65.9367 21.1615 65.9367 20.5081V4.94012Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <div className="w-[40rem] ">
        </div>
        <div className="flex items-center gap-5">
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
          <div className="cursor-pointer" onClick={handleClick}>
            {data?.user ? (
              <div className="border-2 border-[#FF3D00]  md:h-[5rem] md:w-[5rem] p-2 md:p-5 rounded-full">
                <p className="text-2xl font-[800] text-[#53EC62] ">
                  {firstLetter}
                  <span className="text-black"> {secondLetter}</span>
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
      </div>
    );
}
export default TabTopbar;