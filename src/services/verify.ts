// Constants
import { BASE_URL, VERIFY_JWT } from './services.constants';

export function verifyJWT(
  token: string,
  onSuccess: (user: { firstName: string }) => void,
  onError: (error: {
    success: boolean;
    error: { message: string; title: string };
  }) => void,
  onFinally: () => void
) {
  const path = BASE_URL + VERIFY_JWT;
  fetch(path, { method: 'GET', headers: { 'x-token-id': token } })
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then(({ success, data }) => {
      const { user } = data;
      if (success) {
        onSuccess({ firstName: user.firstName });
      }
    })
    .catch((err) => {
      err?.json()?.then(onError);
    })
    .finally(onFinally);
}
