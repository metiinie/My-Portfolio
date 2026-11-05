import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";
import { decryptFile } from "../components/Character/utils/decrypt";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(() => {
    // Skip loading screen on mobile/tablet viewports (<= 1024px)
    if (window.innerWidth <= 1024) return false;
    return true;
  });
  const [loading, setLoadingState] = useState(0);

  // Ensure loading percentage only ever moves forward (monotonic)
  const setLoading = useCallback((percent: number) => {
    setLoadingState((prev) => Math.max(prev, percent));
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      import("../components/utils/initialFX").then((module) => {
        if (module.initialFX) {
          setTimeout(() => {
            module.initialFX();
          }, 100);
        }
      });
    } else {
      // Pre-fetch and decrypt the 3D character in parallel
      decryptFile("/models/character.enc", "Character3D#@").catch(() => {});
    }
  }, []);

  // Hard fail-safe: guarantee the loading screen never hangs longer than 2.0s
  useEffect(() => {
    if (!isLoading) return;
    const failSafeTimer = setTimeout(() => {
      setLoadingState(100);
      setTimeout(() => {
        import("../components/utils/initialFX").then((module) => {
          module.initialFX?.();
        });
        setIsLoading(false);
      }, 350);
    }, 2000);

    return () => clearTimeout(failSafeTimer);
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
