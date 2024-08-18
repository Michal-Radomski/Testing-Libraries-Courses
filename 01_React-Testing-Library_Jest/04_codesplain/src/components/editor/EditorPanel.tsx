import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useFile from "../../hooks/useFile";
import Editor from "./Editor";
import ExplanationList from "./ExplanationList";
import Breadcrumbs from "./Breadcrumbs";

function EditorPage(): JSX.Element {
  const { "*": path, owner, repoName } = useParams();
  const { file } = useFile(owner!, repoName!, path!);
  const [selections, setSelections] = useState<Selection[]>([]);
  const editorRef = useRef(null) as React.MutableRefObject<any>;
  console.log(editorRef);

  const handleExplainRequest = ({ text, line, editor, path }: Selection) => {
    // console.log(text, line, editor, path);

    if (!text.trim() || selections.find((e: Selection) => e.line === line)) {
      return;
    }
    editorRef.current = editor;
    setSelections([...(selections as Selection[]), { text, line, path } as Selection]);
  };
  const handleExplanationClose = (selection: Selection) => {
    setSelections(selections.filter((sel) => sel.line !== selection.line));
  };

  return (
    <div>
      <Breadcrumbs path={path as string} />
      <Editor onExplainRequest={handleExplainRequest} file={file as File} />
      {/* @ts-ignore - //* ReactPortal */}
      <ExplanationList editorRef={editorRef} selections={selections} onExplanationClose={handleExplanationClose} />
    </div>
  );
}

export default EditorPage;
