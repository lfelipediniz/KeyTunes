'use client';
import React, { useState, useEffect } from 'react';

// indicates the mapping of keys to note IDs
type KeyMap = {
  [key: string]: string;
};

const Piano: React.FC = () => {
  
  // state to store the key map
  const [keyMap, setKeyMap] = useState<KeyMap>({});

  useEffect(() => {
    // load the key map from the defaultKeys.json file
    const loadKeyMap = async () => {
      try {
        const response = await fetch('/defaultKeys.json');
        const data = await response.json();
        setKeyMap(data);
      } catch (error) {
        console.error('Error loading piano keys', error);
      }
    };

    loadKeyMap();

    // add event listener to handle keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyCombo = `${event.shiftKey ? 'Shift + ' : ''}${event.code}`;
      const noteId = keyMap[keyCombo];
      if (noteId) {
        playAudio(noteId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyMap]); // run the effect only when the keyMap changes

  const playAudio = (noteId: string) => {
    const audio = new Audio(`/notes/${noteId}.wav`);
    audio.play().catch(error => console.error("Erro ao tentar reproduzir o áudio", error));
  };

  const handleKeyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const noteId = event.currentTarget.dataset.noteId;
    if (noteId) {
      playAudio(noteId);
    }
  };

  return (
    <div className="flex relative select-none">
      {Object.entries(keyMap).map(([key, noteId]: any) => (
        <div key={key} className="relative">
        <button
          key={key}
          className={`border border-black cursor-pointer flex justify-center items-end ${noteId.includes('s') ? 'bg-black text-white h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2' : 'bg-white text-black h-40 w-8 mr-1 z-10'}`}
          data-note-id={noteId}
          onClick={handleKeyClick}
          style={{ paddingBottom: '1rem' }}
          
        >
          {noteId}
        </button>
        </div>
      ))}
    </div>
  );
};

export default Piano;
