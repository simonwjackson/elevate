# Moonbeam

Moonlight optimization for Linux nomads.

Moonbeam auto configures Moonlight for any portable Linux device. It optimizes your stream whether you're gaming on a handheld PC, working from a café, or relaxing in a hotel room.

## Features

- 🚀 Full auto mode: Let Moonbeam handle all the settings for you
- 🔄 Backwards compatibility: Works seamlessly with existing Moonlight commands
- 🌐 Smart network detection: Adjusts to your current connection quality
- 🔁 Auto-reconnect: Picks up where you left off if your connection drops
- 💼 Versatile: Can be used for both gaming and productivity tasks

## Basic Usage

The easiest way to start streaming is with the --auto option:

```
moonbeam --auto stream MyHost "My Game"
```

Replace `MyHost` with the name of the computer you're streaming from, and `"My Game"` with the name of the game you want to play.

> [!TIP]
> The --auto option sets the best FPS and resolution based on your system and network. It also sets a maximum latency to ensure responsive gameplay. This is the simplest way to get a great streaming experience without worrying about technical details.

## Common Examples

### 1. Set Specific Quality

If you want to set specific quality parameters:

```
moonbeam \
  --resolution 1920x1080 \
  --fps 60 \
  --bitrate 20000 \
  stream MyHost "My Game"
```

This sets the resolution to 1920x1080 (1080p), 60 frames per second, and a bitrate of 20 Mbps.

### 2. Prioritize Smooth Motion

To get the smoothest possible motion, potentially at the cost of resolution:

```
moonbeam \
  --max-resolution 1080p \
  --min-resolution 900p \
  --max-fps 144 \
  --priority fps \
  stream MyHost "My Game"
```

This tries to maintain 144 FPS, potentially lowering the resolution from 1080p towards 900p if needed. Moonbeam will attempt various resolutions between the max and min to find the optimal balance.

### 3. Prioritize Sharp Image

To keep the image as sharp as possible, potentially at the cost of frame rate:

```
moonbeam \
  --max-resolution 4K \
  --max-fps 144 \
  --min-fps 72 \
  --priority resolution \
  stream MyHost "My Game"
```

This maintains the highest resolution possible (up to 4K), potentially lowering the FPS as low as 72 if necessary. Moonbeam will try multiple resolutions between 4K and lower resolutions to find the best balance.

### 4. Set Quality with Latency Limit

To set a specific quality but stop if there's too much delay:

```
moonbeam \
  --resolution 1920x1080 \
  --fps 60 \
  --max-latency 20ms
  stream MyHost "My Game"
```

This uses 1080p at 60 FPS, but stops if the delay is more than 20 milliseconds.

### Advanced Examples

1. Enhance image quality while gaming on low bandwidth connections:

```bash
> nix shell \
  nixpkgs#gamescope \
  github:simonwjackson/elevate#moonbeam

> gamescope \
  -f \
  -F fsr \
  --nested-height 720 \
  --output-height 1080 \
  -- moonbeam \
    stream <HOST> <APP> \
    --max-resolution 720p \
    --max-fps 120 \
    --optimize-for fps
```

This script checks if you're on a specific Wi-Fi network (like at home). If you are, it uses your full screen resolution. If not (like when traveling), it optimizes for performance with a lower resolution but higher frame rate.

2. Optimize for travel or home use automatically: 

This works surprisingly well on the GPD Win Mini

```bash
> nix shell \
  nixpkgs#wirelesstools \
  nixpkgs#gamescope 

> WIFI="<SSID>" \
  HOST="<HOST>" \
  APP="<APP>" \
  [[ "$(iwgetid -r)" == "WIFI_SSID" ]] \
    && gamescope \
      --backend sdl \
      -f \
      -F fsr \
      -- moonbeam stream "$HOST" "$APP" \
        --max-resolution 720p \
        --max-fps 120 \
        --optimize-for fps
    || moonbeam stream "$HOST" "$APP" \
         --resolution 1080p \
         --fps 120
```

This script checks if you're on a specific Wi-Fi network (like at home). If you are, it uses your full screen resolution. If not (like when traveling), it optimizes for performance with a lower resolution but higher frame rate.

## Tips

- Moonlight remembers your last settings. You can just use `moonbeam stream MyHost "My Game"` to use the same settings as before.
- If you're not sure what settings to use, just run the basic command. Moonbeam will try to choose the best settings for you.
- Use `--priority fps` if you prefer smooth motion over sharp images, or `--priority resolution` if you prefer sharper images over smoother motion.
- When you set a range (like min and max resolution or FPS), Moonbeam doesn't just choose between the two extremes. It tries many options in between to find the best balance for your current network conditions.

## Installation

To use Moonbeam, you'll need the Nix package manager. Nix ensures you have all the necessary software components, regardless of your system configuration.

1. Install Nix:
   Follow the instructions at https://nixos.org/download.html

2. Enable Nix Flakes:
   - Add the following to your Nix configuration file (usually `/etc/nix/nix.conf` or `~/.config/nix/nix.conf`):
     ```
     experimental-features = nix-command flakes
     ```
   - Alternatively, use this environment variable when running Nix commands:
     ```
     export NIX_CONFIG="experimental-features = nix-command flakes"
     ```

> [!TIP]
> Remember to restart your shell or reload your configuration after making changes to Nix settings.

With Nix and Flakes set up, you're ready to use `moonbeam`.

## Run Speed Test Server

`iperf3` is required for Moonbeam to estimate your network speed. This helps in optimizing your streaming settings.

#### Run the iperf3 on the gaming host.

```sh
> nixpkgs#iperf3 -- -s -p 31347
```

> [!NOTE]
> For NixOS users, an iperf3 service is available at [/modules/home/service.nix]. This can be used to automatically start the iperf3 server on your gaming host.

> [!WARNING]  
> Ensure that the iperf3 server is running on your streaming host before starting `moonbeam`.

### Docs

To run Moonbeam, use the following command structure:

```sh
./moonbeam [options] stream <host> <app>
```

### Options

- `--bitrate <bitrate>`: Available bitrate in Kbps
- `--resolution <WxH>`: Set both min and max resolution
- `--max-resolution <WxH>`: Maximum resolution
- `--min-resolution <WxH>`: Minimum resolution
- `--360`, `--480`, `--540`, `--720`, `--900`, `--1080`, `--1440`, `--2K`, `--4K`: Force specific resolutions
- `--fps <fps>`: Set both min and max FPS
- `--max-fps <fps>`: Maximum FPS
- `--min-fps <fps>`: Minimum FPS
- `--max-latency <ms>`: Maximum allowed latency in milliseconds
- `-p, --priority <resolution|fps>`: Prioritize resolution or FPS in optimization
- `--log-level <level>`: Set log level (QUIET, INFO, WARN, DEBUG, TRACE, VERBOSE)
- `--interactive`: Enable interactive mode
- `--dry-run`: Show the Moonlight command without executing it
- `--detach`: Detach the stream and run in the background
- `-h, --help`: Show the help message

All other options provided will be passed through to `Moonlight`.

## Development

To work on Moonbeam locally:

1. Clone the repository
2. Install Nix if you haven't already (see [Installation](#installation) section)
3. Run `nix develop` in the project directory to enter a development environment with all necessary dependencies
4. Have fun!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

GPL2
