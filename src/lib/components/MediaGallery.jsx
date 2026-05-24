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
      {/* Image */}

      <div className="p-20 min-h-lvh flex gap-20 flex-col">
        {image.length > 0 ? (
          <div className="flex justify-center flex-col  gap-10">
            <h2 className="flex justify-center text-2xl">{"Images"}</h2>
            {/* Images */}
            <div className=" grid grid-cols-3 gap-2 justify-center items-center">
              {image.map((item, index) => (
                <img
                  key={`img-${index}`}
                  src={URL.createObjectURL(item.file)}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded flex justify-center items-center border"
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Audio */}
        {audio.length > 0 ? (
          <div className="flex justify-center flex-col  gap-10">
            <h2 className="flex justify-center text-2xl">{"Audio"}</h2>
            <div className=" grid grid-cols-3 gap-2 justify-center items-center">
              {audio.map((item, index) => (
                <div
                  key={`audio-${index}`}
                  className="border p-2 rounded gap-5 flex flex-col"
                  title={item.name}
                >
                  <p className="w-full h-24 p-10 text-wrap object-cover rounded flex justify-center items-center border-4 border-black">
                    {item.name.length > 30
                      ? item.name.substring(0, 60) + "..."
                      : item.name}
                  </p>

                  <audio controls className="w-full">
                    <source
                      src={URL.createObjectURL(item.file)}
                      type={item.file.type}
                    />
                  </audio>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}

        {media.length > 0 ? (
          <div className="flex justify-center flex-col  gap-10">
            <h2 className="flex justify-center text-2xl">{"Media"}</h2>
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
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default MediaGallery;
