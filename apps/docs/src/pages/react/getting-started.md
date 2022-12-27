---
layout: ../../layouts/Docs.astro
title: A npm package that makes audio handling easier for React and Svelte could be a useful tool for developers looking to incorporate audio functionality into their web applications
desc: Easily handle audio urls in your browser applications with our audio handling npm package. Features include support for Svelte and React.
frto: svelte
---

## What is it?

A npm package that makes audio handling easier for React and Svelte could be a useful tool for developers looking to incorporate audio functionality into their web applications. This package could provide a set of simple and intuitive APIs for controlling audio playback, as well as handling common tasks such as downloading stats, adjusting volume, and synchronizing audio with other elements on the page. Able to customize the look and feel of the audio player. Overall, this package would aim to make it quick and easy for developers to add rich audio experiences to their React and Svelte applications, without the need for complex code.

### Installation

Choose your favorite package manager

```cmd
pnpm install headless-audioplayer-react
```

```cmd
npm install headless-audioplayer-react
```

```cmd
yarn add headless-audioplayer-react
```

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

// Slider styles are required
import "headless-audioplayer-react/dist/cjs/css/slider.css"; // If your using nextjs 12, you have to import this in the _app component

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
              <button onClick={context.increaseVolume}>+1</button>
              <button onClick={context.decreaseVolume}>-1</button>
              <VolumeSlider
                onChange={context.onSliderVolumeChange}
                volume={context.volume}
              />
            </div>
          )}
        </Player>
      </PlayerProvider>
    </div>
  );
}
```

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
