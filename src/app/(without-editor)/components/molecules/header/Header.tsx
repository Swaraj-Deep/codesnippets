'use client';

import { usePathname, useRouter } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants/routes';

// Components
import Button from '@/components/atoms/button';

function Header() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <header className="col-start-2 flex justify-end gap-2 items-center">
      <Button
        label="Join Now"
        variant="accent"
        onClick={() =>
          pathName !== ROUTES.JOIN_NOW &&
          router.push(ROUTES.JOIN_NOW, { scroll: false })
        }
      />
      <Button
        label="Login"
        onClick={() =>
          pathName !== ROUTES.LOGIN &&
          router.push(ROUTES.LOGIN, { scroll: false })
        }
      />
    </header>
  );
}

export default Header;
