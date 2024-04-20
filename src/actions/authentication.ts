import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { ROUTES } from '@/constants/routes';
import { AUTH_TOKEN, IS_JOINED } from '../constants/localstorageAuthKeys';

export function onJoining(router: AppRouterInstance) {
  localStorage.setItem(IS_JOINED, 'true');
  router.push(ROUTES.LOGIN, { scroll: false });
}

export const onLogin =
  ({
    router,
    isModalLogin = false,
  }: {
    router: AppRouterInstance;
    isModalLogin?: boolean;
  }) =>
  (data: { token: string }) => {
    const { token } = data;

    if (isModalLogin) {
      router.back();
    }

    localStorage.setItem(AUTH_TOKEN, token);
    router.push(ROUTES.SEARCH, { scroll: false });
  };
