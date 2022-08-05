import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function App() {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const image = await cameraRef.current.takePictureAsync(options);
      const uri = image.uri;
      let filename = uri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      if (uri) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);

          //Upload to server
          const form_data = new FormData();
          // form_data.append("file", {
          //   form_data.append({
          //   name: filename,
          //   type,
          //   uri,
          //   image
          // });
  
          form_data.append("image", image.base64);
  
          const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            body: form_data,
            headers: {
              Authorization: "Client-ID e82a68bd825b9db",
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }).then(console.log('Image uploaded to imgur'));
          const json = await response.json();
          // console.log(json);
          const link = json.data.link;
          // console.log(link);
          if (link) {
            console.log("Uploaded successfully");
            // console.log(link);
              fetch("http://192.168.1.3:3001/upload", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  link: link,
                }),
              })
              .then(console.log('Image called to ocr api'));
          }
      }
    }
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
      />
      <View style={styles.container}>
        <View style={styles.container}>
          {isPreview && (
            <TouchableOpacity
              onPress={cancelPreview}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <AntDesign name="close" size={32} color="#fff" />
            </TouchableOpacity>
          )}
          {!isPreview && (
            <View style={styles.container}>
              {!isPreview && (
                <View style={styles.bottomButtonsContainer}>
                  <TouchableOpacity
                    disabled={!isCameraReady}
                    onPress={switchCamera}
                  >
                    <MaterialIcons
                      name="flip-camera-ios"
                      size={28}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={!isCameraReady}
                    onPress={onSnap}
                    style={styles.capture}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: "#fff",
  },
  bottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#5A45FF",
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A45FF",
    opacity: 0.7,
  },
});
