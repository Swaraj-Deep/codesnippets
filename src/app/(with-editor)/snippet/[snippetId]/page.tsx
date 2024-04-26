'use client';
import { useState, useEffect } from 'react';

// Constants
import { PARAMS } from '@/constants/params';

// Components
import ConvexClientProvider from '@/providers/ConvexClientProvider';
import SnippetEditor from '../../components/organisms/snippet-editor';
import { getSnippet } from '@/services/snippets';
import onError from '@/utils/errorHandlers';

interface CreateSnippetProps {
  params: typeof PARAMS;
}

function CreateSnippet(props: CreateSnippetProps) {
  const { params } = props;
  const snippetId = params.snippetId;

  const [savedSnippet, setSavedSnippet] = useState({
    codeSnippet: '',
    version: -1,
  });
  const [isFetchingSnippet, setIsFetchingSnippet] = useState(true);

  useEffect(() => {
    getSnippet(
      {
        snippetId: snippetId,
      },
      (data) => setSavedSnippet(data),
      (error) => {
        onError(error);
      },
      () => setIsFetchingSnippet(false)
    );
  }, [snippetId]);

  if (isFetchingSnippet) {
    return (
      <section className="h-full w-full flex items-center justify-center bg-[#1e1e1e] animate-pulse">
        <p>Loading your Editor...</p>
      </section>
    );
  }

  return (
    <ConvexClientProvider>
      <SnippetEditor snippetId={snippetId} savedSnippet={savedSnippet} />
    </ConvexClientProvider>
  );
}

export default CreateSnippet;
