'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Services
import createUser from '@/services/joinNow';

// Utils
import onError from '@/utils/errorHandlers';

/// Actions
import { onJoining } from '@/actions/authentication';

// Components
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/organisms/modal';
import Button from '@/components/atoms/button';
import JoinNowForm from '@/app/components/organisms/joinNowForm';

function JoinNow() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal className="max-w-md w-full" open>
      <ModalHeader>
        <h6>Join Now</h6>
      </ModalHeader>
      <ModalBody>
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
      </ModalBody>
      <ModalFooter className="gap-2">
        <Button
          label="Cancel"
          variant="outline"
          onClick={() => {
            router.back();
          }}
        />
        <Button
          label="Join"
          type="submit"
          onClick={() => formRef.current?.requestSubmit()}
          isLoading={isSubmitting}
          className="w-20"
        />
      </ModalFooter>
    </Modal>
  );
}

export default JoinNow;
