<script lang="ts">
  import PlayerProvider from "../lib/Player.svelte";
  import YourPlayerComponent from "../components/Player.svelte";
  import { writable } from "svelte/store";

  let src = writable("https://3001-josuerhea-headlessaudio-nk6b0m2asan.ws-us80.gitpod.io/notion.mp3");
</script>

<PlayerProvider {src}>
  <YourPlayerComponent />
</PlayerProvider>
