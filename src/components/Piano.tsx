'use client'; // this is a client-side component
import React, { useState, useEffect } from 'react';

const Piano: React.FC = () => {
  const [keyMap, setKeyMap] = useState({});

  useEffect(() => {
    // fetch the default keys from the JSON file
    // and set the state with the key map
    fetch('/defaultKeys.json')
      .then((res) => res.json())
      .then((data) => setKeyMap(data))
      .catch((error) => console.error('Erro ao carregar as teclas do piano', error));
  }, []);

  const playAudio = (noteId: string) => {
    const audio = new Audio(`/notes/${noteId}.wav`);
    audio.play().catch(error => console.error("Erro ao tentar reproduzir o áudio", error));
  };

  // function that handles the click event on the piano keys
  const handleKeyClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.dataset.noteId) {
      playAudio(target.dataset.noteId);
    }
  };

  return (
    <div onClick={handleKeyClick} className="flex relative select-none">
      {Object.entries(keyMap).map(([key, noteId]: any) => (
        <div key={key} className="relative">
          <button
            className={`border border-black cursor-pointer flex justify-center items-end ${noteId.includes('s') ? 'bg-black text-white h-24 w-5 z-20 absolute top-0 left-1/2 transform -translate-x-1/2' : 'bg-white text-black h-40 w-8 mr-1 z-10'}`}
            data-note-id={noteId}
            onClick={() => playAudio(noteId)}
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
