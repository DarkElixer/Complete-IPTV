import { useContext } from "react";
import { PlyrContext } from "./PLyr";

function usePlyr() {
    const context = useContext(PlyrContext);
    if (context === undefined)
        throw new Error("context is used outside Plyr provider");
    return context;
}

export { usePlyr };
