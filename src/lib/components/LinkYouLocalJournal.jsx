function LinkYouLocalJournal({ setRootFolder }) {
  async function connectFolder() {
    try {
      const rootDir = await window.showDirectoryPicker();

      setRootFolder(rootDir);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      onClick={connectFolder}
      className="border-2 border-black p-2 rounded-3xl"
    >
      Connect Folder
    </button>
  );
}

export default LinkYouLocalJournal;
