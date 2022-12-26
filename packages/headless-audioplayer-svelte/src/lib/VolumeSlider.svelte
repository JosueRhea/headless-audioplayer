<script lang="ts">
  import type { Writable } from "svelte/store";

  export let onChange: (e: Event) => void;
  export let volume: Writable<number>;
  export let containerColor: string = "#f4f4f5";
  export let thumbColor: string = "#18181b";
  export let progressColor: string = "#18181b";

  let position = 0;
  let marginLeft = 0;
  let progressBarWidth = 0;
  let rangeRef: HTMLInputElement;
  let thumbRef: HTMLSpanElement;

  volume.subscribe((value) => {
    if (rangeRef && thumbRef) {
      const calculatedVolume = value * 100;
      const thumbWidth = thumbRef.getBoundingClientRect().width;
      const rangeWidth = rangeRef.getBoundingClientRect().width;
      const centerThumb = (thumbWidth / 100) * calculatedVolume * -1;
      const centerProgressBar =
        thumbWidth +
        (rangeWidth / 100) * calculatedVolume -
        (thumbWidth / 100) * calculatedVolume;
      position = calculatedVolume;
      marginLeft = centerThumb;
      progressBarWidth = centerProgressBar;
    }
  });
</script>

<div
  class="headless-player-progress-container"
  style={`background-color: ${containerColor}`}
>
  <span
    class="headless-player-progress-bar"
    style={`width: ${progressBarWidth}px; background-color: ${progressColor}`}
  />
  <span
    bind:this={thumbRef}
    class="headless-player-thumb"
    style={`left: ${position}%; margin-left: ${marginLeft}px; background-color: ${thumbColor}`}
  />
  <input
    type="range"
    class="headless-player-range"
    step="0.01"
    bind:this={rangeRef}
    value={position}
    on:change={onChange}
  />
</div>

<style scoped>
  .headless-player-progress-container {
    display: block;
    width: 100%;
    border-radius: 0.375rem;
    position: relative;
    height: 10px;
  }

  .headless-player-progress-bar {
    height: 100%;
    position: relative;
    display: block;
    border-radius: 0.375rem;
    z-index: 20;
  }

  .headless-player-thumb {
    width: 16px;
    height: 16px;
    border-radius: 100px;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    margin-top: auto;
    margin-bottom: auto;
    pointer-events: none;
    user-select: none;
    z-index: 20;
  }

  .headless-player-range::-moz-range-thumb,
  .headless-player-range::-ms-thumb,
  .headless-player-range::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }

  .headless-player-range {
    appearance: none;
    height: 10px;
    width: 100%;
    cursor: pointer;
    position: absolute;
    margin-left: 0;
    margin-right: 0;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
    opacity: 0;
    z-index: 30;
  }
</style>
