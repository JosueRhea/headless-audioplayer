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

### Basic example

```tsx
import { PlayerProvider, Player } from "headless-audioplayer-react";

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
  );
}
```

### Slider to change the time

To change the time, there's a built in component that you can use, however you can build your own.

**Example**

```tsx
import {
  PlayerProvider,
  Player,
  PlayerSlider,
} from "headless-audioplayer-react";

export default function Web() {
  return (
    <div className="w-full flex items-center flex-col">
      <PlayerProvider src="your audio media">
        <Player>
          {(context) => (
            <div className="w-full max-w-lg mt-10">
              <PlayerSlider
                downloadProgress={context.downloadProgress}
                onChange={context.onSliderChange}
                progress={context.progress}
              />
              <div className="flex justify-between">
                <p>{context.timestamp.current}</p>
                <p>{context.timestamp.total}</p>
              </div>
            </div>
          )}
        </Player>
      </PlayerProvider>
    </div>
  );
}
```

<img src="https://user-images.githubusercontent.com/73492768/208938127-4a337be0-1210-41e9-b269-ca1b76f6eedf.png"/>

### Building your own range slider

You can use `onSliderChange and progress` props to build your own slider and style that, the following example shows how to do it.

```tsx
import { PlayerProvider, Player } from "headless-audioplayer-react";

export default function Web() {
  return (
    <div className="w-full flex items-center flex-col">
      <PlayerProvider src="https://ljinlovesongs.onrender.com/songs/639d2ccd6453443d963f4050">
        <Player>
          {(context) => (
            <div className="w-full max-w-lg mt-10">
              <input
                type="range"
                onChange={context.onSliderChange}
                value={context.progress}
                step="0.01"
                className="w-full"
              />
              <button onClick={context.togglePlay}>
                {context.isPlaying ? "Pause" : "Play"}
              </button>
              <div className="flex justify-between">
                <p>{context.timestamp.current}</p>
                <p>{context.timestamp.total}</p>
              </div>
            </div>
          )}
        </Player>
      </PlayerProvider>
    </div>
  );
}
```
