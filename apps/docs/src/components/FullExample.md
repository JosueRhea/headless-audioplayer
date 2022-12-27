```tsx
import {
  PlayerProvider,
  Player as HLPlayer,
  PlayerSlider,
  VolumeSlider,
} from "headless-audioplayer-react";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineSound,
  AiFillSound,
} from "react-icons/ai/index";

export const Player = () => {
  return (
    <PlayerProvider src="/notion.mp3" loop={true}>
      <HLPlayer>
        {(context) => (
          <div className="w-full p-4 shadow-xl ring-1 ring-zinc-900 ring-opacity-10 rounded-md">
            <PlayerSlider
              downloadProgress={context.downloadProgress}
              onChange={context.onSliderChange}
              progress={context.progress}
            />
            <div className="w-full flex justify-between text-zinc-600 mt-1">
              <span>{context.timestamp.current}</span>
              <span>{context.timestamp.total}</span>
            </div>
            <div className="w-full flex-col sm:flex-row gap-y-2 sm:gap-y-0 items-start justify-between flex mt-2 sm:items-center">
              <div className="flex items-center">
                <img src="/notion.jpg" alt="" className="w-14 h-14" />
                <div className="ml-2">
                  <p className="font-semibold">Notion</p>
                  <p className="text-zinc-600 text-sm">The Rare Occasions</p>
                </div>
              </div>
              <div className="flex gap-x-2">
                <button onClick={context.togglePlay}>
                  {context.isPlaying ? (
                    <AiFillPauseCircle className="w-10 h-10" />
                  ) : (
                    <AiFillPlayCircle className="w-10 h-10" />
                  )}
                </button>
                <div className="flex gap-x-2 w-24 items-center">
                  <button onClick={context.toggleMute}>
                    {context.mute.state == "muted" ? (
                      <AiOutlineSound className="w-5 h-5" />
                    ) : (
                      <AiFillSound className="w-5 h-5" />
                    )}
                  </button>
                  <VolumeSlider
                    volume={context.volume}
                    onChange={context.onSliderVolumeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </HLPlayer>
    </PlayerProvider>
  );
};
```
