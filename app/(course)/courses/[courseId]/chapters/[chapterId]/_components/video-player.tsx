"use client";

import axios from "axios";

import MuxPlayer from "@mux/mux-player-react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { set } from "zod";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChpaterId?: string;
  isLocked: boolean;
  completeonEnd: boolean;
  title: string;
}
export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChpaterId,
  isLocked,
  completeonEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <div className="relative aspect-video">
      {!isReady && isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Lock className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}

      {isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
