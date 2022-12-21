<h1 align="center">
Headless Audio Player
</h1>
<p align="center">
A wrapper to make audio playing more easier
</p>

## Documentation

### Installation

Choose your favorite package manager
- `pnpm install headless-audioplayer-react`
- `npm install headless-audioplayer-react`
- `yarn add headless-audioplayer-react`

## Getting started
Headless audio player is a unstyled wrapper to handle all the stuff related to `progress, downloadProgress, change current time of playing` etc...
You can make the player as you want, with your own styles.

```tsx
import {
  PlayerProvider,
  Player,
} from "headless-audioplayer-react";

export default function Web() {

  return (
    <PlayerProvider src="your audio media or audio url">
      <Player>
        {(context) => (
          <div className="w-full max-w-lg mt-10">
            <button onClick={context.togglePlay}>
              {context.isPlaying ? "Pause" : "Play"}
            </button>
            <p>{context.timestamp.current}</p>
            <p>{context.timestamp.total}</p>
          </div>
        )}
      </Player>
    </PlayerProvider>
   )
}
```
