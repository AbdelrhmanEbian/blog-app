import Image from "next/image";
import Link from "next/link";
import React from "react";
import Toggle from "./Toggle";
import Auth from "./Auth";
const Nav = () => {
  return (
    <div className=" h-[110px] mb-10 duration-500 flex justify-between items-center">
      <div className=" hidden md:flex gap-2 flex-1">
        <Image
          src={"/facebook.png"}
          sizes="(max-width: 768px) 20px, 24px"
          quality={90}
          priority={true}
          alt="facebook"
          width={24}
          height={24}
        />
        <Image
          src={"/youtube.png"}
          sizes="(max-width: 768px) 20px, 24px"
          quality={90}
          priority={true}
          alt="youtube"
          width={24}
          height={24}
        />
        <Image
          src={"/tiktok.png"}
          sizes="(max-width: 768px) 20px, 24px"
          quality={90}
          priority={true}
          alt="tiktok"
          width={24}
          height={24}
        />
        <Image
          src={"/instagram.png"}
          sizes="(max-width: 768px) 20px, 24px"
          quality={90}
          priority={true}
          alt="instagram"
          width={24}
          height={24}
        />
      </div>
      <div className=" md:text-center text-left  flex-1 max-md:text-2xl text-4xl font-bold">
        <Link href={'/'} aria-label="go home">
          Blog App
        </Link>
      </div>
      <div className="  justify-end items-center flex lg:gap-1 xl:gap-5 gap-3 flex-1 text-xl">
        <Toggle />
        <Link
          aria-label="home page"
          className="hidden lg:block hover:bg-secondary p-2 rounded-md "
          href={"/"}
        >
          Home
        </Link>
        <Auth />
      </div>
    </div>
  );
};
export default Nav;
