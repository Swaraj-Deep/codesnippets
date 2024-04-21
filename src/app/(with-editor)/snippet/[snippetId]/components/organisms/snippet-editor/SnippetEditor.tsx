'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/generated/api';

// Components
import Editor from '@/components/organisms/editor';
import { CODE } from '@/constants/localstorage';

function SnippetEditor() {
  // const codes = useQuery(api.code.get);
  function onChange(value: string | undefined) {
    console.log(value);
    localStorage.setItem(CODE, value || '');
  }

  const savedCode =
    typeof window !== 'undefined' ? localStorage.getItem(CODE) : '';

  return (
    <Editor
      onChange={onChange}
      defaultValue={
        savedCode || '// Start writing code and share with peer developers.\n'
      }
    />
  );
}

export default SnippetEditor;
