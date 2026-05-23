import { Route, Routes } from "react-router-dom";
import "./App.css";
import RootPage from "./RootPage";
import PageOpen from "./lib/components/PageOpen";
import MediaGallery from "./lib/components/MediaGallery";
import { useState } from "react";
function App() {
  const [rootFolder, setRootFolder] = useState(null);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RootPage rootFolder={rootFolder} setRootFolder={setRootFolder} />
          }
        />
        <Route
          path="/pageOpen/:id"
          element={<PageOpen rootFolder={rootFolder} />}
        />

        <Route
          path="/gallery/:id"
          element={<MediaGallery rootFolder={rootFolder} />}
        />
      </Routes>
    </>
  );
}

export default App;
