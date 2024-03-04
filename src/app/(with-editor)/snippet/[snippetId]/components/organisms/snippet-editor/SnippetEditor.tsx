'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/generated/api';

// Components
import Editor from '@/components/organisms/editor';

function SnippetEditor() {
  // const codes = useQuery(api.code.get);

  return <Editor />;
}

export default SnippetEditor;
