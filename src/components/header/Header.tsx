import React from 'react';

import { Navbar } from './Navbar';

const Header: React.FC = () => {
  return (
    <header className="main-container sticky top-0 bg-background border-b border-t">
      <Navbar />
    </header>
  );
};

export default Header;
