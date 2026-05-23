import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

function MediaGallery({ rootFolder }) {
  const [image, setImage] = useState([]);
  const [audio, setAudio] = useState([]);
  const [media, setMedia] = useState([]);

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

        const image = [];
        const audio = [];
        const media = [];

        for await (const [name, handle] of imagesDir.entries()) {
          if (handle.kind === "file") {
            const file = await handle.getFile();

            image.push({
              name,
              file,
            });
          }
        }
        for await (const [name, handle] of audioDir.entries()) {
          if (handle.kind === "file") {
            const file = await handle.getFile();

            audio.push({
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

        setImage(image);
        setAudio(audio);
        setMedia(media);
      } catch (error) {
        console.log(error);
      }
    }

    loadFile();
  }, [rootFolder, id]);
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {/* Images */}
        {image.map((item, index) => (
          <img
            key={`img-${index}`}
            src={URL.createObjectURL(item.file)}
            alt={item.name}
            className="w-24 h-24 object-cover rounded"
          />
        ))}

        {/* Audio */}
        {audio.map((item, index) => (
          <div key={`audio-${index}`} className="border p-2 rounded w-60">
            <p className="text-sm mb-2">{item.name}</p>

            <audio controls className="w-full">
              <source
                src={URL.createObjectURL(item.file)}
                type={item.file.type}
              />
            </audio>
          </div>
        ))}

        {/* Other Media */}
        {media.map((item, index) => (
          <div
            key={`media-${index}`}
            className="border p-3 rounded flex items-center gap-2"
          >
            <Icon icon="material-symbols:attach-file" width="20" />

            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default MediaGallery;
