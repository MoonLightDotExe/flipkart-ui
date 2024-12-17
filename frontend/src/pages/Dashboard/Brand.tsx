import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

const Brand: React.FC = () => {
  const [model, setModel] = useState<any>(null);
  const [labels] = useState([
    "fresh_apple",
    "fresh_bitter_gourd",
    "fresh_capsicum",
    "fresh_orange",
    "fresh_tomato",
    "stale_apple",
    "stale_bitter_gourd",
    "stale_capsicum",
    "stale_orange",
    "stale_tomato",
  ]);
  const [results, setResults] = useState<any[]>([]);
  const webcamRef = useRef<any>(null);

  const timeInterval = 10 * 1000;
  const saveInterval = 20 * 1000;
  let lastDetectionTime = Date.now();
  let lastSaveTime = Date.now();

  const objectCounts = useRef<{ [key: string]: number }>(
    labels.reduce((acc, label) => ({ ...acc, [label]: 0 }), {})
  );

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel(
          "../../../public/tfjs_model/model.json"
        );
        setModel(loadedModel);
        console.log("Classifier model loaded successfully!");

        console.log("Model input shape:", loadedModel.inputs[0].shape);
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    };

    loadModel();
  }, []);

  const detectObjects = async () => {
    if (!model || !webcamRef.current) return;

    const video = webcamRef.current.video;
    const tfImg = tf.browser.fromPixels(video);
    const resizedImg = tf.image.resizeBilinear(tfImg, [224, 224]);
    const normalizedImg = resizedImg.div(255).expandDims(0);

    try {
      const predictions = await model.predict(normalizedImg);
      const predictionArray = predictions.arraySync()[0];

      const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));
      const detectedLabel = labels[maxIndex];

      objectCounts.current[detectedLabel]++;

      console.log(`Detected: ${detectedLabel}`);
    } catch (error) {
      console.error("Error during prediction:", error);
    }

    tfImg.dispose();
    resizedImg.dispose();
    normalizedImg.dispose();
  };

  const saveResults = () => {
    const currentTime = Date.now();

    if (currentTime - lastDetectionTime >= timeInterval) {
      const mostDetectedLabel = Object.keys(objectCounts.current).reduce(
        (a, b) =>
          objectCounts.current[a] > objectCounts.current[b] ? a : b,
        ""
      );

      const newResult = {
        timestamp: new Date().toISOString(),
        detected_object: mostDetectedLabel,
      };

      setResults((prev) => [...prev, newResult]);
      console.log(`Results in the last interval:`, newResult);

      objectCounts.current = labels.reduce(
        (acc, label) => ({ ...acc, [label]: 0 }),
        {}
      );
      lastDetectionTime = currentTime;
    }

    if (currentTime - lastSaveTime >= saveInterval) {
      const filename = `results_${new Date()
        .toISOString()
        .replace(/:/g, "-")}.json`;

      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(results));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", filename);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();

      console.log("Saved results to JSON.");
      lastSaveTime = currentTime;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectObjects();
      saveResults();
    }, 100);

    return () => clearInterval(interval);
  }, [model, results]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Fruit Freshness Detection</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={{
          deviceId:
            "c3042bc746843977553313f70a1251a1a738adb924d4ea1ce650af3c08890147",
        }}
        style={{
          width: "640px",
          height: "480px",
          margin: "auto",
          display: "block",
        }}
      />
      <div>
        <h2>Detection Results</h2>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Brand;
