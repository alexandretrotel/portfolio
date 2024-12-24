import { useRef, useCallback } from "react";
import { FEEDBACK_DURATION } from "./use-quatio";

export const useProgress = () => {
  const progressValueRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min((elapsed / FEEDBACK_DURATION) * 100, 100);

      progressValueRef.current = progress;

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    progressValueRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  return { progressValueRef, updateProgress };
};
