import { getLiveChannelLink } from "../../services/apiLive";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ReactJwPlayer from "react-jw-player";
import Loader from "../../ui/Loader";

function JWPlayer() {
  const { channelname } = useParams();
  const channelId = channelname.split("-").pop();
  const { data, isLoading } = useQuery({
    queryKey: ["channelLink", channelname],
    queryFn: () => getLiveChannelLink(`ffrt http://localhost/ch/${channelId}`),
  });
  if (isLoading) return <Loader />;
  const channelLink = data?.data;
  return (
    <div className="player">
      <ReactJwPlayer
        playerId="my-unique-id"
        playerScript="https://content.jwplatform.com/libraries/IDzF9Zmk.js"
        file={channelLink}
        privacy={true}
        image={
          "https://www.mapsofindia.com/ci-moi-images/my-india/2016/01/classic-tv-soaps.jpg"
        }
        // customProps={{
        //   // Core streaming parameters
        //   primary: "html5",
        //   hlshtml: true,

        //   // Buffer control (aggressive settings)
        //   bufferlength: 0.1, // Target buffer of just 100ms
        //   minBufferLength: 0.1, // Start playback with minimal buffer
        //   maxBufferLength: 1, // Never buffer more than 1 second ahead

        //   // Fragment loading optimization
        //   fragTimeLoad: 0.5, // Load fragments at 0.5x their duration (half time)
        //   fragLoadStrategy: 3, // 3 = most aggressive loading strategy
        //   loadTimeLimit: 2000, // Max time (ms) to spend loading a fragment

        //   // ABR (Adaptive Bitrate) settings
        //   abr: {
        //     enabled: true,
        //     bandwidthUpSwitch: 0.95, // Quick to switch up
        //     bandwidthDownSwitch: 0.8, // Quick to switch down
        //     defaultBandwidthEstimate: 2000000, // Initial estimate (2Mbps)
        //     minBitrate: 100000, // Minimum allowed bitrate
        //     maxBitrate: 8000000, // Maximum allowed bitrate
        //   },

        //   // HLS.js specific optimizations
        //   hlsjsConfig: {
        //     maxBufferSize: 1000000, // Reduce buffer memory usage
        //     maxBufferLength: 1, // Max buffer duration in seconds
        //     maxMaxBufferLength: 2,
        //     lowLatencyMode: true,
        //     backBufferLength: 0, // No back buffer
        //   },

        //   // Player UI/UX settings
        //   // autostart: true,
        //   mute: false,
        //   width: "100%",
        //   height: "100%",
        // }}
        // customProps={{
        //   playbackRateControls: false, // Disable speed controls (reduces CPU)
        //   stretching: "uniform", // Avoid aspect ratio distortion
        //   primary: "html5", // Force HTML5 (better for low latency)
        //   hlshtml: true, // Enable HLS.js for advanced tuning
        //   html5: {
        //     hlsjsConfig: {
        //       // === BUFFER CONTROL ===
        //       maxBufferLength: 0.5, // Very short buffer (0.5 sec)
        //       maxMaxBufferLength: 1, // Never exceed 1 sec buffer
        //       maxBufferSize: 0, // Let HLS.js optimize
        //       maxBufferHole: 0.1, // Smallest allowed gap before stalling
        //       lowLatencyMode: true, // Enable LL-HLS if available
        //       liveSyncDuration: 3, // Sync just 0.5 sec behind live edge
        //       liveMaxLatencyDuration: 2, // Max allowed latency
        //       liveDurationInfinity: true, // Prevents seeking to live edge too early

        //       // === NETWORK RECOVERY ===
        //       abrEwmaDefaultEstimate: 1_000_000, // Default bandwidth (1Mbps)
        //       abrBandWidthFactor: 0.8, // Conservative ABR downswitch
        //       abrBandWidthUpFactor: 0.7, // Slower upswitch to avoid buffering
        //       abrMaxWithRealBitrate: true, // Prevents overestimating
        //       backBufferLength: 0, // No back buffer (for lowest latency)
        //       maxFragLookUpTolerance: 0.1, // Faster segment retries

        //       // === PERFORMANCE ===
        //       enableWorker: true, // Offloads parsing to Web Worker
        //       enableSoftwareAES: true, // Faster decryption
        //       fpsDroppedMonitoringPeriod: 1, // Tighter FPS monitoring
        //       fpsDroppedMonitoringThreshold: 0.2, // Reacts faster to frame drops
        //     },
        //   },
        // }}
      />
    </div>
  );
}

export default JWPlayer;
