import { Editor, EditorState } from 'draft-js';
import { useState } from 'react';
import 'draft-js/dist/Draft.css';

function TextEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  return (
    <div className="App">
      <div>Text Editor</div>
      <div className='container'>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
}

export default TextEditor;
