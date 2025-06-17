import { useEffect, useState } from 'react';

interface UsePageLoadingOptions {
  delay?: number;
  minLoadingTime?: number;
}

export function usePageLoading(isLoading: boolean, options: UsePageLoadingOptions = {}) {
  const { delay = 200, minLoadingTime = 500 } = options;
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;
    let minTimeTimer: NodeJS.Timeout;

    if (isLoading) {
      // Delay antes de mostrar el skeleton
      delayTimer = setTimeout(() => {
        setShowLoading(true);
        setLoadingStartTime(Date.now());
      }, delay);
    } else if (loadingStartTime) {
      // Asegurar tiempo mínimo de loading
      const elapsed = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);

      minTimeTimer = setTimeout(() => {
        setShowLoading(false);
        setLoadingStartTime(null);
      }, remainingTime);
    } else {
      setShowLoading(false);
    }

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(minTimeTimer);
    };
  }, [isLoading, delay, minLoadingTime, loadingStartTime]);

  return showLoading;
}
