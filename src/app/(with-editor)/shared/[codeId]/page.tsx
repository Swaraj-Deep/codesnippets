'use client';
import { useState, useEffect } from 'react';

// Utils
import onError from '@/utils/errorHandlers';

// Constants
import { PARAMS } from '@/constants/params';

// Components
import { getSharedSnippet } from '@/services/snippets';
import Editor from '@/components/organisms/editor';

interface CreateSnippetProps {
  params: typeof PARAMS;
}

function SharedSnippet(props: CreateSnippetProps) {
  const { params } = props;
  const codeId = params.codeId;

  const [sharedSnippet, setSharedSnippet] = useState('');
  const [isFetchingSnippet, setIsFetchingSnippet] = useState(true);

  useEffect(() => {
    getSharedSnippet(
      {
        codeId: codeId,
      },
      ({ codeSnippet }) => setSharedSnippet(codeSnippet),
      (error) => {
        onError(error);
      },
      () => setIsFetchingSnippet(false)
    );
  }, [codeId]);

  if (isFetchingSnippet) {
    return (
      <section className="h-full w-full flex items-center justify-center bg-[#1e1e1e] animate-pulse">
        <p>Loading your Editor...</p>
      </section>
    );
  }

  return <Editor defaultValue={sharedSnippet} readOnly />;
}

export default SharedSnippet;
