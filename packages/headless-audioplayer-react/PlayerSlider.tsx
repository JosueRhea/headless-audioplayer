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
    <div className="headless-player-progress-container">
      <span
        className="headless-player-progress-bar"
        style={{ width: `${progressBarWidth}px` }}
      ></span>
      <span
        className="headless-player-thumb"
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></span>
      <span
        className="headless-player-download"
        style={{ width: `${downloadProgress}%` }}
      ></span>
      <input
        type="range"
        className="headless-player-range"
        step="0.01"
        ref={rangeRef}
        value={position}
        onChange={onChange}
      />
    </div>
  );
};
