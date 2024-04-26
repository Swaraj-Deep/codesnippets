'use client';

import { useEffect, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams, usePathname, useRouter } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants/routes';
import { AUTH_TOKEN } from '@/constants/localstorageAuthKeys';

// Hooks
import { useAuth } from '@/providers/AuthProvider';

// Utils
import onError from '@/utils/errorHandlers';

// Helpers
import { getLocalSavedSnippet } from '@/helpers/snippets';

// Services
import saveSnippet from '@/services/snippets';
import { verifyJWT } from '@/services/verify';

// Components
import Button from '@/components/atoms/button';
import Logo from '@/components/atoms/logo';
import ShareModal from './organisms/shareModal';

function renderNonLoggedIn(pathName: string, router: AppRouterInstance) {
  return (
    <>
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
  const { snippetId } = useParams() as { snippetId: string };
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
    <header className="flex justify-between items-center">
      <Logo className="h-12" />
      <div className="flex gap-2">
        <ShareModal />
        <Button
          label="Save"
          className="w-[84px]"
          onClick={() => {
            setIsSaving(true);
            saveSnippet(
              {
                snippetId: snippetId,
                code: getLocalSavedSnippet(snippetId) || '',
              },
              () => {},
              (data) => {
                onError(data);
              },
              () => setIsSaving(false)
            );
          }}
          isLoading={isSaving}
        />
        {isLoading ? (
          <div className="animate-pulse h-[44px] w-[180px] bg-gray-700 rounded-sm"></div>
        ) : isLoggedIn ? (
          renderLoggedIn(user)
        ) : (
          renderNonLoggedIn(pathName, router)
        )}
      </div>
    </header>
  );
}

export default Header;
