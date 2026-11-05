import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";
import MainContainer from "./components/MainContainer";
import { LoadingProvider } from "./context/LoadingProvider";
import CharacterModel from "./components/Character";

const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <LoadingProvider>
              <MainContainer>
                <CharacterModel />
              </MainContainer>
            </LoadingProvider>
          }
        />
        <Route
          path="/myworks"
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: "100vh",
                    backgroundColor: "#0b080c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c2a4ff",
                  }}
                >
                  Loading...
                </div>
              }
            >
              <MyWorks />
            </Suspense>
          }
        />
        <Route
          path="/play"
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: "100vh",
                    backgroundColor: "#0b080c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c2a4ff",
                  }}
                >
                  Loading...
                </div>
              }
            >
              <Play />
            </Suspense>
          }
        />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;
