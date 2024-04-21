import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { AuthValue } from '@/providers/AuthProvider';

import { ROUTES } from '@/constants/routes';
import { AUTH_TOKEN, IS_JOINED } from '../constants/localstorageAuthKeys';

export function onJoining(router: AppRouterInstance) {
  localStorage.setItem(IS_JOINED, 'true');
  router.push(ROUTES.LOGIN, { scroll: false });
}

export const onLogin =
  ({
    router,
    handleAuthDataUpdate,
    isModalLogin = false,
  }: {
    router: AppRouterInstance;
    handleAuthDataUpdate: (data: AuthValue) => void;
    isModalLogin?: boolean;
  }) =>
  (data: { token: string; user: { firstName: string } }) => {
    const { token, user } = data;
    handleAuthDataUpdate({ isLoggedIn: true, user });

    localStorage.setItem(AUTH_TOKEN, token);

    if (isModalLogin) {
      router.back();
    }
    setTimeout(() => {
      router.push(ROUTES.SEARCH, { scroll: false });
    }, 5);
  };
