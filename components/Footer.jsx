// components/Footer.js
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const Footer = () => {
  return (
    <footer className='flex flex-col justify-center items-center gap-8 mb-8'>
      {/* container for icons */}
      <div>
        <Image src="/images/socials.png" alt="Socials" width={120} height={30} />
      </div>

      {/* container for redirects */}
      <div className='flex justify-center items-center gap-6 font-bold'>
        <p>Conditions of Use</p>
        <p>Privacy & Policy</p>
        <p>Press Room</p>
      </div>

      {/* container for rights */}
      <div className='text-[#6B7280] font-bold'>© 2021 MovieBox by Adriana Eka Prayudha</div>
    </footer>
  );
};

export default Footer;
