"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Link2,
  List,
  ListOrdered,
  Code,
  Smile,
  AtSign,
  Hash,
  Slash,
  XIcon,
  FileIcon,
  SendHorizonal,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { UploadRequest } from "~/utils/new-request";
import { compressImage } from "~/utils/compress-image";
import { useParams } from "next/navigation";
import { uuidv7 } from "uuidv7";
import { EditorContent } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Picker from "~/components/theme/themed-emoji-picker";
import GifPicker from "~/components/gifs/gif-picker";
import data from "@emoji-mart/data";
import Loading from "~/components/ui/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import UseTextEditor from "./editor";
import Tooltips from "./tooltip";
import { CHAT_FILE_ACCEPT } from "~/utils/document-files";
import { localGifToFile, type LocalGif } from "~/lib/gifs/local-pack";

const FirstMessageBox = ({ sendMessage }: any) => {
  const { editor, isEmpty } = UseTextEditor();
  const params = useParams();
  const id = params.id as string;
  const uuid = uuidv7();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
  const [showFormatting, setShowformatting] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<any>([]);
  const prevMediaRef = useRef(media);
  const [medias, setMedias] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState<number[]>([]);

  // Cleanup object URLs - only revoke URLs for removed items
  useEffect(() => {
    const prevMedia = prevMediaRef.current;
    prevMediaRef.current = media;

    return () => {
      prevMedia.forEach((image: any) => {
        if (!media.some((m: any) => m.id === image.id)) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [media]);

  const handleSave = () => {
    if (!text || !url) return;

    editor
      ?.chain()
      .focus()
      .insertContent(
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
      )
      .run();

    setOpen(false);
    setText("");
    setUrl("");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const newMedia = Array.from(files).map((file) => {
      const fileType = file.type.split("/")[0];

      return {
        id: Date.now() + Math.random(),
        file,
        type: fileType,
        preview:
          fileType === "image" || fileType === "video"
            ? URL.createObjectURL(file)
            : null,
      };
    });

    setMedia((prevMedia: any) => [...prevMedia, ...newMedia]);

    for (const media of newMedia) {
      setUploadingImages((prev) => [...prev, media.id]);

      const formData = new FormData();
      const fileToUpload = await compressImage(media.file);
      formData.append("files", fileToUpload);

      try {
        const res = await UploadRequest(`/files/upload-files`, formData);
        if (res?.data?.data) {
          setMedias((prevMedias) => [...prevMedias, ...res.data.data]);
        }
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setUploadingImages((prev) => prev.filter((id) => id !== media.id));
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setMedia((prevImages: any) =>
      prevImages.filter((_: any) => _ !== prevImages[index])
    );
    setMedias((prevMedias) => prevMedias.filter((_, i) => i !== index));
  };

  // Handle message submission (no need to upload images here)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let content = editor?.getHTML();

    const strippedContent = content?.replace(/<[^>]+>/g, "").trim();

    if (!strippedContent && medias.length === 0) {
      return;
    }

    editor?.commands?.clearContent();
    setMedia([]);

    sendMessage(id, uuid, content, medias);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        return;
      } else {
        event.preventDefault();
        handleSubmit(event);
      }
    }
  };

  const onEmojiClick = (emojiData: any) => {
    if (editor) {
      editor.chain().focus().insertContent(emojiData?.native).run();
      setIsEmojiPickerOpen(false);
    }
  };

  const handleGifSelect = async (gif: LocalGif) => {
    setIsGifPickerOpen(false);

    try {
      const file = await localGifToFile(gif);
      const mediaId = Date.now() + Math.random();
      const preview = URL.createObjectURL(file);

      const newMedia = {
        id: mediaId,
        file,
        type: "image",
        preview,
      };

      setMedia((prevMedia: any) => [...prevMedia, newMedia]);
      setUploadingImages((prev) => [...prev, mediaId]);

      const formData = new FormData();
      const fileToUpload = await compressImage(file);
      formData.append("files", fileToUpload);

      try {
        const res = await UploadRequest(`/files/upload-files`, formData);
        if (res?.data?.data) {
          setMedias((prevMedias) => [...prevMedias, ...res.data.data]);
        }
      } catch (error) {
        console.error("GIF upload failed", error);
      } finally {
        setUploadingImages((prev) => prev.filter((id) => id !== mediaId));
      }
    } catch (error) {
      console.error("GIF select failed", error);
    }
  };

  const handleMentionClick = () => {
    editor?.chain().focus().insertContent("@").run();
  };

  const handleChannelMentionClick = () => {
    editor?.chain().focus().insertContent("#").run();
  };

  const handleSlashCommandClick = () => {
    editor?.chain().focus().insertContent("/").run();
  };

  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  //

  return (
    <>
      <div
        onClick={() => editor && editor.commands.focus()}
        className={`bg-white border rounded-xl mx-3 md:mx-5 border-[#E6EAEF]`}
      >
        {showFormatting && (
          <div className="border-b border-[#E6EAEF] flex items-center gap-2 bg-[#F9FAFB] pl-3 pr-4 py-[5px]">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`p-1.5 hover:bg-gray-100 rounded ${
                editor?.isActive("bold")
                  ? "bg-gray-200 font-semibold text-black"
                  : ""
              }`}
            >
              <Bold
                size={18}
                color={editor?.isActive("bold") ? "#444444" : "#CACACA"}
              />
            </button>

            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`p-1.5 hover:bg-gray-100 rounded ${
                editor?.isActive("italic")
                  ? "bg-gray-200 font-semibold text-black"
                  : ""
              }`}
            >
              <Italic
                size={18}
                color={editor?.isActive("italic") ? "#444444" : "#CACACA"}
              />
            </button>

            <button
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              className={`p-1.5 hover:bg-gray-100 rounded ${
                editor?.isActive("strike")
                  ? "bg-gray-200 font-semibold text-black"
                  : ""
              }`}
            >
              <Strikethrough
                size={18}
                color={editor?.isActive("strike") ? "#444444" : "#CACACA"}
              />
            </button>

            <div className="w-px h-5 bg-[#E6EAEF]" />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={() => setOpen(true)}
                  className={`p-1.5 hover:bg-gray-100 rounded ${editor?.isActive("link") ? "bg-gray-200 font-semibold text-black" : ""}`}
                >
                  <Link2
                    size={18}
                    color={editor?.isActive("link") ? "#444444" : "#CACACA"}
                  />
                </button>
              </DialogTrigger>

              <DialogContent className="w-full max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-semibold">Add link</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Text</label>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter link text"
                  />

                  <label className="text-sm font-medium mt-2">Link</label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    type="url"
                  />
                </div>

                <DialogFooter className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!text || !url}
                    className="bg-blue-500 text-white px-10"
                  >
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <button
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`p-1.5 hover:bg-gray-100 rounded ${
                editor?.isActive("orderedList")
                  ? "bg-gray-200 font-semibold text-black"
                  : ""
              }`}
            >
              <ListOrdered
                size={18}
                color={editor?.isActive("orderedList") ? "#444444" : "#CACACA"}
              />
            </button>

            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`p-1.5 hover:bg-gray-100 rounded ${
                editor?.isActive("bulletList")
                  ? "bg-gray-200 font-semibold text-black"
                  : ""
              }`}
            >
              <List
                size={18}
                color={editor?.isActive("bulletList") ? "#444444" : "#CACACA"}
              />
            </button>

            <div className="w-px h-5 bg-[#E6EAEF]" />

            <button
              onClick={() => editor?.chain().focus().toggleCode().run()}
              className={`p-1.5 hover:bg-gray-100 rounded ${
                editor?.isActive("code")
                  ? "bg-gray-200 font-semibold text-black"
                  : ""
              }`}
            >
              <Code
                size={18}
                color={editor?.isActive("code") ? "#444444" : "#CACACA"}
              />
            </button>
          </div>
        )}

        <div className="md:flex-1 relative px-3">
          <EditorContent
            editor={editor}
            className="py-2 rounded-md flex flex-row overflow-auto"
            onKeyDown={handleKeyDown}
          />

          <div className={`flex gap-3 ${media?.length > 0 ? "mt-3" : ""}`}>
            {media?.map((file: any) => (
              <div key={file.id} className="relative w-[70px] h-[70px]">
                {file.type === "image" ? (
                  <Image
                    src={file.preview}
                    alt={`Uploaded ${file.id}`}
                    width={70}
                    height={70}
                    className="w-[70px] h-[70px] rounded-md object-cover border border-primary-400 cursor-pointer"
                  />
                ) : file.type === "application" ? (
                  <div className="w-[70px] h-[70px] flex items-center justify-center border border-primary-500 rounded-md bg-gray-100">
                    <a
                      href={URL.createObjectURL(file.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center"
                    >
                      <FileIcon size={24} color="#606060" />
                      <span className="text-xs text-blue-500 mt-1">PDF</span>
                    </a>
                  </div>
                ) : null}

                <button
                  onClick={() => handleRemoveImage(file.id)}
                  className="absolute -top-1 -right-2 p-1 bg-gray-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >
                  <XIcon size={14} />
                </button>

                {uploadingImages.includes(file?.id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                    <Loading />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 py-2 pl-3 pr-4">
            <Tooltips text="Upload from your computer">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 hover:bg-gray-100 rounded-full bg-[#F2F4F7]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept={CHAT_FILE_ACCEPT}
                  multiple
                />

                <Upload size={18} color="#606060" />
              </button>
            </Tooltips>

            <Tooltips
              text={!showFormatting ? "Show formatting" : "Hide formatting"}
            >
              <button
                onClick={() => setShowformatting((prev) => !prev)}
                className="p-1.5 hover:bg-gray-100 rounded text-[#606060] underline"
              >
                Aa
              </button>
            </Tooltips>

            <Tooltips text="Emoji">
              <div className="relative">
                <Popover
                  open={isEmojiPickerOpen}
                  onOpenChange={(open) => {
                    setIsEmojiPickerOpen(open);
                    if (open) setIsGifPickerOpen(false);
                  }}
                >
                  <PopoverTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:bg-gray-100 rounded"
                    >
                      <Smile size={18} color="#606060" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-full max-w-xs">
                    <Picker data={data} onEmojiSelect={onEmojiClick} />
                  </PopoverContent>
                </Popover>
              </div>
            </Tooltips>

            <Tooltips text="GIF">
              <div className="relative">
                <Popover
                  open={isGifPickerOpen}
                  onOpenChange={(open) => {
                    setIsGifPickerOpen(open);
                    if (open) setIsEmojiPickerOpen(false);
                  }}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="px-1.5 py-1 hover:bg-gray-100 rounded"
                      aria-label="GIF"
                    >
                      <span className="block text-[10px] font-bold leading-none tracking-wide text-[#606060] border border-[#606060] rounded px-1 py-0.5">
                        GIF
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 border-0 shadow-none"
                    align="start"
                  >
                    <GifPicker onSelect={handleGifSelect} />
                  </PopoverContent>
                </Popover>
              </div>
            </Tooltips>

            <Tooltips text="Mention someone">
              <button
                onClick={handleMentionClick}
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <AtSign size={18} color="#606060" />
              </button>
            </Tooltips>

            <Tooltips text="Mention a channel">
              <button
                onClick={handleChannelMentionClick}
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <Hash size={18} color="#606060" />
              </button>
            </Tooltips>

            <Tooltips text="Slash commands">
              <button
                onClick={handleSlashCommandClick}
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <Slash size={18} color="#606060" />
              </button>
            </Tooltips>
          </div>

          <div className="flex items-center gap-1 py-2 pl-3 pr-4">
            <button
              type="submit"
              className="p-1.5 hover:bg-gray-100 rounded size-8 flex items-center justify-center"
              onClick={handleSubmit}
              disabled={isEmpty && media?.length === 0}
            >
              <SendHorizonal
                className={
                  isEmpty && media?.length === 0
                    ? "text-[#999] dark:text-zinc-500"
                    : "text-zinc-900 dark:text-zinc-100"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstMessageBox;
