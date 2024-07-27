import { ReactNode } from "react";
import "./globals.css";
import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Provider from "../components/Provider";
import AuthProvider from "../components/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Blog App",
  description: "The best blog app ever!",
  meta: {
    charset: "utf-8",
    name: "Blog App",
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className=" font-sans bg-primary ">
        <Provider>
          <AuthProvider>
              <div className=" transition-all duration-500 min-h-screen">
                <div className="text-neutral overflow-hidden container mx-auto max-md:px-9 px-[20px] ">
                  <Nav />
                  {children}
                </div>
              </div>
              <Footer />
          </AuthProvider>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Provider>
      </body>
    </html>
  );
}
