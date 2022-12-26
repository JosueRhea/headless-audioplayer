import type { Writable } from "svelte/store";

export { default as PlayerProvider } from "./Player.svelte";
export { default as PlayerSlider } from "./PlayerSlider.svelte";
export { default as VolumeSlider } from "./VolumeSlider.svelte";

export type PlayerContextProps = {
  downloadProgress: Writable<number>;
  isPlaying: Writable<boolean>;
  progress: Writable<number>;
  timestamp: Writable<{
    current: string;
    total: string;
  }>;
  togglePlay: () => void;
  onSliderChange: (e: Event) => void;
  decreaseVolume: () => void;
  increaseVolume: () => void;
  volume: Writable<number>;
  onSliderVolumeChange: (e: Event) => void;
};
