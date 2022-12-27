---
layout: ../../layouts/Docs.astro
title: A npm package that makes audio handling easier for React and Svelte could be a useful tool for developers looking to incorporate audio functionality into their web applications
desc: Easily handle audio urls in your browser applications with our audio handling npm package. Features include support for Svelte and React.
frto: react
---

## What is it?

A npm package that makes audio handling easier for React and Svelte could be a useful tool for developers looking to incorporate audio functionality into their web applications. This package could provide a set of simple and intuitive APIs for controlling audio playback, as well as handling common tasks such as downloading stats, adjusting volume, and synchronizing audio with other elements on the page. Able to customize the look and feel of the audio player. Overall, this package would aim to make it quick and easy for developers to add rich audio experiences to their React and Svelte applications, without the need for complex code.

### Installation

Choose your favorite package manager

```cmd
pnpm install headless-audioplayer-svelte
```
```cmd
npm install headless-audioplayer-svelte
```
```cmd
yarn add headless-audioplayer-svelte
```

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
