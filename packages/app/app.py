import glob
import json
import logging
import mimetypes
import os
import shlex
import ssl
import subprocess

from flask import (
    Flask,
    abort,
    jsonify,
    redirect,
    render_template,
    request,
    send_file,
    send_from_directory,
    url_for,
)
from flask_caching import Cache

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder="public", static_url_path="")

# Configure caching
cache = Cache(app, config={"CACHE_TYPE": "simple"})

games = [
    {
        "id": 2,
        "name": "Secret of Mana",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Secret of Mana (U) [!].smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
        "image": "https://cdn2.steamgriddb.com/grid/20c1fd3638caa5d1dce50b6c0b7fc409.png"
    },
    {
        "id": 6,
        "name": "Super Mario World 2 - Yoshi's Island",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/super-mario-world-2-yoshis-island.sfc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
        "image": "https://cdn2.steamgriddb.com/grid/59857cc70355243795b398b32447b862.png"
    },
    {
        "id": 7,
        "name": "Super Bomberman 4",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Bomberman 4 (Japan).sfc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
        "image": "https://cdn2.steamgriddb.com/grid/400cfdfc88d288dbf92175876e9ec05c.png"
    },
    {
        "id": 8,
        "name": "Super Mario World",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World (U) [!].smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
        "image": "https://cdn2.steamgriddb.com/grid/b4c447665cda1feecc6f58815d47702d.png"
    },

    {
        "id": 15,
        "name": "Super Mario World DX - Toad",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World DX - Toad.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
        "image": "https://kagi.com/proxy/I9Sd0dA.png?c=LeUEJczBkA3eiHIb6Q3EKisipkFWqUiCnBdTBPWQkaYJAngmA8YutWJsJW8-X_Gd"
    },
    {
        "id": 16,
        "name": "Super Metroid",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Metroid.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
        "image": "https://cdn2.steamgriddb.com/grid/9267a5acf6b4bb607c934b2064fbf248.png"
    },
    {
        "id": 17,
        "name": "Super Off Road",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Off Road (U) [!].smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
        "image": "https://cdn2.steamgriddb.com/grid/d13535ad5ea4f4b746ab73d0b94a4eb8.png"
    },
]

# Dolphin
# am start   -n org.dolphinemu.dolphinemu/.ui.main.MainActivity   -a android.intent.action.VIEW   -e AutoStartFile "/storage/emulated/0/snowscape/gaming/games/nintendo-wii/super-mario-galaxy-2.wbfs"   --activity-clear-task   --activity-clear-top   --activity-no-history

@app.route("/")
def index():
    path = request.args.get("path", "/")
    return render_template("index.html", initial_path=path)


@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


@app.route("/api/games", methods=["GET"])
def get_games():
    games_html = "".join([render_template("components/game.html", game=game) for game in games])
    return games_html


def resolve_symlink(path):
    """Resolve symbolic links in the given path."""
    return os.path.realpath(path)



@app.route("/api/remote", methods=["POST"])
def remote():
    # data = request.json
    # game = data.get("game")
    #
    # if not game:
    #     return (
    #         jsonify({"status": "error", "message": "Missing game parameter"}),
    #         400,
    #     )

    command = [
        "am",
        "start",
        "--user",
        "0",
        "-n",
        "com.limelight.root/com.limelight.ShortcutTrampoline",
        "--es", "UUID", "49CED8D7-F40A-9D27-D79D-9D9648B4C5BE",
        "--es", "Name", "aka",
        "--es", "AppId", "1590712279"
    ]

    try:
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        logger.info(f"Command executed successfully: {result.stdout}")
        return (
            jsonify(
                {"status": "success", "message": "RetroArch launched successfully"}
            ),
            200,
        )
    except subprocess.CalledProcessError as e:
        logger.error(f"Error executing command: {e.stderr}")
        return (
            jsonify(
                {
                    "status": "error",
                    "message": f"Failed to launch RetroArch: {e.stderr}",
                }
            ),
            500,
        )



@app.route("/api/launch", methods=["POST"])
def launch():
    data = request.json
    game = data.get("game")
    core = data.get("core")

    if not game or not core:
        return (
            jsonify({"status": "error", "message": "Missing game or core parameter"}),
            400,
        )

    command = [
        "am",
        "start",
        "--user",
        "0",
        "-n",
        "com.retroarch.aarch64/com.retroarch.browser.retroactivity.RetroActivityFuture",
        "-e",
        "ROM",
        resolve_symlink(game),
        "-e",
        "LIBRETRO",
        resolve_symlink(core),
        "-e",
        "CONFIGFILE",
        resolve_symlink(
            "/storage/emulated/0/Android/data/com.retroarch.aarch64/files/retroarch.cfg"
        ),
        "-e",
        "IME",
        "com.android.inputmethod.latin/.LatinIME",
        "-e",
        "DATADIR",
        resolve_symlink("/data/data/com.retroarch.aarch64"),
        "-e",
        "APK",
        resolve_symlink("/data/app/com.retroarch.aarch64-1/base.apk"),
        "-e",
        "SDCARD",
        resolve_symlink("/storage/emulated/0"),
        "-e",
        "EXTERNAL",
        resolve_symlink("/storage/emulated/0/Android/data/com.retroarch.aarch64/files"),
    ]

    try:
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        logger.info(f"Command executed successfully: {result.stdout}")
        return (
            jsonify(
                {"status": "success", "message": "RetroArch launched successfully"}
            ),
            200,
        )
    except subprocess.CalledProcessError as e:
        logger.error(f"Error executing command: {e.stderr}")
        return (
            jsonify(
                {
                    "status": "error",
                    "message": f"Failed to launch RetroArch: {e.stderr}",
                }
            ),
            500,
        )


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

