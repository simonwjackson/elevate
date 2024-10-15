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
        "id": 1,
        "name": "BS Zelda Map 1",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/bszelda_map1.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 2,
        "name": "Secret of Mana",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Secret of Mana (U) [!].smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 3,
        "name": "SMW2 Plus 2 - Yoshi's Island",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/SMW2 Plus 2 - Yoshis Island.fig",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 4,
        "name": "Super Mario World 2 Plus 2",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/super-mario-world-2-plus-2.sfc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 5,
        "name": "Super Mario World 2 Plus",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/super-mario-world-2-plus.sfc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 6,
        "name": "Super Mario World 2 - Yoshi's Island",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/super-mario-world-2-yoshis-island.sfc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 7,
        "name": "Super Bomberman 4",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Bomberman 4 (Japan).sfc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 8,
        "name": "Super Mario World",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World (U) [!].smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 9,
        "name": "Super Mario World",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 10,
        "name": "Super Mario World 2 - Yoshi's Island",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World 2 - Yoshi's Island (U) (V1.1).smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 11,
        "name": "Super Mario World 2 - Yoshi's Island (Patched)",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World 2 - Yoshi's Island (U) (V1.1) [patched].smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 12,
        "name": "Super Mario World DX - Luigi",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World DX - Luigi.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 13,
        "name": "Super Mario World DX - Mario",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World DX - Mario.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 14,
        "name": "Super Mario World DX - Peach",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World DX - Peach.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 15,
        "name": "Super Mario World DX - Toad",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Mario World DX - Toad.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 16,
        "name": "Super Metroid",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Metroid.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 17,
        "name": "Super Off Road",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Super Off Road (U) [!].smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 18,
        "name": "Yoshi's Island - SMW2+2",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Yoshi's Island - SMW2+2.smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
    {
        "id": 19,
        "name": "Yoshi's Islands Frozen Paradise Demo 4",
        "game": "/data/data/com.termux.nix/files/home/snowscape/gaming/games/nintendo-super-nintendo-entertainment-system/Yoshi's Islands Frozen Paradise Demo 4 (SMW2 Hack).smc",
        "core": "/data/data/com.retroarch.aarch64/cores/snes9x_libretro_android.so",
    },
]


@app.route("/")
def index():
    path = request.args.get("path", "/")
    return render_template("index.html", initial_path=path)


@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


@app.route("/api/games", methods=["GET"])
def get_games():
    games_html = "".join(
        [
            f'<div class="bg-blue-500 text-white rounded hover:bg-teal-300 focus-visible:bg-teal-300 focus-visible:ring-opacity-50 aspect-3-2 flex items-center justify-center cursor-pointer flex-shrink-0 w-48" x-navi="" tabindex="0" @mouseover="handleHover($event.target)" @click="launchGame($event.target)" data-game-id="{game["id"]}" data-game-name="{game["name"]}" data-game="{game["game"]}" data-core="{game["core"]}">{game["name"]}</div>'
            for game in games
        ]
    )
    return games_html


def resolve_symlink(path):
    """Resolve symbolic links in the given path."""
    return os.path.realpath(path)


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
