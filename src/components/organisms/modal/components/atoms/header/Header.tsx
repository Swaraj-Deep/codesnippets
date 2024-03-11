import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

function Header(props: HeaderProps) {
  const { children, className = '' } = props;
  return (
    <div
      className={`flex justify-between items-center p-4 pb-2 border-b border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export default Header;
