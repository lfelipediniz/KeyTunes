"use client";
import React, { useState, useEffect } from "react";

// indicates the mapping of keys to note IDs
type KeyMap = {
  [key: string]: {
    [key: string]: string;
  };
};

const Piano: React.FC = () => {
  // to store the key map
  const [keyMap, setKeyMap] = useState<KeyMap>({});
  // to store the active keys
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  // to track whether the "[" key is pressed
  const [isBracketPressed, setIsBracketPressed] = useState<boolean>(false);
  // to track the current side of keys
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

      // verify if the command exists in alternativeKeys when isBracketPressed is true
      if (isBracketPressed && !keyMap["alternativeKeys"]?.[keyCombo]) {
        // if the command does not exist, switch to side2
        return;
      }

      const noteId = keyMap[side]?.[keyCombo] || keyMap["side2"]?.[keyCombo];

      if (noteId && !activeKeys.includes(keyCombo)) {
        setActiveKeys((prevKeys) => [...prevKeys, keyCombo]);
        playAudio(noteId);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "[") {
        setIsBracketPressed(false);
        setKeySide("side2"); // update key side when '[' key is released
      }

      const keyCombo = `${event.shiftKey ? "Shift + " : ""}${event.code}`;
      setActiveKeys((prevKeys) => prevKeys.filter((key) => key !== keyCombo));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    // cleanup the event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyMap, activeKeys, isBracketPressed]);

  const playAudio = (noteId: string) => {
    const audio = new Audio(`/notes/${noteId}.mp3`);
    audio
      .play()
      .then(() => {})
      .catch((error) => console.error("Error playing audio", error));
  };

  const handleKeyClick = (noteId: string) => {
    // No need to change the active state on click for now
    playAudio(noteId);
  };

  const renderPianoKey = (key: string, noteId: string, side: string) => {
    const isSharp = noteId.includes("s");

    // determines whether the key should be considered active based on the state of isBracketPressed
    // and which side the key belongs to
    const isActive =
      activeKeys.includes(key) &&
      ((isBracketPressed && (side === "side1" || side === "side3")) ||
        (!isBracketPressed && side === "side2"));

    const baseClasses =
      "border border-black cursor-pointer flex justify-center items-end";
    const sharpClasses =
      "h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2";
    const naturalClasses = "h-40 w-8 mr-1 z-10";
    const activeClasses = "bg-blue-500 text-white";
    const inactiveSharpClasses = "bg-black text-white";
    const inactiveNaturalClasses = "bg-white text-black";

    // determine the class names based on the state of the key
    const className = `${baseClasses} ${
      isSharp ? sharpClasses : naturalClasses
    } ${
      isActive
        ? activeClasses
        : isSharp
        ? inactiveSharpClasses
        : inactiveNaturalClasses
    }`;

    // Split the key combo to display only the relevant key without modifiers
    // Assuming the format is "Shift + KeyX", "Digit1", or "KeyX"
    const displayKey = (key.split(" ").pop() ?? "").replace(/^Key|^Digit/, "");



    // return the button element with the appropriate class names and event handler
    return (
      <div key={key} className="relative">
        <button
          className={className}
          data-note-id={noteId}
          onMouseDown={() => handleKeyClick(noteId)}
        >
          {displayKey} {/* Use the processed displayKey for the button label */}
        </button>
      </div>
    );
};


  // adjustment of component return to pass 'side' as a parameter to renderPianoKey
  return (
    <div className="flex relative select-none">
      {Object.entries(keyMap["side1"] || {}).map(([key, noteId]) =>
        renderPianoKey(key, noteId, "side1")
      )}
      {Object.entries(keyMap["side2"] || {}).map(([key, noteId]) =>
        renderPianoKey(key, noteId, "side2")
      )}
      {Object.entries(keyMap["side3"] || {}).map(([key, noteId]) =>
        renderPianoKey(key, noteId, "side3")
      )}
    </div>
  );
};

export default Piano;
