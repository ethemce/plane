import { forwardRef, useEffect } from "react";
// hooks
import { useEditorMarkings } from "src/hooks/use-editor-markings";
import { getEditorClassNames, useReadOnlyEditor } from "@plane/editor-document-core";
// components
import { PageRenderer } from "src/ui/components/page-renderer";
import { IssueWidgetPlaceholder } from "../extensions/widgets/issue-embed-widget";

interface IDocumentReadOnlyEditor {
  value: string;
  customClassName: string;
  tabIndex?: number;
  title: string;
}

interface DocumentReadOnlyEditorProps extends IDocumentReadOnlyEditor {
  forwardedRef?: React.Ref<EditorHandle>;
}

interface EditorHandle {
  clearEditor: () => void;
  setEditorValue: (content: string) => void;
}

const DocumentReadOnlyEditor = (props: DocumentReadOnlyEditorProps) => {
  const {  customClassName, value, title, forwardedRef, tabIndex } =
    props;
  const { updateMarkings } = useEditorMarkings();

  const editor = useReadOnlyEditor({
    value,
    forwardedRef,
    extensions: [IssueWidgetPlaceholder()],
  });

  useEffect(() => {
    if (editor) {
      updateMarkings(editor.getHTML());
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const editorClassNames = getEditorClassNames({
    customClassName,
  });

  return (
    <div className="h-full w-full frame-renderer">
      <PageRenderer
        tabIndex={tabIndex}
        updatePageTitle={() => Promise.resolve()}
        readonly
        editor={editor}
        editorClassNames={editorClassNames}
        title={title}
      />
    </div>
  );
};

const DocumentReadOnlyEditorWithRef = forwardRef<EditorHandle, IDocumentReadOnlyEditor>((props, ref) => (
  <DocumentReadOnlyEditor {...props} forwardedRef={ref} />
));

DocumentReadOnlyEditorWithRef.displayName = "DocumentReadOnlyEditorWithRef";

export { DocumentReadOnlyEditor, DocumentReadOnlyEditorWithRef };
