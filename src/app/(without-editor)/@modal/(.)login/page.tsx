'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Services
import getUser from '@/services/login';

// Constants
import { IS_JOINED } from '@/constants/localstorageAuthKeys';

// Utils
import onError from '@/utils/errorHandlers';

// Actions
import { onLogin } from '@/actions/authentication';

// Hooks
import { useAuth } from '@/providers/AuthProvider';

// Components
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/organisms/modal';
import Button from '@/components/atoms/button';
import LoginForm from '@/app/components/organisms/loginForm';

function Login() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { handleAuthDataUpdate } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal className="max-w-md w-full" open>
      <ModalHeader>
        <h6>Login</h6>
      </ModalHeader>
      <ModalBody>
        <LoginForm
          onSubmit={(data) => {
            setIsSubmitting(true);
            getUser(
              data,
              onLogin({ router, isModalLogin: true, handleAuthDataUpdate }),
              onError,
              () => setIsSubmitting(false)
            );
          }}
          ref={formRef}
        />
      </ModalBody>
      <ModalFooter className="gap-2">
        <Button
          label="Cancel"
          variant="outline"
          onClick={() => {
            const isJoined = localStorage.getItem(IS_JOINED);
            if (isJoined) {
              history.go(-2);
              localStorage.removeItem(IS_JOINED);
            } else {
              router.back();
            }
          }}
        />
        <Button
          label="Login"
          type="submit"
          isLoading={isSubmitting}
          className="w-20"
          onClick={() => formRef.current?.requestSubmit()}
        />
      </ModalFooter>
    </Modal>
  );
}

export default Login;
