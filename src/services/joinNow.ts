// Types
import { DEFAULT_FORM_VALUES as UserDataType } from '@/app/components/organisms/joinNowForm';

// Constants
import { AUTH_TOKEN } from '@/constants/localstorageAuthKeys';
import { BASE_URL, CREATE_USER } from './services.constants';

function createUser(
  userData: typeof UserDataType,
  onSuccess: () => void,
  onError: (error: {
    success: boolean;
    error: { message: string; title: string };
  }) => void,
  onFinally: () => void
) {
  const path = BASE_URL + CREATE_USER;
  const data = {
    firstName: userData.firstName.value,
    lastName: userData.lastName.value,
    email: userData.email.value,
    password: userData.password.value,
    confirmPassword: userData.confirmPassword.value,
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
    .then(() => {
      localStorage.removeItem(AUTH_TOKEN);
      onSuccess();
    })
    .catch((err) => {
      err.json().then(onError);
    })
    .finally(onFinally);
}

export default createUser;
