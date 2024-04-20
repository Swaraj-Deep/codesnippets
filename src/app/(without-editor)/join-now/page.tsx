'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Services
import createUser from '@/services/joinNow';

// Utils
import onError from '@/utils/errorHandlers';

// Actions
import { onJoining } from '@/actions/authentication';

// Components
import JoinNowForm from '@/app/components/organisms/joinNowForm';
import Button from '@/components/atoms/button';

function JoinNow() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <section className="h-full flex items-center justify-center">
      <section className="max-w-screen-md w-full">
        <JoinNowForm
          onSubmit={(data) => {
            setIsSubmitting(true);
            createUser(
              data,
              () => onJoining(router),
              onError,
              () => setIsSubmitting(false)
            );
          }}
          ref={formRef}
        />
        <div className="mt-4 flex justify-end">
          <Button
            label="Join"
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
