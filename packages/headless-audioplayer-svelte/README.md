<h1 align="center">
Headless Audio Player
</h1>
<p align="center">
A wrapper to make audio playing more easier
</p>

## Documentation

### Installation

Choose your favorite package manager

- `pnpm install headless-audioplayer-svelte`
- `npm install headless-audioplayer-svelte`
- `yarn add headless-audioplayer-svelte`

## Getting started

Headless audio player is a unstyled wrapper to handle all the stuff related to `progress, downloadProgress, change current time of playing` etc...
You can make the player as you want, with your own styles.

### Basic example

```svelte
// +page.svelte
<script lang="ts">
  import { PlayerProvider } from "headless-audioplayer-svelte";
  import YourPlayerComponent from "./lib/YourPlayerComponent.svelte";
  import { writable } from "svelte/store";

  let src = writable("your audio media or audio url");
</script>

<PlayerProvider {src}>
  <YourPlayerComponent />
</PlayerProvider>
```

```svelte
// lib/YourPlayerComponent.svelte
<script lang="ts">
  import {
    type PlayerContextProps,
    PlayerSlider,
    VolumeSlider,
  } from "headless-audioplayer-svelte";
  import { getContext } from "svelte";

  let context = getContext<PlayerContextProps>("playerContext");

  const {
    decreaseVolume,
    downloadProgress,
    increaseVolume,
    isPlaying,
    onSliderChange,
    onSliderVolumeChange,
    progress,
    timestamp,
    togglePlay,
    volume,
  } = context;
</script>

<PlayerSlider
  downloadProgress={$downloadProgress}
  onChange={onSliderChange}
  {progress}
/>
<button on:click={togglePlay}>{$isPlaying ? "Pause" : "Play"}</button>
<p>current: {$timestamp.current}</p>
<p>total: {$timestamp.total}</p>
<VolumeSlider onChange={onSliderVolumeChange} {volume} />
<button on:click={increaseVolume}>+1</button>
<button on:click={decreaseVolume}>-1</button>
```
