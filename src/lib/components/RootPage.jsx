import Header from "./Header";
import Editor from "./Ediotr";
import LinkYouLocalJournal from "./LinkYouLocalJournal";
import ExistingJournal from "./ExistingJournal";

function RootPage({ rootFolder, setRootFolder }) {
  async function handleSave(text, media) {
    try {
      // Select base folder
      const rootDir = rootFolder ?? (await window.showDirectoryPicker());
      // Today's folder name
      const today = new Date().toLocaleDateString("en-CA");
      // Create today's folder
      const todayDir = await rootDir.getDirectoryHandle(today, {
        create: true,
      });

      await todayDir.removeEntry("images", { recursive: true }).catch(() => {});
      await todayDir.removeEntry("audio", { recursive: true }).catch(() => {});
      await todayDir.removeEntry("media", { recursive: true }).catch(() => {});
      await todayDir.removeEntry("notes.txt").catch(() => {});

      // Create subfolders
      const imagesDir = await todayDir.getDirectoryHandle("images", {
        create: true,
      });

      const audioDir = await todayDir.getDirectoryHandle("audio", {
        create: true,
      });

      const mediaDir = await todayDir.getDirectoryHandle("media", {
        create: true,
      });

      // Create text file
      const fileHandle = await todayDir.getFileHandle("notes.txt", {
        create: true,
      });

      // Create writable stream
      const writable = await fileHandle.createWritable();

      // Write text data
      await writable.write(text);

      // Close stream
      await writable.close();

      console.log("Media:", media);
      if (media.length === 0) {
        alert("Saved Successfully");
        return;
      }

      for (let i = 0; i < media.length; i++) {
        const file = media[i];

        let targetDir = mediaDir;

        if (file.type.startsWith("image/")) {
          targetDir = imagesDir;
        } else if (file.type.startsWith("audio/")) {
          targetDir = audioDir;
        }

        const mediaFileHandle = await targetDir.getFileHandle(file.name, {
          create: true,
        });

        const mediaWritable = await mediaFileHandle.createWritable();

        await mediaWritable.write(file);

        await mediaWritable.close();

        console.log("Saved:", file.name);
      }

      alert("Saved Successfully");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="app-shell items-center">
      <Header />
      <Editor rootFolder={rootFolder} onSave={handleSave} />
      <LinkYouLocalJournal setRootFolder={setRootFolder} />
      <ExistingJournal rootFolder={rootFolder} />
    </main>
  );
}

export default RootPage;
