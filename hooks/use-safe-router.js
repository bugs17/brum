import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export function useSafeRouter(delay = 500) {
  const router = useRouter();
  const isLocked = useRef(false);
  const timerRef = useRef(null);

  // Bersihkan timer saat komponen unmount agar tidak bocor
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const safeAction = (actionType, args) => {
    if (isLocked.current) return;

    isLocked.current = true;
    router[actionType](args);

    timerRef.current = setTimeout(() => {
      isLocked.current = false;
    }, delay);
  };

  return {
    push: (path) => safeAction("push", path),
    replace: (path) => safeAction("replace", path),
    back: () => safeAction("back"),
  };
}
