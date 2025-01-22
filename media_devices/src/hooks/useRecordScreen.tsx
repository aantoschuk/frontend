import { startTransition, useEffect, useState } from "react";

export type Status =
  | "recording"
  | "idle"
  | "error"
  | "stopped"
  | "paused"
  | "permission-requested";

export const useCaptureUserScreen = () => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<any>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [status, setStatus] = useState<Status>("permission-requested");
  const [streams, setStreams] = useState<{
    audio?: MediaStreamTrack | null;
    screen?: MediaStreamTrack | null;
  }>({ audio: null, screen: null });

  // Effect to handle data available from the recorder
  useEffect(() => {
    if (!mediaRecorder) return;

    mediaRecorder.ondataavailable = (event) => {
      console.log("Data available:", event.data);
      if (event.data.size > 0) {
        const url = window.URL.createObjectURL(event.data);
        setBlobUrl(url);
        setBlob(event.data);
      } else {
        console.warn("No data available in the recording");
      }
    };
  }, [mediaRecorder]);

  // Effect to stop recording when screen or audio tracks end
  useEffect(() => {
    const stopRecordingOnTrackEnd = (event: Event) => {
      console.log("Track ended:", event);
      stopRecording(); // Stop the recording when a track ends
    };

    // Listen for track ending (both screen and audio)
    streams.screen?.addEventListener("ended", stopRecordingOnTrackEnd);
    streams.audio?.addEventListener("ended", stopRecordingOnTrackEnd);

    // Clean up listeners on component unmount or when streams change
    return () => {
      streams.screen?.removeEventListener("ended", stopRecordingOnTrackEnd);
      streams.audio?.removeEventListener("ended", stopRecordingOnTrackEnd);
    };
  }, [streams]);

  // Request media stream: screen + audio
  const requestMediaStream = async () => {
    try {
      // Request screen sharing first
      const displayMedia = await navigator.mediaDevices.getDisplayMedia();

      // Request user media (microphone) next
      const userMedia = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Combine screen and audio tracks into a new stream
      const tracks = [...displayMedia.getTracks(), ...userMedia.getTracks()];

      // Update the streams state with screen and audio tracks
      setStreams({
        audio: userMedia.getTracks()[0],
        screen: displayMedia.getTracks()[0],
      });

      if (tracks.length) setStatus("idle");

      // Create a combined media stream
      const combinedStream = new MediaStream(tracks);
      const recorder = new MediaRecorder(combinedStream);
      setMediaRecorder(recorder);

      return recorder;
    } catch (e) {
      setError(e);
      setStatus("error");
      setMediaRecorder(null); // Clean up in case of error
    }
  };

  const startRecording = async () => {
    if (!mediaRecorder) {
      console.log("Initializing media recorder...");
      const recorder = await requestMediaStream();
      console.log("Starting recording...");
      recorder?.start();
      setStatus("recording");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder) return;
    console.log("Stopping recording");
    mediaRecorder.stop();

    // Stop all tracks, including screen and audio
    mediaRecorder.stream.getTracks().forEach((track) => {
      track.stop();
    });

    // Update the streams state to null after stopping the recording
    setStreams({ audio: null, screen: null });

    setMediaRecorder(null);
  };

  const pauseRecording = () => {
    if (!mediaRecorder) return;
    mediaRecorder.pause();
    setStatus("paused");
  };

  const resumeRecording = () => {
    if (!mediaRecorder) return;
    mediaRecorder.resume();
    setStatus("recording");
  };

  const resetRecording = () => {
    setBlobUrl(null);
    setError(null);
    setMediaRecorder(null);
    setStreams({ audio: null, screen: null });
    setStatus("idle");
  };

  return {
    error,
    blobUrl,
    startRecording,
    stopRecording,
    resetRecording,
    resumeRecording,
    pauseRecording,
  };
};
