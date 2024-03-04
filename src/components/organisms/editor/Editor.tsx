'use client';

import ReactEditor from '@monaco-editor/react';
import debounce from 'lodash.debounce';

// Constants
import { EDITOR_OPTIONS } from './constants/editorOptions';

// Components
import EditorLoading from './components/atoms/editor-loading';

function onChange(value: string | undefined) {
  console.log(value);
}

const debouncedOnChange = debounce(onChange, 500);

function Editor() {
  return (
    <ReactEditor
      {...EDITOR_OPTIONS}
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
