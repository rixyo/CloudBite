import React from 'react';
import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/ban-types
type specialdishesProps = {
    
};

const SpecialDishes:React.FC<specialdishesProps> = () => {
    
    return (
      <div className="flex items-center justify-center p-2">
        <div className="flex-col">
          <div className="text-center md:mx-4">
            <h1 className="tracking-wider uppercase mx-2  text-[#FF6868] text-[1.25rem] font-[700] mb-3">
              Special Dishes
            </h1>
          </div>
          <div className="text-center md:mx-4">
            <h1 className=" uppercase text-black text-md md:text-2xl leading-[4.93213rem]  lg:text-[3.75rem]  md:font-[700] mb-3">
              Standout Dishes From Our Menu
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 w-full  gap-5 p-5">
            <div className="flex relative justify-center md:w-[20rem] md:h-[25rem] border-2 border-gray-200 p-3">
              <div className="flex-col">
                <div>
                  <Image
                    src={"/img/special.png"}
                    width={200}
                    height={200}
                    alt=""
                  />
                </div>
                <div className="bg-[#39DB4A] w-[3.4375rem] h-[2.6875rem] absolute -top-1 -right-[0.4rem] md:-top-[.10rem] p-2 md:-right-[.09rem] rounded-tl-[0rem] rounded-tr-[2.34375rem] rounded-bl-[0rem] rounded-br-[2.65625rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1_105)">
                      <path
                        d="M17.5 1.91653C16.3739 1.93405 15.2724 2.24839 14.3068 2.82781C13.3411 3.40722 12.5453 4.2312 12 5.21653C11.4546 4.2312 10.6589 3.40722 9.69323 2.82781C8.72753 2.24839 7.62604 1.93405 6.49999 1.91653C4.70493 1.99453 3.01369 2.77979 1.79577 4.10077C0.577848 5.42175 -0.0677617 7.17106 -1.11917e-05 8.96653C-1.11917e-05 13.5135 4.78599 18.4795 8.79999 21.8465C9.69621 22.5997 10.8293 23.0126 12 23.0126C13.1706 23.0126 14.3038 22.5997 15.2 21.8465C19.214 18.4795 24 13.5135 24 8.96653C24.0677 7.17106 23.4221 5.42175 22.2042 4.10077C20.9863 2.77979 19.295 1.99453 17.5 1.91653Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_105">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h1 className="lg:text-[1.875rem] lg:font-[600] text-[#000]">
                    Fattoush salad
                  </h1>
                </div>
                <div>
                  <h1 className="lg:text-[1.375rem] lg:font-[600] text-[#555] max-w-[90%]">
                    Description of the item
                  </h1>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[#FF6868] text-[1.5rem]">
                      $<span className="text-[1.875rem] text-[#000]">12</span>
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[1.5rem] h-[1.5rem]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1_97)">
                          <path
                            d="M1.3268 12.4003L4.8868 15.0003L3.5348 19.1873C3.31631 19.8367 3.31354 20.5393 3.52691 21.1904C3.74027 21.8415 4.15834 22.4062 4.7188 22.8003C5.26965 23.2071 5.93719 23.425 6.62195 23.4216C7.30671 23.4182 7.97204 23.1936 8.5188 22.7813L11.9998 20.2193L15.4818 22.7783C16.0317 23.1828 16.6956 23.4024 17.3782 23.4058C18.0607 23.4091 18.7268 23.1959 19.2806 22.7968C19.8343 22.3977 20.2473 21.8333 20.4601 21.1848C20.6729 20.5362 20.6745 19.8369 20.4648 19.1873L19.1128 15.0003L22.6728 12.4003C23.2219 11.9988 23.6302 11.4341 23.8391 10.7867C24.0481 10.1393 24.0472 9.44249 23.8365 8.79569C23.6258 8.1489 23.216 7.58523 22.6658 7.18521C22.1156 6.78519 21.4531 6.56927 20.7728 6.56831H16.3998L15.0728 2.43231C14.8641 1.78126 14.4541 1.21332 13.9018 0.810371C13.3495 0.407422 12.6835 0.190292 11.9998 0.190292C11.3161 0.190292 10.6501 0.407422 10.0978 0.810371C9.54553 1.21332 9.13548 1.78126 8.9268 2.43231L7.5998 6.56831H3.2308C2.55054 6.56927 1.88799 6.78519 1.33778 7.18521C0.787564 7.58523 0.377837 8.1489 0.167118 8.79569C-0.0436018 9.44249 -0.0445344 10.1393 0.164453 10.7867C0.37344 11.4341 0.781657 11.9988 1.3308 12.4003H1.3268Z"
                            fill="#FFE605"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_97">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="text-[1.5rem] font-[600] text-[#454545]">
                      4.9
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex relative justify-center md:w-[20rem] md:h-[25rem] border-2 border-gray-200 p-3">
              <div className="flex-col">
                <div>
                  <Image
                    src={"/img/special.png"}
                    width={200}
                    height={200}
                    alt=""
                  />
                </div>
                <div className="bg-[#39DB4A] w-[3.4375rem] h-[2.6875rem] absolute -top-1 -right-[0.4rem] md:-top-[.10rem] p-2 md:-right-[.09rem] rounded-tl-[0rem] rounded-tr-[2.34375rem] rounded-bl-[0rem] rounded-br-[2.65625rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1_105)">
                      <path
                        d="M17.5 1.91653C16.3739 1.93405 15.2724 2.24839 14.3068 2.82781C13.3411 3.40722 12.5453 4.2312 12 5.21653C11.4546 4.2312 10.6589 3.40722 9.69323 2.82781C8.72753 2.24839 7.62604 1.93405 6.49999 1.91653C4.70493 1.99453 3.01369 2.77979 1.79577 4.10077C0.577848 5.42175 -0.0677617 7.17106 -1.11917e-05 8.96653C-1.11917e-05 13.5135 4.78599 18.4795 8.79999 21.8465C9.69621 22.5997 10.8293 23.0126 12 23.0126C13.1706 23.0126 14.3038 22.5997 15.2 21.8465C19.214 18.4795 24 13.5135 24 8.96653C24.0677 7.17106 23.4221 5.42175 22.2042 4.10077C20.9863 2.77979 19.295 1.99453 17.5 1.91653Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_105">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h1 className="lg:text-[1.875rem] lg:font-[600] text-[#000]">
                    Fattoush salad
                  </h1>
                </div>
                <div>
                  <h1 className="lg:text-[1.375rem] lg:font-[600] text-[#555] max-w-[90%]">
                    Description of the item
                  </h1>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[#FF6868] text-[1.5rem]">
                      $<span className="text-[1.875rem] text-[#000]">12</span>
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[1.5rem] h-[1.5rem]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1_97)">
                          <path
                            d="M1.3268 12.4003L4.8868 15.0003L3.5348 19.1873C3.31631 19.8367 3.31354 20.5393 3.52691 21.1904C3.74027 21.8415 4.15834 22.4062 4.7188 22.8003C5.26965 23.2071 5.93719 23.425 6.62195 23.4216C7.30671 23.4182 7.97204 23.1936 8.5188 22.7813L11.9998 20.2193L15.4818 22.7783C16.0317 23.1828 16.6956 23.4024 17.3782 23.4058C18.0607 23.4091 18.7268 23.1959 19.2806 22.7968C19.8343 22.3977 20.2473 21.8333 20.4601 21.1848C20.6729 20.5362 20.6745 19.8369 20.4648 19.1873L19.1128 15.0003L22.6728 12.4003C23.2219 11.9988 23.6302 11.4341 23.8391 10.7867C24.0481 10.1393 24.0472 9.44249 23.8365 8.79569C23.6258 8.1489 23.216 7.58523 22.6658 7.18521C22.1156 6.78519 21.4531 6.56927 20.7728 6.56831H16.3998L15.0728 2.43231C14.8641 1.78126 14.4541 1.21332 13.9018 0.810371C13.3495 0.407422 12.6835 0.190292 11.9998 0.190292C11.3161 0.190292 10.6501 0.407422 10.0978 0.810371C9.54553 1.21332 9.13548 1.78126 8.9268 2.43231L7.5998 6.56831H3.2308C2.55054 6.56927 1.88799 6.78519 1.33778 7.18521C0.787564 7.58523 0.377837 8.1489 0.167118 8.79569C-0.0436018 9.44249 -0.0445344 10.1393 0.164453 10.7867C0.37344 11.4341 0.781657 11.9988 1.3308 12.4003H1.3268Z"
                            fill="#FFE605"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_97">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="text-[1.5rem] font-[600] text-[#454545]">
                      4.9
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex relative justify-center md:w-[20rem] md:h-[25rem] border-2 border-gray-200 p-3">
              <div className="flex-col">
                <div>
                  <Image
                    src={"/img/special.png"}
                    width={200}
                    height={200}
                    alt=""
                  />
                </div>
                <div className="bg-[#39DB4A] w-[3.4375rem] h-[2.6875rem] absolute -top-1 -right-[0.4rem] md:-top-[.10rem] p-2 md:-right-[.09rem] rounded-tl-[0rem] rounded-tr-[2.34375rem] rounded-bl-[0rem] rounded-br-[2.65625rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1_105)">
                      <path
                        d="M17.5 1.91653C16.3739 1.93405 15.2724 2.24839 14.3068 2.82781C13.3411 3.40722 12.5453 4.2312 12 5.21653C11.4546 4.2312 10.6589 3.40722 9.69323 2.82781C8.72753 2.24839 7.62604 1.93405 6.49999 1.91653C4.70493 1.99453 3.01369 2.77979 1.79577 4.10077C0.577848 5.42175 -0.0677617 7.17106 -1.11917e-05 8.96653C-1.11917e-05 13.5135 4.78599 18.4795 8.79999 21.8465C9.69621 22.5997 10.8293 23.0126 12 23.0126C13.1706 23.0126 14.3038 22.5997 15.2 21.8465C19.214 18.4795 24 13.5135 24 8.96653C24.0677 7.17106 23.4221 5.42175 22.2042 4.10077C20.9863 2.77979 19.295 1.99453 17.5 1.91653Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_105">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h1 className="lg:text-[1.875rem] lg:font-[600] text-[#000]">
                    Fattoush salad
                  </h1>
                </div>
                <div>
                  <h1 className="lg:text-[1.375rem] lg:font-[600] text-[#555] max-w-[90%]">
                    Description of the item
                  </h1>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[#FF6868] text-[1.5rem]">
                      $<span className="text-[1.875rem] text-[#000]">12</span>
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[1.5rem] h-[1.5rem]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1_97)">
                          <path
                            d="M1.3268 12.4003L4.8868 15.0003L3.5348 19.1873C3.31631 19.8367 3.31354 20.5393 3.52691 21.1904C3.74027 21.8415 4.15834 22.4062 4.7188 22.8003C5.26965 23.2071 5.93719 23.425 6.62195 23.4216C7.30671 23.4182 7.97204 23.1936 8.5188 22.7813L11.9998 20.2193L15.4818 22.7783C16.0317 23.1828 16.6956 23.4024 17.3782 23.4058C18.0607 23.4091 18.7268 23.1959 19.2806 22.7968C19.8343 22.3977 20.2473 21.8333 20.4601 21.1848C20.6729 20.5362 20.6745 19.8369 20.4648 19.1873L19.1128 15.0003L22.6728 12.4003C23.2219 11.9988 23.6302 11.4341 23.8391 10.7867C24.0481 10.1393 24.0472 9.44249 23.8365 8.79569C23.6258 8.1489 23.216 7.58523 22.6658 7.18521C22.1156 6.78519 21.4531 6.56927 20.7728 6.56831H16.3998L15.0728 2.43231C14.8641 1.78126 14.4541 1.21332 13.9018 0.810371C13.3495 0.407422 12.6835 0.190292 11.9998 0.190292C11.3161 0.190292 10.6501 0.407422 10.0978 0.810371C9.54553 1.21332 9.13548 1.78126 8.9268 2.43231L7.5998 6.56831H3.2308C2.55054 6.56927 1.88799 6.78519 1.33778 7.18521C0.787564 7.58523 0.377837 8.1489 0.167118 8.79569C-0.0436018 9.44249 -0.0445344 10.1393 0.164453 10.7867C0.37344 11.4341 0.781657 11.9988 1.3308 12.4003H1.3268Z"
                            fill="#FFE605"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_97">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="text-[1.5rem] font-[600] text-[#454545]">
                      4.9
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default SpecialDishes;