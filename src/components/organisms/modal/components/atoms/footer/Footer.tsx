import { ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
  className?: string;
}

function Footer(props: FooterProps) {
  const { children, className = '' } = props;
  return (
    <div
      className={`flex justify-end items-center p-4 pt-2 border-t border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export default Footer;
