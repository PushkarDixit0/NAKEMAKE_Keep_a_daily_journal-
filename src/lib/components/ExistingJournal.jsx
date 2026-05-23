import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ExistingJournal({ rootFolder }) {
  const [folders, setFolders] = useState([]);
  let [hasFolders, setHasFolder] = useState(false);
  useEffect(() => {
    if (folders.length > 0) {
      setHasFolder(true);
    } else {
      setHasFolder(false);
    }
  }, [folders]);

  useEffect(() => {
    async function loadFolders() {
      // No folder connected yet
      if (!rootFolder) return;

      const folderList = [];

      // Read all entries
      for await (const entry of rootFolder.values()) {
        // Only folders
        if (entry.kind === "directory") {
          folderList.push(entry.name);
        }
      }

      setFolders(folderList);
    }

    loadFolders();
  }, [rootFolder]);

  if (hasFolders) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Existing Journals</h2>

        <ul className="flex gap-2">
          {folders.map((folder, index) => (
            <li key={index} className="border p-2 rounded">
              <Link to={`pageOpen/${folder}`}>{folder}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return;
}

export default ExistingJournal;
