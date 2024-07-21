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
      <body >
        <Provider>
        <AuthProvider>
        <div className=" bg-primary transition-all duration-500 min-h-screen">
      <div className="text-neutral overflow-hidden container mx-auto max-md:px-9 px-[60px] ">
        <Nav />
        {children}
      </div>
      </div>
      </AuthProvider>
      </Provider>

      </body>
    </html>
  );
}
