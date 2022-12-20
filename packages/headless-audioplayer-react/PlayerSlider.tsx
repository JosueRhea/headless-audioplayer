import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import "./styles.css";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  progress: number;
  downloadProgress: number;
};

export const PlayerSlider = ({
  onChange,
  progress,
  downloadProgress,
}: Props) => {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (rangeRef.current && thumbRef.current) {
      const thumbWidth = thumbRef.current.getBoundingClientRect().width;
      const rangeWidth = rangeRef.current.getBoundingClientRect().width;
      const centerThumb = (thumbWidth / 100) * progress * -1;
      const centerProgressBar =
        thumbWidth +
        (rangeWidth / 100) * progress -
        (thumbWidth / 100) * progress;
      setPosition(progress);
      setMarginLeft(centerThumb);
      setProgressBarWidth(centerProgressBar);
    }
  }, [progress]);

  return (
    <div className="block w-full h-2 bg-gray-100 rounded-md relative">
      <span
        className="h-full bg-gradient-to-r from-zinc-700 to-zinc-900 relative block rounded-md z-20"
        style={{ width: `${progressBarWidth}px` }}
      ></span>
      <span
        className="w-4 h-4 rounded-full bg-zinc-900 -translate-y-2/4 absolute top-2/4 my-auto pointer-events-none select-none z-20"
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></span>
      <span
        className="h-2 rounded-full bg-gray-200 -translate-y-2/4 absolute top-2/4 my-auto pointer-events-none select-none z-10 transition-[width] duration-150"
        style={{ width: `${downloadProgress}%` }}
      ></span>
      <input
        type="range"
        className="range appearance-none h-4 w-full cursor-pointer mx-0 my-auto absolute top-0 bottom-0 opacity-0 z-30"
        step="0.01"
        ref={rangeRef}
        value={position}
        onChange={onChange}
      />
    </div>
  );
};
