"use client";
import CURRENT_USER from "@/graphql/actions/currentuser.action";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React from "react";
import { BadgePlus, Mail, List, ListOrdered } from "lucide-react";

type pageProps = {
  params: {
    userId: string;
  };
};

const Page: React.FC<pageProps> = ({ params }) => {
  const { data, loading, error } = useQuery(CURRENT_USER);

  const router = useRouter();
  const currentDate = new Date();
  const localTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const fullName = data?.user?.fullName;
  const firstLetter = fullName?.charAt(0);
  const secondLetter = fullName?.charAt(fullName.length - 1).toUpperCase();
  const routes = [
    {
      name: "Generate Secret",
      icon: BadgePlus,
      route: "/admin-actions/generate-secret",
    },
    {
      name: "Sent Email",
      icon: Mail,
      route: "/admin-actions/sent-email",
    },
    {
      name: "Withdrawal",
      icon: List,
      route: "/admin-actions/withdrawal",
    },
    {
      name: "Secretkey List",
      icon: ListOrdered,
      route: "/admin-actions/secretkey-list",
    },
  ];

  return (
    <div className="md:w-[55rem] lg:w-[100rem] p-5  flex items-center justify-center">
      <div className="flex-col">
        <div className="bg-[#EB5B3B] rounded-tl rounded-tr rounded-br-sm rounded-bl-sm p-5">
          <div className="mb-3 md:mb-0">
            <h1 className="text-white text-2xl font-bold">{localTime}</h1>
          </div>
          <div className="flex gap-10  md:justify-center md:items-center ">
            <div className="flex  md:justify-center gap-2  mx-5 ">
              <div className="border-2 mx-2 flex items-center border-white md:h-[5rem] md:w-[5rem] p-2 md:p-5 rounded-full">
                <div className="text-[2rem] font-[800] text-[#53EC62] ">
                  {firstLetter}
                </div>
                <div className="text-white text-[2rem]"> {secondLetter}</div>
              </div>
              <div className="flex-col">
                <div className="mt-5 text-[#fff] text-[0.875rem] font-[500] tracking-[-0.012rem] leading-normal">
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
                  <p className="font-[500] text-[.7rem] tracking-[-0.012rem] text-[#fff]">
                    Admin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/** second part */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-5 md:mx-28 xl:mx-[30rem] shadow-md mx-5 md:w-[40rem] lg:w-[80rem] p-5">
          {routes.map((route) => (
            <div
              key={route.name}
              className="flex items-center justify-center p-3 border-2 border-red-500 cursor-pointer rounded-lg w-[10rem]"
              onClick={() => router.push(`${route.route}`)}
            >
              <div className="">
                <div>
                  <route.icon
                    size={40}
                    className="text-[#F14A16] text-[1.5rem] ml-4"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-[#2E2D2D] text-[0.625rem] font-[600] tracking-[-0.012rem]">
                    {route.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
