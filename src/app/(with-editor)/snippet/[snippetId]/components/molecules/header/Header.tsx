'use client';

import { usePathname, useRouter } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants/routes';

// Components
import Button from '@/components/atoms/button';
import Logo from '@/components/atoms/logo';

function Header() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <header className="flex justify-between items-center">
      <Logo className="h-12" />
      <div className="flex gap-2">
        <Button label="Save" />
        <Button label="Share" />
        <Button
          label="Login"
          onClick={() =>
            pathName !== ROUTES.LOGIN &&
            router.push(ROUTES.LOGIN, { scroll: false })
          }
        />
        <Button
          label="Join Now"
          variant="accent"
          onClick={() =>
            pathName !== ROUTES.JOIN_NOW &&
            router.push(ROUTES.JOIN_NOW, { scroll: false })
          }
        />
      </div>
    </header>
  );
}

export default Header;
