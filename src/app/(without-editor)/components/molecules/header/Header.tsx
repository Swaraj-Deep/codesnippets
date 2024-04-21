'use client';

import { useState, useEffect } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants/routes';
import { AUTH_TOKEN } from '@/constants/localstorageAuthKeys';

// Hooks
import { useAuth } from '@/providers/AuthProvider';

// Utils
import onError from '@/utils/errorHandlers';

// Services
import { verifyJWT } from '@/services/verify';

// Components
import Button from '@/components/atoms/button';

function renderNonLoggedIn(pathName: string, router: AppRouterInstance) {
  return (
    <>
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
    </>
  );
}

function renderLoggedIn(user: { firstName: string }) {
  return (
    <div className="border-gray-700 rounded-sm border px-4 flex">
      <p className="flex items-center">Hello, {user.firstName}</p>
    </div>
  );
}

function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { data, handleAuthDataUpdate } = useAuth();
  const { isLoggedIn, user } = data;

  useEffect(() => {
    verifyJWT(
      localStorage.getItem(AUTH_TOKEN) || '',
      (user) =>
        handleAuthDataUpdate({
          isLoggedIn: true,
          user: { firstName: user.firstName },
        }),
      onError,
      () => setIsLoading(false)
    );
  }, [handleAuthDataUpdate]);

  return (
    <header className="col-start-2 flex justify-end gap-2 items-center">
      {isLoading ? (
        <div className="animate-pulse h-[44px] w-[180px] bg-gray-700 rounded-sm"></div>
      ) : isLoggedIn ? (
        renderLoggedIn(user)
      ) : (
        renderNonLoggedIn(pathName, router)
      )}
    </header>
  );
}

export default Header;
