import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Pilcrow,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Minus,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Superscript as SupIcon,
  Subscript as SubIcon,

} from "lucide-react";

/* ---------------- BUTTON ---------------- */
const Btn = ({ onClick, active, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`
      group relative p-2 rounded-md transition-all duration-150
      hover:bg-purple-100 active:scale-95
      focus:outline-none focus:ring-2 focus:ring-purple-400/40
      ${active ? "bg-purple-200 text-purple-800 shadow-sm" : "text-purple-700"}
    `}
  >
    {children}

    {active && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-600" />
    )}
  </button>
);

/* ---------------- DIVIDER ---------------- */
const Divider = () => <div className="w-px h-6 bg-purple-200 mx-1" />;

/* ---------------- GROUP ---------------- */
const Group = ({ children }) => (
  <div className="flex items-center gap-1 px-1">{children}</div>
);

export default function Editor({ value, setValue }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Superscript,
      Subscript,
      Highlight,
    ],
    content: value,
    onUpdate: ({ editor }) => setValue(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="border border-purple-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* TOOLBAR */}
      <div
        className="flex flex-wrap items-center gap-1 p-2 
        bg-linear-to-r from-purple-50 to-white border-b border-purple-100 sticky top-0 z-10"
        onMouseDown={(e) => e.preventDefault()}
      >
        {/* TEXT STYLE */}
        <Group>
          <Btn
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold size={16} />
          </Btn>

          <Btn
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic size={16} />
          </Btn>

          <Btn
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          >
            <UnderlineIcon size={16} />
          </Btn>

          <Btn
            title="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
          >
            <Strikethrough size={16} />
          </Btn>
        </Group>

        <Divider />

        {/* STRUCTURE */}
        <Group>
          <Btn
            title="Paragraph"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <Pilcrow size={16} />
          </Btn>

          <Btn
            title="Heading"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 size={16} />
          </Btn>

          <Btn
            title="Quote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <Quote size={16} />
          </Btn>

          <Btn
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
          >
            <Code size={16} />
          </Btn>
        </Group>

        <Divider />

        {/* LISTS */}
        <Group>
          <Btn
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List size={16} />
          </Btn>

          <Btn
            title="Numbered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered size={16} />
          </Btn>
        </Group>

        <Divider />

        {/* ALIGN */}
        <Group>
          <Btn
            title="Align Left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={16} />
          </Btn>

          <Btn
            title="Center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={16} />
          </Btn>

          <Btn
            title="Right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={16} />
          </Btn>
        </Group>

        <Divider />

        {/* INSERT */}
        <Group>
          <Btn
            title="Link"
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            active={editor.isActive("link")}
          >
            <LinkIcon size={16} />
          </Btn>

          <Btn
            title="Horizontal Line"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={16} />
          </Btn>
        </Group>

        <Divider />

        {/* SCRIPT */}
        <Group>
          <Btn
            title="Superscript"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            active={editor.isActive("superscript")}
          >
            <SupIcon size={16} />
          </Btn>

          <Btn
            title="Subscript"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            active={editor.isActive("subscript")}
          >
            <SubIcon size={16} />
          </Btn>
        </Group>

        <Divider />

        {/* HISTORY */}
        <Group>
          <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={16} />
          </Btn>

          <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={16} />
          </Btn>
        </Group>
      </div>

      {/* EDITOR AREA */}
      <div className="p-4 min-h-60 bg-white">
        <EditorContent
          editor={editor}
          className="prose max-w-none focus:outline-none 
          [&_.ProseMirror]:outline-none [&_.ProseMirror]:bg-transparent"
         
        />
      </div>
    </div>
  );
}
