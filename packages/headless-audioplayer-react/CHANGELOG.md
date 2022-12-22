# Change Log

All notable changes to this project will be documented in this file.

## [0.0.5] -> 12 - 22 - 2022

### Breaking changes

To improve the css load time of the `Player Slider`, now the css is extracted in separated file, and you have to import in your app, as the following example

```tsx
import {
  PlayerProvider,
  Player,
  PlayerSlider,
} from "headless-audioplayer-react";

// Slider styles are required
import "headless-audioplayer-react/dist/cjs/css/slider.css"; // If your using nextjs 12, you have to import this in the _app component

export default function Web() {
  return (
    <div className="w-full flex items-center flex-col">
      <PlayerProvider src="your audio media">
        <Player>
          {(context) => (
            <div className="w-full max-w-lg mt-10">
              <PlayerSlider
                downloadProgress={context.downloadProgress}
                onChange={context.onSliderChange}
                progress={context.progress}
              />
              <div className="flex justify-between">
                <p>{context.timestamp.current}</p>
                <p>{context.timestamp.total}</p>
              </div>
            </div>
          )}
        </Player>
      </PlayerProvider>
    </div>
  );
}
```
