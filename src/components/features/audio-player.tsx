"use client";
import "client-only";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { Asset } from "@/types/about/songs";

interface AudioPlayerProps {
  asset: Asset;
}

export function AudioPlayer({ asset }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  });

  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateAudioState = () => {
      setAudioState({
        isPlaying: !audio.paused,
        currentTime: audio.currentTime,
        duration: audio.duration,
      });
    };

    audio.addEventListener("loadeddata", updateAudioState);
    audio.addEventListener("timeupdate", updateAudioState);

    return () => {
      audio.removeEventListener("loadeddata", updateAudioState);
      audio.removeEventListener("timeupdate", updateAudioState);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      setAudioState((prev) => ({ ...prev, isPlaying: !audio.paused }));
    }
  }, []);

  const handleProgressChange = useCallback((newValue: number[]) => {
    const [value] = newValue;
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setAudioState((prev) => ({ ...prev, currentTime: value }));
    }
  }, []);

  const handleVolumeChange = useCallback((newValue: number[]) => {
    const [value] = newValue;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const newVolume = volume === 0 ? 1 : 0;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, [volume]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="px-6 py-4">
      <audio ref={audioRef} src={asset?.url} />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            aria-label={audioState.isPlaying ? "Pause" : "Play"}
          >
            {audioState.isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <span className="text-sm font-medium">Version - {asset.version}</span>
        </div>
        <div className="text-sm font-medium">
          {formatTime(audioState.currentTime)} /{" "}
          {formatTime(audioState.duration)}
        </div>
      </div>

      <Slider
        value={[audioState.currentTime]}
        max={audioState.duration}
        step={1}
        onValueChange={handleProgressChange}
        className="mb-4"
      />

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          aria-label={volume === 0 ? "Unmute" : "Mute"}
        >
          {volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="ml-2 w-24"
        />
      </div>
    </Card>
  );
}
