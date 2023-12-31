import { useCallback, useEffect, useMemo, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import usePlayerStore from "./usePlayerStore";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { BiLoader } from "react-icons/bi";
import useGetSongById from "./useGetSongById";
import useGetSongUrl from "./useGetSongUrl";

const useMediaPlayer = () => {
  const { ids, activeId, setId } = usePlayerStore();
  const { song } = useGetSongById(activeId);
  const songUrl = useGetSongUrl(song);
  const {
    load,
    play,
    pause,
    stop,
    playing,
    isLoading,
    volume,
    setVolume,
    mute,
    muted
  } = useGlobalAudioPlayer();

  const PlayIcon = isLoading ? BiLoader : playing ? BsPauseFill : BsPlayFill;
  const VolumeIcon = muted ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = useCallback(() => {
    if (ids.length === 0) return;

    const currentIndex = ids.findIndex((id) => id === activeId);
    const nextSong = ids[currentIndex + 1];

    if (!nextSong) return setId(ids[0]);

    setId(nextSong);
  }, [activeId, ids, setId]);

  useEffect(() => {
    if (songUrl) {
      load(songUrl, {
        autoplay: true,
        html5: true,
        format: "mp3",
        onend: onPlayNext
      });
    }
  }, [songUrl, load, onPlayNext]);

  const toggleSong = useCallback(() => {
    if (playing) {
      pause();
    } else {
      play();
    }
  }, [playing, pause, play]);

  const onPlayPrevious = useCallback(() => {
    if (ids.length === 0) return;

    const currentIndex = ids.findIndex((id) => id === activeId);
    const prevSong = ids[currentIndex - 1];

    if (!prevSong) return setId(ids[ids.length - 1]);

    setId(prevSong);
  }, [activeId, ids, setId]);

  const changeVolume = useCallback(
    (value: number) => setVolume(value),
    [setVolume]
  );

  const toggleSound = useCallback(() => mute(!muted), [mute, muted]);

  return useMemo(
    () => ({
      PlayIcon,
      VolumeIcon,
      volume,
      onPlayNext,
      onPlayPrevious,
      toggleSong,
      song,
      changeVolume,
      toggleSound,
      stop
    }),
    [
      PlayIcon,
      VolumeIcon,
      volume,
      onPlayNext,
      onPlayPrevious,
      toggleSong,
      song,
      changeVolume,
      toggleSound,
      stop
    ]
  );
};

export default useMediaPlayer;
