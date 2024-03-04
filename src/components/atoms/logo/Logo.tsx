import Link from 'next/link';
import Image from 'next/image';

// Constants
import { ROUTES } from '@/constants/routes';

interface LogoProps {
  className?: string;
}

function Logo(props: LogoProps) {
  const { className } = props;
  return (
    <Link href={ROUTES.INDEX}>
      <Image
        src="/dark-mode-logo.svg"
        alt="Code Snippets Logo"
        className={`w-auto cursor-pointer ${className}`}
        width={0}
        height={0}
        priority
        draggable={false}
      />
    </Link>
  );
}

export default Logo;
