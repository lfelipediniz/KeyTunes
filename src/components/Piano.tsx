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

  const playAudio = (noteId:string) => {
    const audio = new Audio(`/notes/${noteId}.wav`);
    audio.play().catch(error => console.error("Erro ao tentar reproduzir o áudio", error));
  };

  // function that handles the click event on the piano keys
  const handleKeyClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // check if the target is a piano key
    const target = event.target as HTMLElement;
    if (target.dataset.noteId) {
      playAudio(target.dataset.noteId);
    }
  };

  return (
    <div onClick={handleKeyClick}>
      {Object.entries(keyMap).map(([key, noteId]:any) => (
        <button
          key={key}
          className={noteId.includes('s') ? 'blackKey' : 'whiteKey'}
          data-note-id={noteId}
        >
          {noteId}
        </button>
      ))}
      <style>
      {`
        .whiteKey, .blackKey {
            border: 1px solid #000;
            cursor: pointer;
            position: relative;
            }
        
        .whiteKey {
            background-color: #fff;
            height: 100px;
            width: 30px;
            margin-right: 1px;
            z-index: 1;
            color: #000;   
            padding-top: 60px;
            }
        
        .blackKey {
            background-color: #000;
            height: 60px;
            width: 20px;
            margin-left: -10px;
            z-index: 2;
            position: absolute;
            font-size: 0.8em;
            }
        
        .blackKey:not(:last-child) {
            margin-right: 40px;
            }
                      
    `}
      </style>
    </div>
  );
};

export default Piano;
