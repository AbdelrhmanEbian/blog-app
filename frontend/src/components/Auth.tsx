"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useAuth } from "./AuthContext";
const Auth = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [providers, setProviders] = useState<any>(null);
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    console.log("Session status:", sessionStatus);
    console.log("Session data:", session);
    console.log("Context user:", user);

    const getAllProviders = async () => {
      const result: any = await getProviders();
      setProviders(result);
    };
    getAllProviders();
  }, [session, user]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex lg:hidden items-center">
        <div className="relative group lg:hidden" tabIndex={0}>
          <label className="btn bg-secondary border-none btn-circle swap swap-rotate">
            <input type="checkbox" onClick={toggleDropdown} />
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>

          {isOpen && (
            <ul className="absolute transition-opacity duration-500 opacity-100 z-[1] menu p-2 shadow bg-secondary rounded-box w-max">
              <li onClick={toggleDropdown}>
                <Link className="max-md:text-md" href="/">
                  Home
                </Link>
              </li>
              {user && (
                <>
                  <li onClick={toggleDropdown}>
                    <Link className="max-md:text-md" href="/write">
                      Write
                    </Link>
                  </li>
                  <li onClick={toggleDropdown}>
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                      }}
                      className="btn btn-sm btn-secondary"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
      {user ? (
        <>
          <Link className="hidden hover:bg-secondary p-2 rounded-md lg:block" href="/write">
            Write
          </Link>
          <Image
            src={user?.image || "/default-profile.png"}
            alt="user"
            width={35}
            height={35}
            className="rounded-full"
          />
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className="max-lg:hidden btn btn-md btn-secondary"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider: any) => (
              <button
                type="button"
                onClick={() => {
                  signIn(provider.id);
                }}
                key={provider.name}
                className="btn btn-md btn-secondary"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </>
  );
};

export default Auth;
