import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Editor({ rootFolder, onSave }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [mediaCount, setMediaCount] = useState(0);
  const id = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    async function loadFile() {
      try {
        // No folder connected
        if (!rootFolder) return;

        // Open journal folder
        const journalFolder = await rootFolder.getDirectoryHandle(id);

        const imagesDir = await journalFolder.getDirectoryHandle("images");

        const audioDir = await journalFolder.getDirectoryHandle("audio");

        const mediaDir = await journalFolder.getDirectoryHandle("media");
        // Open notes.txt
        const fileHandle = await journalFolder.getFileHandle("notes.txt");

        // Get file object
        const file = await fileHandle.getFile();

        // Read text
        const text = await file.text();

        const media = [];
        // Save into state
        setText(text);
        for await (const [name, handle] of imagesDir.entries()) {
          if (handle.kind === "file") {
            const file = await handle.getFile();

            media.push({
              name,
              file,
            });
          }
        }
        for await (const [name, handle] of audioDir.entries()) {
          if (handle.kind === "file") {
            const file = await handle.getFile();

            media.push({
              name,
              file,
            });
          }
        }
        for await (const [name, handle] of mediaDir.entries()) {
          if (handle.kind === "file") {
            const file = await handle.getFile();

            media.push({
              name,
              file,
            });
          }
        }

        setMedia(media);
        setMediaCount(media.length);
      } catch (error) {
        console.log(error);
      }
    }

    loadFile();
  }, [rootFolder, id]);

  return (
    <>
      <div className="flex w-155 flex-col gap-3">
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="min-h-60 w-full flex-1 resize-none rounded-md border border-gray-300 p-3 outline-none focus:border-black"
          value={text}
        />
        <div className="flex justify-between gap-4 w-full">
          <button
            className="rounded-md bg-black px-5 py-2 font-semibold text-white"
            onClick={() => onSave(text, media)}
          >
            Save
          </button>
          <div className="flex gap-5 justify-baseline items-center">
            <Link to={`gallery/${id}`}>
              <div className="bg-blue-300 w-14  flex justify-center items-center p-2 rounded-full relative">
                <Icon icon="material-symbols:photo-prints-outline" width="24" />
                <span className="bg-red-600 rounded-full w-6 absolute -top-2 -right-2">
                  {mediaCount || ""}
                </span>
              </div>
            </Link>
            <label className="bg-blue-300 w-10  flex justify-center items-center p-2 rounded-full">
              <Icon icon="material-symbols:add" width="24" />
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => {
                  const files = Array.from(e.target.files);

                  setMedia(files);
                  setMediaCount(files.length);
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editor;
