import { Player } from "headless-audioplayer-react";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Player src="https://ljinlovesongs.onrender.com/songs/639d2ccd6453443d963f4050">
        <Player.Stats>
          {(context) => {
            console.log(context);
            return <p>{JSON.stringify(context)}</p>;
          }}
        </Player.Stats>
      </Player>
    </div>
  );
}
