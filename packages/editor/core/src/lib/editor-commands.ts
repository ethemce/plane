import { Editor, Range } from "@tiptap/core";
import { UploadImage } from "../types/upload-image";
import { startImageUpload } from "../ui/plugins/upload-image";

export const toggleBold = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).toggleBold().run();
  else editor.chain().focus().toggleBold().run();
};

export const toggleItalic = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).toggleItalic().run();
  else editor.chain().focus().toggleItalic().run();
};

export const toggleUnderline = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).toggleUnderline().run();
  else editor.chain().focus().toggleUnderline().run();
};

export const toggleCode = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).toggleCode().run();
  else editor.chain().focus().toggleCode().run();
};
export const toggleOrderedList = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).toggleOrderedList().run();
  else editor.chain().focus().toggleOrderedList().run();
};

export const toggleBulletList = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).toggleBulletList().run();
  else editor.chain().focus().toggleBulletList().run();
};

export const toggleStrike = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).toggleStrike().run();
  else editor.chain().focus().toggleStrike().run();
};

export const toggleBlockquote = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").toggleBlockquote().run();
  else editor.chain().focus().toggleNode("paragraph", "paragraph").toggleBlockquote().run();
};

export const insertTableCommand = (editor: Editor, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  else editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
};

export const insertImageCommand = (editor: Editor, uploadFile: UploadImage, setIsSubmitting?: (isSubmitting: "submitting" | "submitted" | "saved") => void, range?: Range) => {
  if (range) editor.chain().focus().deleteRange(range).run();
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async () => {
    if (input.files?.length) {
      const file = input.files[0];
      const pos = editor.view.state.selection.from;
      startImageUpload(file, editor.view, pos, uploadFile, setIsSubmitting);
    }
  };
  input.click();
};
