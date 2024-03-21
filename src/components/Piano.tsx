"use client";
import React, { useState, useEffect } from "react";

// indicates the mapping of keys to note IDs
type KeyMap = {
  [key: string]: {
    [key: string]: string;
  };
};

const Piano: React.FC = () => {
  // state to store the key map
  const [keyMap, setKeyMap] = useState<KeyMap>({});
  // state to store the active key
  const [activeKey, setActiveKey] = useState<string | null>(null);
  // state to track whether the "[" key is pressed
  const [isBracketPressed, setIsBracketPressed] = useState<boolean>(false);

  // state to track the current side of keys
  const [keySide, setKeySide] = useState<"alternativeKeys" | "side2">("side2");

  useEffect(() => {
    // load the key map from the defaultKeys.json file
    const loadKeyMap = async () => {
      try {
        const response = await fetch("/defaultKeys.json");
        const data = await response.json();
        setKeyMap(data);
      } catch (error) {
        console.error("Error loading piano keys", error);
      }
    };

    loadKeyMap();

    // add event listeners for keydown and keyup events
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "[") {
        setIsBracketPressed(true);
        setKeySide("alternativeKeys"); // update key side when '[' key is pressed
      }

      const side = isBracketPressed ? "alternativeKeys" : "side2";

      const keyCombo = `${event.shiftKey ? "Shift + " : ""}${event.code}`;

      const noteId =
        keyMap[side] && keyMap[side][keyCombo]
          ? keyMap[side][keyCombo]
          : keyMap["side2"][keyCombo];

      if (noteId) {
        setActiveKey(keyCombo);
        playAudio(noteId);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "[") {
        setIsBracketPressed(false);
        setKeySide("side2"); // update key side when '[' key is released
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // cleanup the event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyMap, isBracketPressed]);

  // function to play audio
  const playAudio = (noteId: string) => {
    const audio = new Audio(`/notes/${noteId}.wav`);
    audio
      .play()
      .then(() => {
        setTimeout(() => setActiveKey(null), 200);
      })
      .catch((error) => console.error("Error playing audio", error));
  };

  // function to handle key click
  const handleKeyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const noteId = event.currentTarget.dataset.noteId;
    if (noteId) {
      setActiveKey(noteId);
      playAudio(noteId);
    }
  };

  return (
    <div className="flex relative select-none">
      {Object.entries(keyMap["side1"] || {}).map(([key, noteId]) => (
        <div key={key} className="relative">
          <button
            className={`border border-black cursor-pointer flex justify-center items-end
        ${
          noteId.includes("s")
            ? `${
                activeKey === key && isBracketPressed
                  ? "bg-blue-500 text-white h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2"
                  : "bg-black text-white h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2"
              }`
            : `${
                activeKey === key && isBracketPressed
                  ? "bg-blue-500 text-white h-40 w-8 mr-1 z-10"
                  : "bg-white text-black h-40 w-8 mr-1 z-10"
              }`
        }`}
            data-note-id={noteId}
            onClick={handleKeyClick}
          >
            {noteId}
          </button>
        </div>
      ))}

      {Object.entries(keyMap["side2"] || {}).map(([key, noteId]) => (
        <div key={key} className="relative">
          <button
            className={`border border-black cursor-pointer flex justify-center items-end
        ${
          noteId.includes("s")
            ? `${
                activeKey === key && !isBracketPressed
                  ? "bg-blue-500 text-white h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2"
                  : "bg-black text-white h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2"
              }`
            : `${
                activeKey === key && !isBracketPressed
                  ? "bg-blue-500 text-white h-40 w-8 mr-1 z-10"
                  : "bg-white text-black h-40 w-8 mr-1 z-10"
              }`
        }`}
            data-note-id={noteId}
            onClick={handleKeyClick}
          >
            {noteId}
          </button>
        </div>
      ))}

      {Object.entries(keyMap["side3"] || {}).map(([key, noteId]) => (
        <div key={key} className="relative">
          <button
            className={`border border-black cursor-pointer flex justify-center items-end
        ${
          noteId.includes("s")
            ? `${
                activeKey === key && isBracketPressed
                  ? "bg-blue-500 text-white h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2"
                  : "bg-black text-white h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2"
              }`
            : `${
                activeKey === key && isBracketPressed
                  ? "bg-blue-500 text-white h-40 w-8 mr-1 z-10"
                  : "bg-white text-black h-40 w-8 mr-1 z-10"
              }`
        }`}
            data-note-id={noteId}
            onClick={handleKeyClick}
          >
            {noteId}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Piano;
