import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function PageOpen({ rootFolder }) {
  // Route param
  const { id } = useParams();

  // File content state
  const [fileData, setFileData] = useState("");

  useEffect(() => {
    async function loadFile() {
      try {
        // No folder connected
        if (!rootFolder) return;
        // Open journal folder
        const journalFolder = await rootFolder.getDirectoryHandle(id);

        // Open notes.txt
        const fileHandle = await journalFolder.getFileHandle("notes.txt");

        // Get file object
        const file = await fileHandle.getFile();

        // Read text
        const text = await file.text();

        // Save into state
        setFileData(text);
      } catch (error) {
        console.log(error);
      }
    }

    loadFile();
  }, [rootFolder, id]);

  return (
    <div className="p-10 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Journal: {id}</h1>

      <div className=" border p-5 rounded">{fileData}</div>
    </div>
  );
}

export default PageOpen;
