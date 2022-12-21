import {
  PlayerProvider,
  Player,
  PlayerSlider,
} from "headless-audioplayer-react";

export default function Web() {
  return (
    <div className="w-full flex items-center flex-col">
      <PlayerProvider src="https://ljinlovesongs.onrender.com/songs/639d2ccd6453443d963f4050">
        <Player>
          {(context) => (
            <div className="w-full max-w-lg mt-10">
              <PlayerSlider
                downloadProgress={context.downloadProgress}
                onChange={context.onSliderChange}
                progress={context.progress}
                containerColor="#fbbf24"
                progressColor="#fde68a"
                thumbColor="#166534"
                downloadProgressColor="#c4b5fd"
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
    </div>
  );
}
