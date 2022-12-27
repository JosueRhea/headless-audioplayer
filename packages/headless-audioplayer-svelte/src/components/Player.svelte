<script lang="ts">
  import { type PlayerContextProps, PlayerSlider, VolumeSlider } from "../lib";
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
    mute,
    toggleMute,
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
<button on:click={toggleMute}
  >{$mute.state == "muted" ? "Unmute" : "mute"}</button
>
