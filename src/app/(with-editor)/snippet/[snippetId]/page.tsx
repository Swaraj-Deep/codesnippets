'use client';

// Constants
import { PARAMS } from '@/constants/params';

// Components
import ConvexClientProvider from '@/providers/ConvexClientProvider';
import SnippetEditor from './components/organisms/snippet-editor';

interface CreateSnippetProps {
  params: typeof PARAMS;
}

function CreateSnippet(props: CreateSnippetProps) {
  const { params } = props;
  const snippetId = params.snippetId;

  return (
    <ConvexClientProvider>
      <SnippetEditor />
    </ConvexClientProvider>
  );
}

export default CreateSnippet;
