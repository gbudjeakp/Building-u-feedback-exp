import { useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function TextEditor({ isMentor, submittedContent }) {
  const [editorContent, setEditorContent] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  // const [submittedContent, setSubmittedContent] = useState([]);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: editorContent,
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
  });

  const handleSubmit = () => {
    if (editorContent !== "") {
      // the new feedback will now be added as <li> elements and will not erase the previous ones
      submittedContent(editorContent);
      open();
      setEditorContent("");
      editor.commands.clearContent();
    }
  };

  return (
    <>
      {isMentor && (
        <div>
        <Modal opened={opened} onClose={close} withCloseButton={false}>
          Feedback Added !!!!
        </Modal>
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
        </div>
      )}
    </>
  );
}

export default TextEditor;
