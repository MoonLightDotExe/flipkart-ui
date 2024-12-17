import React, { useEffect, useRef, useState } from "react";

const Fresh = () => {
  const videoRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [inferEngine, setInferEngine] = useState(null);
  const workerId = "iris-has1f/1"; // Replace with your model ID
  const apiKey = "rf_TMh3HikGBud57qbgT6u65uDtt9d2"; // Replace with your API key

    useEffect(() => {
    // Initialize inference engine
    const { InferenceEngine, CVImage } = window.inferencejs;
    const engine = new InferenceEngine();
      console.log(window.inferencejs);

    engine
      .startWorker("iris-has1f/1", "1", "rf_TMh3HikGBud57qbgT6u65uDtt9d2")
      .then(() => {
        console.log("Model loaded!");
        setInferEngine(engine);
      })
      .catch((err) => console.error("Error loading model:", err));
  }, []);

  useEffect(() => {
    if (inferEngine && videoRef.current) {
      const video = videoRef.current;

      const handleStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
        video.play();

        const processFrame = async () => {
          if (!video.paused && !video.ended) {
            const image = new window.inferencejs.CVImage(video);
            inferEngine
              .infer(workerId, image)
              .then((predictions) => {
                console.log("Predictions:", predictions);
                setPredictions(predictions); // Update state
              })
              .catch((err) => console.error("Inference error:", err));
          }
          requestAnimationFrame(processFrame);
        };

        processFrame();
      };

      handleStream();

      // Cleanup on component unmount
      return () => {
        const tracks = video.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
      };
    }
  }, [inferEngine]);

  return (
    <div>
      <video ref={videoRef} width="640" height="640" autoPlay muted />
      <div>
        <h3>Predictions:</h3>
        <pre>{JSON.stringify(predictions, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Fresh;
