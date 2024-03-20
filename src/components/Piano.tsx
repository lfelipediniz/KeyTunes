'use client'; // This is a client-side component

const Piano: React.FC = () => {

  const playAudio = (noteId:string) => {
    const audio = new Audio(`/notes/${noteId}.wav`);
    audio.play().catch(error => console.error("Erro ao tentar reproduzir o áudio", error));
  };

// function that handles the click event on the piano keys
  const handleKeyClick = (event: React.MouseEvent<HTMLDivElement>) => {
   // check if the target is a piano key
    const target = event.target as HTMLElement;
    if (target.id) {
      playAudio(target.id);
    }
  };
  return (
    <div onClick={handleKeyClick}>
      {/* A vitural piano component */}
      <button className="whiteKey" id="0-a"  >
        A
      </button>
      <button className="blackKey" id="0-as"  > 
        As
      </button>
      <button className="whiteKey" id="0-b"> 
        B
      </button>

      <button className="whiteKey" id="1-a">
        A
      </button>
      <button className="blackKey" id="1-as">
        As
      </button>
      <button className="whiteKey" id="1-b">
        B
      </button>
      <button className="whiteKey" id="1-c">
        C
      </button>
      <button className="blackKey" id="1-cs">
        Cs
      </button>
      <button className="whiteKey" id="1-d">
        D
      </button>
      <button className="blackKey" id="1-ds">
        Ds
      </button>
      <button className="whiteKey" id="1-e">
        E
      </button>
      <button className="whiteKey" id="1-f">
        F
      </button>
      <button className="blackKey" id="1-fs">
        Fs
      </button>
      <button className="whiteKey" id="1-g">
        G
      </button>
      <button className="blackKey" id="1-gs">
        Gs
      </button>

      <button className="whiteKey" id="2-a">
        A
      </button>
      <button className="blackKey" id="2-as">
        As
      </button>
      <button className="whiteKey" id="2-b">
        B
      </button>
      <button className="whiteKey" id="2-c">
        C
      </button>
      <button className="blackKey" id="2-cs">
        Cs
      </button>
      <button className="whiteKey" id="2-d">
        D
      </button>
      <button className="blackKey" id="2-ds">
        Ds
      </button>
      <button className="whiteKey" id="2-e">
        E
      </button>
      <button className="whiteKey" id="2-f">
        F
      </button>
      <button className="blackKey" id="2-fs">
        Fs
      </button>
      <button className="whiteKey" id="2-g">
        G
      </button>
      <button className="blackKey" id="2-gs">
        Gs
      </button>

      <button className="whiteKey" id="3-a">
        A
      </button>
      <button className="blackKey" id="3-as">
        As
      </button>
      <button className="whiteKey" id="3-b">
        B
      </button>
      <button className="whiteKey" id="3-c">
        C
      </button>
      <button className="blackKey" id="3-cs">
        Cs
      </button>
      <button className="whiteKey" id="3-d">
        D
      </button>
      <button className="blackKey" id="3-ds">
        Ds
      </button>
      <button className="whiteKey" id="3-e">
        E
      </button>
      <button className="whiteKey" id="3-f">
        F
      </button>
      <button className="blackKey" id="3-fs">
        Fs
      </button>
      <button className="whiteKey" id="3-g">
        G
      </button>
      <button className="blackKey" id="3-gs">
        Gs
      </button>

      <button className="whiteKey" id="4-a">
        A
      </button>
      <button className="blackKey" id="4-as">
        As
      </button>
      <button className="whiteKey" id="4-b">
        B
      </button>
      <button className="whiteKey" id="4-c">
        C
      </button>
      <button className="blackKey" id="4-cs">
        Cs
      </button>
      <button className="whiteKey" id="4-d">
        D
      </button>
      <button className="blackKey" id="4-ds">
        Ds
      </button>
      <button className="whiteKey" id="4-e">
        E
      </button>
      <button className="whiteKey" id="4-f">
        F
      </button>
      <button className="blackKey" id="4-fs">
        Fs
      </button>
      <button className="whiteKey" id="4-g">
        G
      </button>
      <button className="blackKey" id="4-gs">
        Gs
      </button>

      <button className="whiteKey" id="5-a">
        A
      </button>
      <button className="blackKey" id="5-as">
        As
      </button>
      <button className="whiteKey" id="5-b">
        B
      </button>
      <button className="whiteKey" id="5-c">
        C
      </button>
      <button className="blackKey" id="5-cs">
        Cs
      </button>
      <button className="whiteKey" id="5-d">
        D
      </button>
      <button className="blackKey" id="5-ds">
        Ds
      </button>
      <button className="whiteKey" id="5-e">
        E
      </button>
      <button className="whiteKey" id="5-f">
        F
      </button>
      <button className="blackKey" id="5-fs">
        Fs
      </button>
      <button className="whiteKey" id="5-g">
        G
      </button>

      <button className="whiteKey" id="6-a">
        A
      </button>
      <button className="blackKey" id="6-as">
        As
      </button>
      <button className="whiteKey" id="6-b">
        B
      </button>
      <button className="whiteKey" id="6-c">
        C
      </button>
      <button className="blackKey" id="6-cs">
        Cs
      </button>
      <button className="whiteKey" id="6-d">
        D
      </button>
      <button className="blackKey" id="6-ds">
        Ds
      </button>
      <button className="whiteKey" id="6-e">
        E
      </button>
      <button className="whiteKey" id="6-f">
        F
      </button>
      <button className="blackKey" id="6-fs">
        Fs
      </button>
      <button className="whiteKey" id="6-g">
        G
      </button>
      <button className="blackKey" id="6-gs">
        Gs
      </button>

      <button className="whiteKey" id="7-a">
        A
      </button>
      <button className="blackKey" id="7-as">
        As
      </button>
      <button className="whiteKey" id="7-b">
        B
      </button>
      <button className="whiteKey" id="7-c">
        C
      </button>
      <button className="blackKey" id="7-cs">
        Cs
      </button>
      <button className="whiteKey" id="7-d">
        D
      </button>
      <button className="blackKey" id="7-ds">
        Ds
      </button>
      <button className="whiteKey" id="7-e">
        E
      </button>
      <button className="whiteKey" id="7-f">
        F
      </button>
      <button className="blackKey" id="7-fs">
        Fs
      </button>
      <button className="whiteKey" id="7-g">
        G
      </button>
      <button className="blackKey" id="7-gs">
        Gs
      </button>

      <button className="whiteKey" id="8-c">
        C
      </button>

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
