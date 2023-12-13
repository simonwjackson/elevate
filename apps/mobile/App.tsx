import * as React from "react";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { WebViewSource } from "react-native-webview/lib/WebViewTypes";
import { StatusBar } from "expo-status-bar";
import {
  JSONRPCRequest,
  JSONRPCServer,
  TypedJSONRPCServer,
  isJSONRPCRequest,
  isJSONRPCResponse,
} from "json-rpc-2.0";

// INFO: How to "write" to the download directory
// https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/
// INFO: Query all android packages
// https://developer.android.com/reference/kotlin/android/Manifest.permission#query_all_packages
// INFO: setup NX with export
// https://blog.nrwl.io/step-by-step-guide-to-creating-an-expo-monorepo-with-nx-30c976fdc2c1

// Eula breaks gmae launch (first launch)
// You can grep steamapps/shadercaxhe for game status
// pgrep -f '115164.*Steam|Steam.*115164'
//    all PIDs returned are indicators that the game is running (or possibly frozen)
// reaper SteamLaunch AppId=1151640
//    this indicates the main process, but im not sure how reliable it is. Not sure if all compatibility layers show this.
//  Its possible to laucnch multiple steam games at a time. need to find a way to prevent this. maybe the pgrep is good enough

// am start -n org.ppsspp.ppsspp -a .PpssppActivity  -a android.intent.action.VIEW -e org.ppsspp.ppsspp.Shortcuts $FILE
// am start -n org.ppsspp.ppsspp/.PpssppActivity -a android.intent.action.VIEW -c android.intent.category.DEFAULT -d $FILE -t application/octet-stream --activity-clear-task  --activity-clear-top  --activity-no-history

type Methods = {
  echo(params: { message: string }): string;
};

const rpcServer: TypedJSONRPCServer<Methods> = new JSONRPCServer();

rpcServer.addMethod("echo", ({ message }) => {
  return message + "RN";
});

const CustomWebView = () => {
  const [source, setSource] = React.useState<WebViewSource | null>(null);
  const [assets, error] = useAssets([require("./assets/index.html")]);
  const webViewRef = React.useRef<WebView>(null);

  const processMessage = React.useCallback(
    (obj: JSONRPCRequest) => {
      // The message is a request from the frontend, we need to process it
      if (isJSONRPCRequest(obj)) {
        rpcServer.receive(obj).then((response) => {
          const txt = JSON.stringify(response);

          webViewRef.current?.injectJavaScript(
            `window.receiveMessageFromReactNative(${txt})`,
          );
        });
      }

      // This is a direct response to a query made from here (android)
      else if (isJSONRPCResponse(obj)) {
        // TODO:
      }
    },
    [webViewRef],
  );

  React.useEffect(() => {
    if (assets) {
      if (assets[0].uri.startsWith("http")) setSource({ uri: assets[0].uri });
      else {
        FileSystem.readAsStringAsync(assets?.[0].uri)
          .then((value) => {
            setSource({ html: value });
          })
          .catch(alert);
      }
    }
  }, [assets]);

  return source ? (
    <WebView
      // injectedJavaScript="window.receiveMessageFromReactNative('hi')"
      ref={webViewRef}
      originWhitelist={["*"]}
      javaScriptEnabled={true}
      androidLayerType={"hardware"}
      allowFileAccess={true}
      domStorageEnabled={true}
      mixedContentMode={"always"}
      allowUniversalAccessFromFileURLs={true}
      source={source}
      onMessage={(event) => {
        processMessage(JSON.parse(event.nativeEvent.data) as JSONRPCRequest);
      }}
    />
  ) : (
    <Text>Loading..</Text>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <CustomWebView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
