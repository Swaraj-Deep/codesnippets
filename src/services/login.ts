import { DEFAULT_FORM_VALUES as UserDataType } from '@/app/components/organisms/loginForm';
import { BASE_URL, GET_USER } from './services.constants';

function getUser(
  userData: typeof UserDataType,
  onSuccess: (data: { token: string }) => void,
  onError: (error: {
    success: boolean;
    error: { message: string; title: string };
  }) => void,
  onFinally: () => void
) {
  const path = BASE_URL + GET_USER;
  const data = {
    email: userData.email.value,
    password: userData.password.value,
  };
  fetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then(({ data, success }) => {
      if (success) {
        onSuccess({ token: data.token });
      }
    })
    .catch((err) => {
      err.json().then(onError);
    })
    .finally(onFinally);
}

export default getUser;
