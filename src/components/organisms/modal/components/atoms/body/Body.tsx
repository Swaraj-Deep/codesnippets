import { ReactNode } from 'react';

interface BodyProps {
  children: ReactNode;
  className?: string;
}

function Body(props: BodyProps) {
  const { children, className = '' } = props;
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export default Body;
