import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="main-container mt-auto border-t flex flex-col items-center">
      <p className="text-white/40 text-xs py-10">
        <span className="text-white/80">solaid.fund </span>© 2025 All rights
        reserved
      </p>
    </footer>
  );
};

export default Footer;
