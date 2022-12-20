import { PlayerProvider, Player } from "headless-audioplayer-react";

export default function Web() {
  return (
    <div className="w-full flex items-center flex-col">
      <PlayerProvider src="https://ljinlovesongs.onrender.com/songs/639d2ccd6453443d963f4050">
        <Player>
          {(context) => (
            <div className="w-full max-w-lg">
              <h1>Hello</h1>
            </div>
          )}
        </Player>
      </PlayerProvider>
    </div>
  );
}
