<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import type { PlayerContextProps } from "./index";

  export let src: Writable<string>;
  export let onEnded: (e: Event) => void = () => {};
  export let onPause: (e: Event) => void = () => {};
  export let onPlay: (e: Event) => void = () => {};
  export let loop: boolean = false;

  const getTime = (time: number) => {
    let seconds: string | number = time % 60;
    const foo = time - seconds;
    const minutes = foo / 60;
    if (seconds < 10) {
      seconds = `0${seconds.toFixed(0)}`;
    } else {
      seconds = seconds.toFixed(0);
    }
    return minutes + ":" + seconds;
  };

  let isPlaying = writable(false);
  let progress = writable(0);
  let shouldStart = writable(false);
  let timestamp = writable({ current: "0:0", total: "0:0" });
  let downloadProgress = writable(0);
  let volume = writable(0);
  let audioEl: HTMLAudioElement;

  onMount(() => {
    if (audioEl) {
      $volume = audioEl.volume;
      if (audioEl.currentTime && audioEl.duration) {
        const currentTime = getTime(audioEl.currentTime);
        const totalTime = getTime(audioEl.duration);
        if (!currentTime || !totalTime) {
          $timestamp = { current: "0:00", total: "0:00" };
        } else {
          $timestamp = { current: currentTime, total: totalTime };
        }
      }
    }
    if ($shouldStart) {
      $isPlaying = true;
    }
  });

  const onSliderChange = (e: Event) => {
    const event = e.target as HTMLInputElement;
    if (audioEl) {
      const newValue = Number(event.value);
      const updatedCurrentTime = (audioEl.duration / 100) * newValue;
      audioEl.currentTime = updatedCurrentTime;
      $progress = newValue;
    }
  };

  const onSliderVolumeChange = (e: Event) => {
    const event = e.target as HTMLInputElement;
    if (audioEl) {
      const newValue = Number(event.value) / 100;
      if (newValue > 1 || newValue < 0) return;
      audioEl.volume = newValue;
      $volume = newValue;
    }
  };

  const increaseVolume = () => {
    if (audioEl) {
      if (audioEl.volume + 0.1 <= 1) {
        audioEl.volume = audioEl.volume + 0.1;
        console.log("increased at", audioEl.volume);
        $volume = audioEl.volume;
      } else {
        audioEl.volume = 1;
        $volume = audioEl.volume;
      }
    }
  };

  const decreaseVolume = () => {
    if (audioEl) {
      if (audioEl.volume - 0.1 >= 0) {
        audioEl.volume = audioEl.volume - 0.1;
        console.log("decreased at", audioEl.volume);
        $volume = audioEl.volume;
      } else {
        audioEl.volume = 0;
        $volume = audioEl.volume;
      }
    }
  };

  isPlaying.subscribe((value) => {
    if (audioEl) {
      if (value) {
        audioEl.play();
        $shouldStart = true;
      } else {
        audioEl.pause();
        $shouldStart = false;
      }
    }
  });

  src.subscribe((value) => {
    console.log("Src changed");
    $progress = 0;
    $downloadProgress = 0;
    setTimeout(() => {
      if (audioEl) {
        if ($isPlaying) {
          audioEl.play();
          $shouldStart = true;
        } else {
          audioEl.pause();
          $shouldStart = false;
        }
      }
    }, 500);
  });

  const togglePlay = () => {
    $isPlaying = !$isPlaying;
  };

  const onTimeUpdate = (e: Event) => {
    const event = e.target as HTMLAudioElement;
    // @ts-ignore
    if (event.currentTime && event.duration && event.duration != NaN) {
      const percent = ((event.currentTime / event.duration) * 100).toFixed(2);
      $progress = +percent;
      const currentTime = getTime(event.currentTime);
      const totalTime = getTime(event.duration);
      if (!currentTime || !totalTime) {
        $timestamp = { current: "0:00", total: "0:00" };
      } else {
        $timestamp = { current: currentTime, total: totalTime };
      }
    } else {
      $timestamp = { current: "0:00", total: "0:00" };
    }
  };

  const handleOnDownloadProgress = () => {
    if ($downloadProgress <= 100 && audioEl) {
      for (let i = 0; i < audioEl.buffered.length; i++) {
        const bufferedStart = audioEl.buffered.start(i);
        const bufferedEnd = audioEl.buffered.end(i);
        $downloadProgress =
          Math.round(
            (100 / audioEl.duration) * (bufferedEnd - bufferedStart)
          ) || 0;
      }
    }
  };

  setContext<PlayerContextProps>("playerContext", {
    isPlaying,
    downloadProgress,
    progress,
    timestamp,
    volume,
    onSliderChange,
    onSliderVolumeChange,
    increaseVolume,
    decreaseVolume,
    togglePlay,
  });
</script>

<audio
  src={$src}
  bind:this={audioEl}
  on:timeupdate={onTimeUpdate}
  on:progress={handleOnDownloadProgress}
  on:play={onPlay}
  on:pause={onPause}
  on:ended={onEnded}
  {loop}
/>
<slot />
