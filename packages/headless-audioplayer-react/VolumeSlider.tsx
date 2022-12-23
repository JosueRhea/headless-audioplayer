import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import "./styles.css";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  volume: number;
  containerColor?: string;
  thumbColor?: string;
  progressColor?: string;
};

export const VolumeSlider = ({
  onChange,
  volume,
  containerColor,
  progressColor,
  thumbColor,
}: Props) => {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (rangeRef.current && thumbRef.current) {
      const calculatedVolume = volume * 100;
      const thumbWidth = thumbRef.current.getBoundingClientRect().width;
      const rangeWidth = rangeRef.current.getBoundingClientRect().width;
      const centerThumb = (thumbWidth / 100) * calculatedVolume * -1;
      const centerProgressBar =
        thumbWidth +
        (rangeWidth / 100) * calculatedVolume -
        (thumbWidth / 100) * calculatedVolume;
      setPosition(calculatedVolume);
      setMarginLeft(centerThumb);
      setProgressBarWidth(centerProgressBar);
    }
  }, [volume]);

  return (
    <div
      className="headless-player-progress-container"
      style={{ backgroundColor: containerColor ? containerColor : "#f4f4f5" }}
    >
      <span
        className="headless-player-progress-bar"
        style={{
          width: `${progressBarWidth}px`,
          backgroundColor: progressColor ? progressColor : "#18181b",
        }}
      ></span>
      <span
        className="headless-player-thumb"
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
          backgroundColor: thumbColor ? thumbColor : "#18181b",
        }}
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
