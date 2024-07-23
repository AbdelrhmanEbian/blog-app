import Image from 'next/image';
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-secondary border-neutral-content border-solid border-r-2 border-b-2 border-l-2 p-10 mt-10 rounded-lg text-neutral">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-evenly gap-10">
          <div>
            <h2 className="footer-title">About Us</h2>
            <p>
              We share creative ideas and interesting stories from around the world.
              Follow us on our journey to discover more.
            </p>
          </div>
          <div>
            <h2 className="footer-title">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="link link-hover">
                <Image alt='picture' width={40} height={40} src={"/youtube.png"}/>
              </a>
              <a href="#" className="link link-hover">
              <Image alt='picture' width={40} height={40} src={"/facebook.png"}/>
              </a>
              <a href="#" className="link link-hover">
              <Image alt='picture' width={40} height={40} src={"/tiktok.png"}/>
              </a>
              <a href="#" className="link link-hover">
              <Image alt='picture' width={40} height={40} src={"/instagram.png"}/>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <p>&copy; 2024 Blog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
