'use client';

import ReactEditor from '@monaco-editor/react';
import debounce from 'lodash.debounce';

// Constants
import {
  EDITOR_OPTIONS,
  READ_ONLY_EDITOR_OPTIONS,
} from './constants/editorOptions';

// Components
import EditorLoading from './components/atoms/editor-loading';

interface EditorProps {
  onChange?: (value: string | undefined) => void;
  defaultValue: string;
  readOnly?: boolean;
}

function Editor(props: EditorProps) {
  // savedCode || '// Start writing code and share with peer developers.\n';
  const { defaultValue, readOnly, onChange = () => {} } = props;

  const debouncedOnChange = debounce(onChange, 500);
  const editorOptions = readOnly ? READ_ONLY_EDITOR_OPTIONS : EDITOR_OPTIONS;

  return (
    <ReactEditor
      {...editorOptions}
      defaultValue={defaultValue}
      loading={<EditorLoading />}
      onMount={(editor) => {
        editor.setPosition({ column: 1, lineNumber: 2 });
        editor.focus();
      }}
      onChange={debouncedOnChange}
    />
  );
}

export default Editor;
