import { StorageAccessFramework } from "expo-file-system";
import { IntentLauncherParams, startActivityAsync } from "expo-intent-launcher";

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
  "nec-turbografx-16":
    '/data/data/com.retroarch.aarch64/cores/mednafen_pce_libretro_android.so'
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

const buildRetroArchCommand = (release: any, theLauncher: any) => {
  theLauncher.command[1].extra.ROM = release.resources[0].location;
  theLauncher.command[1].extra.LIBRETRO = simpleCoreMap[release.platform];

  return theLauncher.command;
};

export const launchGame = (release: any) => {
  // const games = {
  //   moonlight: [
  //     "android.intent.action.MAIN",
  //     {
  //       category: "android.intent.category.LAUNCHER",
  //       packageName: "com.limelight",
  //       className: "com.limelight.ShortcutTrampoline",
  //       extra: {
  //         UUID: "F6D480FD-C024-2820-7F02-980A469B3BF3",
  //         Name: "Desktop",
  //         AppId: "1577243657",
  //       },
  //     },
  //   ],

  //   dungreed: [
  //     "android.intent.action.MAIN",
  //     {
  //       packageName: "com.teamhoray.dungreed",
  //       className: "com.unity3d.player.UnityPlayerActivity",
  //     },
  //   ],
  //   scourgeBringer: [
  //     "android.intent.action.MAIN",
  //     {
  //       packageName: "com.pid.scourgebringer",
  //       className: "crc645d6a1e7bece73b70.Program",
  //     },
  //   ],

  //   deadCells: [
  //     "android.intent.action.MAIN",
  //     {
  //       packageName: "com.playdigious.deadcells.mobile",
  //       className: "com.playdigious.deadcells.mobile.DeadCellsLoading",
  //     },
  //   ],
  //   locoRoco: [
  //     "android.intent.action.VIEW",
  //     {
  //       category: "android.intent.category.DEFAULT",
  //       type: "application/octet-stream",
  //       packageName: "org.ppsspp.ppssppgold",
  //       className: "org.ppsspp.ppsspp.PpssppActivity",
  //       data: "/storage/emulated/0/psp/Loco_Roco.iso",
  //     },
  //   ],
  // };

  // if (name === "moonlight") {
  //   fetch("http://zao:3000/").catch(console.log);
  // }

  const theLauncher = launcherDb[release.platform];

  // if (theLauncher.type === "retroarch") {
    launch(
      buildRetroArchCommand(release, theLauncher));
  // }
};
