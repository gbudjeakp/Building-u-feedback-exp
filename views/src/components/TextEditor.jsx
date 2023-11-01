import { useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button, Text, Paper, Container } from "@mantine/core";

function TextEditor() {
  const [editorContent, setEditorContent] = useState("");
  const [submittedContent, setSubmittedContent] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: editorContent,
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
  });

  const handleSubmit = () => {
    setSubmittedContent(editorContent);
  };

  return (
    <>
      <Text size="sm">Enter your feedback:</Text>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <Button
        style={{ color: "black", marginTop: "20px" }}
        color="#F9EB02"
        onClick={handleSubmit}
      >
        Submit Feedback
      </Button>

      {submittedContent && (
        <div style={{ marginTop: "20px" }}>
          <Text size="xl" weight={700}>
            Submitted Feedback:
          </Text>
          <div
            dangerouslySetInnerHTML={{ __html: submittedContent }}
            style={{ border: "1px solid #e1e1e1", padding: "10px" }}
          />
        </div>
      )}
    </>
  );
}

export default TextEditor;
