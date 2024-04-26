import { useState } from 'react';
import { useParams } from 'next/navigation';

// Icons
import { CheckCheck, Copy, X } from 'lucide-react';

// Utils
import onError from '@/utils/errorHandlers';

// Components
import Button from '@/components/atoms/button';
import Modal, { ModalBody, ModalHeader } from '@/components/organisms/modal';
import { shareSnippet } from '@/services/snippets';

function ShareModal() {
  const [isSharing, setIsSharing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [codeId, setCodeId] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const { snippetId } = useParams() as { snippetId: string };
  const shareUrl = `http://localhost:3000/shared/${codeId}`;

  return (
    <div>
      <Button
        label="Share"
        className="w-[84px]"
        onClick={() => {
          setIsSharing(true);
          shareSnippet(
            {
              snippetId: snippetId,
            },
            ({ id }) => {
              setCodeId(id);
              setIsShareModalOpen(true);
            },
            onError,
            () => {
              setIsSharing(false);
            }
          );
        }}
        isLoading={isSharing}
      />
      <Modal open={isShareModalOpen} className="max-w-screen-sm">
        <ModalHeader>
          <h6>Shared snippet Url</h6>
          <div
            className="cursor-pointer p-2"
            onClick={() => {
              setIsShareModalOpen(false);
              setIsCopied(false);
            }}
          >
            <X />
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="mb-4">
            Anyone with this link will be able to see this code.
          </p>
          <div className="flex items-center justify-between gap-4">
            <div className="border rounded-sm border-gray-600 p-4">
              {shareUrl}
            </div>
            <div className="cursor-pointer p-2">
              {isCopied ? (
                <CheckCheck />
              ) : (
                <Copy
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setIsCopied(true);
                  }}
                />
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ShareModal;
