
import { ReactNode } from 'react';
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Layout elements like header or sidebar */}
      {children}
    </div>
  );
};

export default Layout;
