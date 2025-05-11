import { useEffect, useRef } from "react";
import { usePlyr } from "../Plyr/usePlyr";
import { hlsConfig } from "../../constants/servicesConstants";
import Hls from "hls.js";
import Plyr from "plyr";

function HLSJSPlayer({ className = "", src = "", hlsconfig, autoplay }) {
    const playerRef = useRef();
    const hlsInstance = useRef(null);
    const { defaultOptions, plyr } = usePlyr();
    useEffect(() => {
        if (Hls.isSupported && playerRef.current) {
            const hls = new Hls(hlsConfig);
            console.log(hls.config);
            hlsInstance.current = hls;
            hlsInstance.current.on(
                Hls.Events.MANIFEST_PARSED,
                function (event, data) {
                    const availableQualities = data.levels.map((l) => l.height);
                    defaultOptions.quality = {
                        default: availableQualities[0],
                        options: availableQualities,
                        forced: true,
                        onChange: (e) => updateQuality(e),
                    };
                    plyr.current = new Plyr(playerRef.current, defaultOptions);
                }
            );

            hlsInstance.current.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log(
                                "fatal media error encountered, try to recover"
                            );
                            hls.recoverMediaError();
                            break;
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error(
                                "fatal network error encountered",
                                data
                            );
                            break;
                        default:
                            hls.destroy();
                            break;
                    }
                }
            });

            hlsInstance.current.loadSource(src);
            hlsInstance.current.attachMedia(playerRef.current);
        }
        return () => {
            if (hlsInstance.current) {
                hlsInstance.current.destroy();
                hlsInstance.current = null;
            }
        };
    }, [src, hlsconfig, plyr, defaultOptions]);

    function updateQuality(newQuality) {
        hlsInstance.current.levels.forEach((level, levelIndx) => {
            if (level.height === newQuality)
                hlsInstance.current.currentLevel = levelIndx;
        });
    }

    return (
        <video
            autoPlay={autoplay}
            className={className}
            muted={autoplay ? true : false}
            ref={playerRef}
            controls
        ></video>
    );
}

export default HLSJSPlayer;
