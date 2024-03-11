'use client';

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';

// Constants
import { ROUTES, SEARCH_QUERIES } from '@/constants/routes';

// Components
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/organisms/modal';
import Button from '@/components/atoms/button';
import JoinNowForm from './components/organisms/joinNowForm';

function JoinNow() {
  const formRef = useRef<HTMLFormElement>(null);

  const searchParams = useSearchParams();
  const joinNow = searchParams.get(SEARCH_QUERIES.JOIN_NOW.key) === 'true';

  return (
    <Modal className="max-w-md w-full" open={joinNow}>
      <ModalHeader>
        <h6>Join Now</h6>
      </ModalHeader>
      <ModalBody>
        <JoinNowForm
          onSubmit={(data) => {
            console.log(data);
          }}
          ref={formRef}
        />
      </ModalBody>
      <ModalFooter className="gap-2">
        <Button label="Cancel" variant="outline" />
        <Button
          label="Join"
          type="submit"
          onClick={() => formRef.current?.requestSubmit()}
        />
      </ModalFooter>
    </Modal>
  );
}

export default JoinNow;
