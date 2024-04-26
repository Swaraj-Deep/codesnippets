'use client';

// Components
import Editor from '@/components/organisms/editor';
import { CODE } from '@/constants/localstorage';
import { getCodeSnippetToDisplay } from '@/helpers/snippets';

interface SnippetEditorProps {
  snippetId: string;
  savedSnippet: { codeSnippet: string; version: number };
}

function SnippetEditor(props: SnippetEditorProps) {
  const { snippetId, savedSnippet } = props;
  function onChange(value: string | undefined) {
    localStorage.setItem(
      CODE,
      snippetId + '|' + (savedSnippet.version + 1) + '|' + value || ''
    );
  }

  const savedCode = getCodeSnippetToDisplay(snippetId, savedSnippet);

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
