import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
} from "react";

const PlayerContext = createContext({});

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

export const usePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [timestamp, setTimeStamp] = useState({ current: "0:0", total: "0:0" });
  const [downloadProgress, setDownloadProgress] = useState({
    left: 0,
    width: 0,
  });
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
  }, [isPlaying]);

  useEffect(() => {
    setTimeStamp({ current: "0:0", total: "0:0" });
    if (audioEl.current) {
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
    if (downloadProgress.width <= 100 && audio) {
      for (let i = 0; i < audio.buffered.length; i++) {
        const bufferedStart = audio.buffered.start(i);
        const bufferedEnd = audio.buffered.end(i);
        setDownloadProgress({
          left: Math.round((100 / audio.duration) * bufferedStart) || 0,
          width:
            Math.round(
              (100 / audio.duration) * (bufferedEnd - bufferedStart)
            ) || 0,
        });
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
  };
};

export type PlayerProps = {
  src: string;
  children: ReactNode;
};

const Player = ({ src, children }: PlayerProps) => {
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
  } = usePlayer();

  return (
    <PlayerContext.Provider
      value={{ downloadProgress, isPlaying, progress, timestamp, togglePlay }}
    >
      <audio
        src={src}
        onProgress={handleOnDownloadProgress}
        onTimeUpdate={onTimeUpdate}
        ref={audioEl}
        controls={true}
      ></audio>
      {children}
    </PlayerContext.Provider>
  );
};

Player.Stats = PlayerContext.Consumer;

export { Player };
