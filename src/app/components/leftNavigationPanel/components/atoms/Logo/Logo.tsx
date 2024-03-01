import Link from 'next/link';
import Image from 'next/image';

// Constants
import { ROUTES } from '@/constants/routes';

function Logo() {
  return (
    <Link href={ROUTES.INDEX}>
      <Image
        src="/dark-mode-logo.svg"
        alt="Code Snippets Logo"
        className="w-auto h-[117px] cursor-pointer"
        width={0}
        height={0}
        priority
        draggable={false}
      />
    </Link>
  );
}

export default Logo;
