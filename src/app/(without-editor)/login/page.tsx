'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Services
import getUser from '@/services/login';

// Actions
import { onLogin } from '@/actions/authentication';

// Utils
import onError from '@/utils/errorHandlers';

// Components
import LoginForm from '@/app/components/organisms/loginForm';
import Button from '@/components/atoms/button';

function JoinNow() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section className="h-full flex items-center justify-center">
      <section className="max-w-screen-md w-full">
        <LoginForm
          onSubmit={(data) => {
            setIsSubmitting(true);
            getUser(data, onLogin({ router }), onError, () =>
              setIsSubmitting(false)
            );
          }}
          ref={formRef}
        />
        <div className="mt-4 flex justify-end">
          <Button
            label="Login"
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
            isLoading={isSubmitting}
            className="w-20"
          />
        </div>
      </section>
    </section>
  );
}

export default JoinNow;
