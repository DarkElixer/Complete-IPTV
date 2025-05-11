import "plyr/dist/plyr.css";
import { controls } from "../../constants/servicesConstants";
import { createContext, useEffect, useRef } from "react";

const defaultOptions = {
    controls,
    settings: ["quality", "speed"],
};
const PlyrContext = createContext();
function PlyrProvider({ children }) {
    const plyr = useRef(null);
    useEffect(() => {
        function handleFullScreen() {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("landscape").catch((err) => {
                    console.warn("Orientation lock failed:", err.message);
                });
            }
        }
        function handleExitFullScreen() {
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock().catch((err) => {
                    console.warn("Orientation unlock failed:", err.message);
                });
            }
        }
        plyr.current?.on("enterfullscreen", handleFullScreen);
        plyr.current?.on("exitfullscreen", handleExitFullScreen);
        return () => {
            plyr.current?.off("enterfullscreen", handleFullScreen);
            plyr?.current?.off("exitfullscreen", handleExitFullScreen);
        };
    }, [plyr]);

    return (
        <PlyrContext.Provider
            value={{
                defaultOptions,
                plyr,
                // setPlyr,
            }}
        >
            {children}
        </PlyrContext.Provider>
    );
}

export default PlyrProvider;
export { PlyrContext };
