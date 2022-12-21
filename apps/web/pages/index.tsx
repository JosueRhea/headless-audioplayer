import {
  PlayerProvider,
  Player,
  PlayerSlider,
} from "headless-audioplayer-react";
import { useState } from "react";

export default function Web() {
  const [src, setSrc] = useState(
    "https://ljinlovesongs.onrender.com/songs/639d2ccd6453443d963f4050"
  );

  const changeSrc = () => {
    setSrc((prev) =>
      prev ==
      "https://ljinlovesongs.onrender.com/songs/639d34a56453443d963f40af"
        ? "https://ljinlovesongs.onrender.com/songs/639d2ccd6453443d963f4050"
        : "https://ljinlovesongs.onrender.com/songs/639d34a56453443d963f40af"
    );
  };
  return (
    <div className="w-full flex items-center flex-col">
      <PlayerProvider
        src={src}
        onEnded={() => {
          console.log("Ended");
          changeSrc();
        }}
        onPause={() => {
          console.log("Pause");
        }}
        onPlay={() => {
          console.log("Play");
        }}
      >
        <Player>
          {(context) => (
            <div className="w-full max-w-lg mt-10">
              <PlayerSlider
                downloadProgress={context.downloadProgress}
                onChange={context.onSliderChange}
                progress={context.progress}
              />
              <button onClick={context.togglePlay}>
                {context.isPlaying ? "Pause" : "Play"}
              </button>
              <p>{context.timestamp.current}</p>
              <p>{context.timestamp.total}</p>
            </div>
          )}
        </Player>
      </PlayerProvider>
      <button onClick={changeSrc}>Change src</button>
    </div>
  );
}
