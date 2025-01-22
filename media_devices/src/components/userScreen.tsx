import { useRef } from "react";
import { useCaptureUserScreen } from "../hooks/useRecordScreen";

export const UserScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {
    startRecording,
    error,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    blobUrl,
  } = useCaptureUserScreen();

  return (
    <div>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={pauseRecording}>Pause</button>
      <button onClick={resumeRecording}>Resume</button>
      <button onClick={resetRecording}>Reset</button>
      {blobUrl && (
        <video ref={videoRef} src={blobUrl} controls width={300} height={300} />
      )}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
};
