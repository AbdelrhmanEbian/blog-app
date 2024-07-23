import { ReactNode } from "react";
import "./globals.css";
import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Provider from "../components/Provider";
import AuthProvider from "../components/AuthContext";


export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body  className="bg-primary ">
        <Provider>
        <AuthProvider>
        <div className=" transition-all duration-500 min-h-screen">
      <div className="text-neutral overflow-hidden container mx-auto max-md:px-9 px-[20px] ">
        <Nav />
        {children}
      </div>
      </div>
      <Footer/>
      </AuthProvider>
      </Provider>

      </body>
    </html>
  );
}
