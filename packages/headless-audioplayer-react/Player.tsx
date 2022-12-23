import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  createContext,
  ReactNode,
  SyntheticEvent,
} from "react";

type PlayerContextProps = {
  downloadProgress: number;
  isPlaying: boolean;
  progress: number;
  timestamp: {
    current: string;
    total: string;
  };
  togglePlay: () => void;
  onSliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
  decreaseVolume: () => void;
  increaseVolume: () => void;
  volume: number;
  onSliderVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const PlayerContext = createContext<PlayerContextProps>({
  downloadProgress: 0,
  isPlaying: false,
  onSliderChange: (e: ChangeEvent<HTMLInputElement>) => {},
  progress: 0,
  timestamp: { current: "0", total: "0" },
  togglePlay: () => {},
  decreaseVolume: () => {},
  increaseVolume: () => {},
  volume: 0,
  onSliderVolumeChange: () => {},
});

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

const usePlayer = (src: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [timestamp, setTimeStamp] = useState({ current: "0:0", total: "0:0" });
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const audioEl = useRef<HTMLAudioElement>(null);

  const onSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioEl.current) {
      const audio = audioEl.current;
      const updatedCurrentTime =
        (audio.duration / 100) * Number(e.target.value);
      audio.currentTime = updatedCurrentTime;
      setProgress(Number(e.target.value));
    }
  };

  const onSliderVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioEl.current) {
      const newValue = Number(e.target.value) / 100;
      if (newValue > 1 || newValue < 0) return;
      audioEl.current.volume = newValue;
      setVolume(newValue);
    }
  };

  const increaseVolume = () => {
    if (audioEl.current) {
      if (audioEl.current.volume + 0.1 <= 1) {
        audioEl.current.volume = audioEl.current.volume + 0.1;
        console.log("increased at", audioEl.current.volume);
        setVolume(audioEl.current.volume);
      } else {
        audioEl.current.volume = 1;
        setVolume(audioEl.current.volume);
      }
    }
  };

  const decreaseVolume = () => {
    if (audioEl.current) {
      if (audioEl.current.volume - 0.1 >= 0) {
        audioEl.current.volume = audioEl.current.volume - 0.1;
        console.log("decreased at", audioEl.current.volume);
        setVolume(audioEl.current.volume);
      } else {
        audioEl.current.volume = 0;
        setVolume(audioEl.current.volume);
      }
    }
  };

  useEffect(() => {
    if (audioEl.current) {
      if (isPlaying) {
        audioEl.current.play();
        setShouldStart(true);
      } else {
        audioEl.current.pause();
        setShouldStart(false);
      }
    }
  }, [isPlaying, src]);

  useEffect(() => {
    setTimeStamp({ current: "0:0", total: "0:0" });
    if (audioEl.current) {
      setVolume(audioEl.current.volume);
      if (audioEl.current.currentTime && audioEl.current.duration) {
        const currentTime = getTime(audioEl.current.currentTime);
        const totalTime = getTime(audioEl.current.duration);
        if (!currentTime || !totalTime) {
          setTimeStamp({ current: "0:00", total: "0:00" });
        } else {
          setTimeStamp({ current: currentTime, total: totalTime });
        }
      }
    }
    if (shouldStart) {
      setIsPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const onTimeUpdate = (e: ChangeEvent<HTMLAudioElement>) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    setProgress(+percent);
    if (e.currentTarget.currentTime && e.currentTarget.duration) {
      const currentTime = getTime(e.currentTarget.currentTime);
      const totalTime = getTime(e.currentTarget.duration);
      if (!currentTime || !totalTime) {
        setTimeStamp({ current: "0:00", total: "0:00" });
      } else {
        setTimeStamp({ current: currentTime, total: totalTime });
      }
    } else {
      setTimeStamp({ current: "0:00", total: "0:00" });
    }
  };

  const handleOnDownloadProgress = () => {
    const audio = audioEl.current;
    if (downloadProgress <= 100 && audio) {
      for (let i = 0; i < audio.buffered.length; i++) {
        const bufferedStart = audio.buffered.start(i);
        const bufferedEnd = audio.buffered.end(i);
        setDownloadProgress(
          Math.round((100 / audio.duration) * (bufferedEnd - bufferedStart)) ||
            0
        );
      }
    }
  };

  return {
    audioEl,
    isPlaying,
    progress,
    timestamp,
    onSliderChange,
    onTimeUpdate,
    handleOnDownloadProgress,
    downloadProgress,
    togglePlay,
    volume,
    increaseVolume,
    decreaseVolume,
    onSliderVolumeChange,
  };
};

export type PlayerProps = {
  src: string;
  onEnded?: (e: SyntheticEvent<HTMLAudioElement, Event>) => void;
  onPause?: (e: SyntheticEvent<HTMLAudioElement, Event>) => void;
  onPlay?: (e: SyntheticEvent<HTMLAudioElement, Event>) => void;
  loop?: boolean;
  children: ReactNode;
};

const PlayerProvider = ({
  src,
  children,
  onEnded,
  onPause,
  onPlay,
  ...rest
}: PlayerProps) => {
  const {
    audioEl,
    downloadProgress,
    handleOnDownloadProgress,
    isPlaying,
    onSliderChange,
    onTimeUpdate,
    progress,
    timestamp,
    togglePlay,
    decreaseVolume,
    increaseVolume,
    volume,
    onSliderVolumeChange,
  } = usePlayer(src);

  return (
    <PlayerContext.Provider
      value={{
        downloadProgress,
        isPlaying,
        progress,
        timestamp,
        togglePlay,
        onSliderChange,
        decreaseVolume,
        increaseVolume,
        volume,
        onSliderVolumeChange,
      }}
    >
      <audio
        src={src}
        onProgress={handleOnDownloadProgress}
        onTimeUpdate={onTimeUpdate}
        ref={audioEl}
        controls={false}
        style={{ display: "none" }}
        {...rest}
      ></audio>
      {children}
    </PlayerContext.Provider>
  );
};

const Player = PlayerContext.Consumer;

export { PlayerProvider, Player };
