import * as React from "react";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { StorageAccessFramework } from "expo-file-system";
import { IntentLauncherParams, startActivityAsync } from "expo-intent-launcher";
import { WebViewSource } from "react-native-webview/lib/WebViewTypes";
import { StatusBar } from "expo-status-bar";
import {
  JSONRPCRequest,
  JSONRPCServer,
  TypedJSONRPCServer,
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
  alert(message);
  return message;
});

const launch = (arr) => {
  startActivityAsync(arr[0] as string, arr[1] as IntentLauncherParams)
    .then((result) => {
      console.log("Intent launched!", result);
    })
    .catch((error) => {
      console.error("Error launching intent:", error);
    });
};

const readGamingDir = () =>
  StorageAccessFramework.requestDirectoryPermissionsAsync()
    .then(async (permissions) => {
      if (permissions.granted) {
        const uri = permissions.directoryUri;

        const files = await StorageAccessFramework.readDirectoryAsync(uri);
        alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
      }
    })
    .catch(console.log);

const simpleCoreMap = {
  "nintendo-entertainment-system":
    "/data/data/com.retroarch.aarch64/cores/nestopia_libretro_android.so",
  "nintendo-gameboy-advance":
    "/data/data/com.retroarch.aarch64/cores/mgba_libretro_android.so",
};

const launcherDb = {
  "nintendo-entertainment-system": {
    type: "retroarch",
    method: "intent",
    command: [
      "android.intent.action.MAIN",
      {
        category: "android.intent.category.LAUNCHER",
        packageName: "com.retroarch.aarch64",
        className: "com.retroarch.browser.retroactivity.RetroActivityFuture",
        extra: {
          // ROM: "/storage/emulated/0/tetris.nes",
          // LIBRETRO: "/data/data/com.retroarch.aarch64/cores/nestopia_libretro_android.so",
          CONFIGFILE:
            "/storage/emulated/0/Android/data/com.retroarch.aarch64/files/retroarch.cfg",
        },
      },
    ],
  },
};

const buildRetroArchCommand = (game: any, theLauncher: any) => {
  theLauncher.command[1].extra.ROM = game.file;
  theLauncher.command[1].extra.LIBRETRO = simpleCoreMap[game.platform];

  return theLauncher.command;
};

const gameDb = {
  "😊🎉🍎🚀🌈": {
    platform: "nintendo-entertainment-system",
    title: "Tetris",
    file: "/storage/emulated/0/tetris.nes",
  },
  ahep7fshsfh: {
    platform: "nintendo-gameboy-advance",
    title: "Wario Land 4",
    file: "/storage/emulated/0/snowscape/gaming/games/nintendo-gameboy-advance/Wario Land 4 (UE) [!].gba",
  },
};

const launchGame = (obj: any) => {
  const games = {
    moonlight: [
      "android.intent.action.MAIN",
      {
        category: "android.intent.category.LAUNCHER",
        packageName: "com.limelight",
        className: "com.limelight.ShortcutTrampoline",
        extra: {
          UUID: "F6D480FD-C024-2820-7F02-980A469B3BF3",
          Name: "Desktop",
          AppId: "1577243657",
        },
      },
    ],

    dungreed: [
      "android.intent.action.MAIN",
      {
        packageName: "com.teamhoray.dungreed",
        className: "com.unity3d.player.UnityPlayerActivity",
      },
    ],
    scourgeBringer: [
      "android.intent.action.MAIN",
      {
        packageName: "com.pid.scourgebringer",
        className: "crc645d6a1e7bece73b70.Program",
      },
    ],

    deadCells: [
      "android.intent.action.MAIN",
      {
        packageName: "com.playdigious.deadcells.mobile",
        className: "com.playdigious.deadcells.mobile.DeadCellsLoading",
      },
    ],
    locoRoco: [
      "android.intent.action.VIEW",
      {
        category: "android.intent.category.DEFAULT",
        type: "application/octet-stream",
        packageName: "org.ppsspp.ppssppgold",
        className: "org.ppsspp.ppsspp.PpssppActivity",
        data: "/storage/emulated/0/psp/Loco_Roco.iso",
      },
    ],
  };

  // if (name === "moonlight") {
  //   fetch("http://zao:3000/").catch(console.log);
  // }

  const theLauncher = launcherDb[gameDb[obj.id].platform];

  if (theLauncher.type === "retroarch") {
    launch(buildRetroArchCommand(gameDb[obj.id], theLauncher));
  }
};

const processMessage = (msg: JSONRPCRequest) => {
  rpcServer.receive(msg).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      console.log(JSON.stringify(jsonRPCResponse));
    } else {
      // If response is absent, it was a JSON-RPC notification method.
      // Respond with no content status (204).
      // s.sendStatus(204);
      alert("error");
    }
  });
  // const obj = JSON.parse(msg);
  //
  // switch (obj.type) {
  //   case "launch": {
  //     launchGame(obj.payload);
  //   }
  // }
};

const CustomWebView = () => {
  const [source, setSource] = React.useState<WebViewSource | null>(null);
  const [assets, error] = useAssets([require("./assets/index.html")]);
  const webViewRef = React.useRef(null);

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
