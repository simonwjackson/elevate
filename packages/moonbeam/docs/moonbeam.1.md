---
title: MOONBEAM
section: 1
header: User Manual
footer: Moonbeam __VERSION__
date: __DATE__
---

# NAME

moonbeam - Optimize Moonlight game streaming for Linux

# SYNOPSIS

`moonbeam [OPTIONS] stream <host> <app>`

# DESCRIPTION

Moonbeam is a command-line tool that enhances Moonlight game streaming on Linux systems. It automatically configures optimal streaming settings based on network conditions and system capabilities.
Key features:

- Automatic optimization of resolution, frame rate, and bitrate
- Dynamic adaptation to changing network conditions
- Integration with various Linux display servers
- Support for custom streaming profiles
- Compatibility with existing Moonlight setups

Moonbeam acts as a wrapper around the standard Moonlight client, providing additional functionality while maintaining backwards compatibility. It is particularly useful for Linux users who frequently change their networking environment or use portable devices with varying system resources.

The tool performs network speed tests and latency measurements to ensure the stream is optimized for the current connection. It can adjust settings on-the-fly based on network performance, providing a smoother streaming experience.

Moonbeam supports streaming both games and non-game applications, allowing for remote access to resource-intensive software or entire desktop environments.

# OPTIONS

## Moonbeam-specific Options

`--bitrate <bitrate>`

Set the available bitrate in Kbps (kilobits per second). This option allows you to manually specify the maximum bandwidth for the stream. If not provided, Moonbeam will automatically calculate an appropriate bitrate based on the maximum resolution and FPS. You can use suffixes like 'Mbps' (e.g., '10Mbps') for convenience.

`--resolution <WxH>`

Set both minimum and maximum resolution simultaneously (e.g., 1920x1080). This option is a shorthand for setting both --min-resolution and --max-resolution to the same value. It's useful when you want to force a specific resolution. If specified, it overrides individual --min-resolution and --max-resolution settings.

`--max-resolution <WxH>`

Set the maximum resolution for the stream (e.g., 1920x1080). Moonbeam will not exceed this resolution even if higher resolutions are available on your system. This is useful for limiting bandwidth usage or ensuring compatibility with certain displays.

`--min-resolution <WxH>`

Set the minimum resolution for the stream (e.g., 640x360). Moonbeam will not go below this resolution even in low bandwidth conditions. This ensures a baseline quality for your stream.

`--resolution-steps <steps>`

Set the number of intermediate steps for resolution scaling. Default is 128. Higher values provide more granular resolution options, allowing Moonbeam to fine-tune the resolution based on network conditions. For example, with a higher step count, Moonbeam might choose 1600x900 instead of jumping directly from 1080p to 720p.

`--reconnect`

Enable automatic reconnection if the stream is disconnected. This is particularly useful for unstable network conditions or when switching between different networks (e.g., moving from Wi-Fi to cellular data).

`--fps <fps>`

Set both minimum and maximum FPS (frames per second) simultaneously (e.g., 60). This option is a shorthand for setting both --min-fps and --max-fps to the same value. It's useful when you want to lock the stream to a specific frame rate.

`--max-fps <fps>`

Set the maximum FPS for the stream (e.g., 120). Moonbeam will not exceed this frame rate even if higher rates are available. This can be useful for capping the frame rate to match your display's refresh rate or to reduce bandwidth usage.

`--min-fps <fps>`

Set the minimum FPS for the stream (e.g., 30). Moonbeam will not go below this frame rate even in low bandwidth conditions. This ensures a baseline smoothness for your stream.

`--max-latency <ms>`

Set the maximum allowed latency in milliseconds. If the measured latency exceeds this value, Moonbeam will attempt to optimize settings or abort the connection. This helps ensure a responsive gaming experience by setting an upper limit on acceptable input lag.

`--priority <resolution|fps>`

Set the priority for optimization. Use 'resolution' to prioritize higher resolutions, or 'fps' to prioritize higher frame rates. Default is 'fps'. This option tells Moonbeam which aspect to favor when it needs to make trade-offs due to bandwidth limitations.

`--log-level <level>`

Set the logging verbosity. Valid levels are QUIET, SIMPLE, INFO, WARN, DEBUG, TRACE, and VERBOSE. Higher levels provide more detailed output, which can be useful for troubleshooting. QUIET provides minimal output, while VERBOSE gives the most detailed logs.

`--dry-run`

Show the Moonlight command that would be executed without actually starting the stream. This is useful for testing and debugging your Moonbeam configuration without initiating a connection. It allows you to see how Moonbeam would interpret your settings and what command it would pass to Moonlight.

These options provide fine-grained control over Moonbeam's behavior, allowing you to tailor the streaming experience to your specific needs and network conditions. When used in combination, they enable you to create custom streaming profiles for different scenarios, such as high-quality home streaming or bandwidth-efficient mobile streaming.

## Resolution Shorthand Options

Moonbeam provides convenient shorthand options for common resolutions:

`--360` Force a 640x360 resolution

`--480` Force a 854x480 resolution

`--540` Force a 960x540 resolution

`--720` Force a 1280x720 resolution

`--900` Force a 1600x900 resolution
    
`--1080` Force a 1920x1080 resolution

`--1440` Force a 2560x1440 resolution

`--2K` Force a 2048x1080 resolution

`--4K` Force a 3840x2160 resolution

## Other Options

`-h, --help`
    Show the help message and exit.

`--version`
    Show the version information and exit.

Note: Moonbeam also supports all standard Moonlight options. These can be passed directly and will be forwarded to the Moonlight client.

# EXAMPLES

1. Basic usage with automatic optimization:

   moonbeam stream myhost "My Favorite Game"

   This command will connect to 'myhost' and stream "My Favorite Game" with automatically optimized settings.

2. Set a specific resolution and frame rate:

   moonbeam --resolution 1920x1080 --fps 60 stream myhost "High-Resolution Game"

   This will stream the game at 1080p resolution with a 60 FPS cap.

3. Use resolution shorthand with maximum FPS:

   moonbeam --1080 --max-fps 120 stream myhost "Fast-Paced Shooter"

   Streams the game at 1080p with up to 120 FPS, depending on network conditions.

4. Prioritize resolution over frame rate:

   moonbeam --priority resolution --max-resolution 4K --max-fps 60 stream myhost "Cinematic RPG"

   This command will favor higher resolutions (up to 4K) over higher frame rates when optimizing the stream.

5. Set a specific bitrate:

   moonbeam --bitrate 20000 stream myhost "Bandwidth-Intensive Game"

   Limits the stream to a maximum of 20 Mbps bitrate.

6. Low-latency configuration:

   moonbeam --max-latency 20 --priority fps --max-resolution 1080p stream myhost "Competitive Multiplayer"

   Optimizes for low latency (max 20ms) and prioritizes frame rate for a responsive gaming experience.

7. Automatic reconnection:

   moonbeam --reconnect stream myhost "Long Gaming Session"

   Automatically attempts to reconnect if the stream is disconnected.

8. Dry run to test settings:

   moonbeam --dry-run --1440 --max-fps 144 --bitrate 50000 stream myhost "Test Game"

   Shows the Moonlight command that would be executed without actually starting the stream.

9. Streaming a non-game application:

   moonbeam stream myhost "Desktop"

   Streams the entire desktop environment, useful for remote work scenarios.

10. Custom resolution range:

    moonbeam --min-resolution 720p --max-resolution 4K --resolution-steps 5 stream myhost "Adaptive Resolution Game"

    Sets a custom resolution range with 5 steps between 720p and 4K for adaptive streaming.

11. Debug logging:

    moonbeam --log-level DEBUG stream myhost "Troublesome Game"

    Enables debug logging for troubleshooting streaming issues.

12. Combining Moonbeam and Moonlight options:

    moonbeam --1080 --fps 60 --vsync --performance-overlay stream myhost "Hybrid Settings Game"

    Uses Moonbeam for resolution and FPS settings while passing Moonlight-specific options (vsync and performance overlay).

13. Streaming with a frame rate range:

    moonbeam --min-fps 30 --max-fps 90 stream myhost "Variable Framerate Game"

    Allows the frame rate to adapt between 30 and 90 FPS based on network conditions.

14. Optimizing for a low-bandwidth connection:

    moonbeam --max-resolution 720p --max-fps 30 --bitrate 5000 stream myhost "Low Bandwidth Game"

    Configures settings suitable for streaming over a limited internet connection.

15. High-quality streaming setup:

    moonbeam --4K --max-fps 60 --bitrate 100000 --priority resolution stream myhost "Graphically Intensive Game"

    Sets up a high-quality stream targeting 4K resolution at 60 FPS with a high bitrate, prioritizing resolution.

These examples demonstrate the flexibility of Moonbeam in various streaming scenarios. Users can combine different options to tailor the streaming experience to their specific needs, network conditions, and hardware capabilities.

# NOTES

1. Network Performance:
   - Moonbeam relies on accurate network performance measurements to optimize streaming settings. Ensure that your network conditions are stable when starting a stream for the best results.
   - The tool uses iperf3 for bandwidth measurements. If iperf3 is not available on the host, Moonbeam will fall back to estimated bitrates based on resolution and FPS settings.
   - Latency measurements are performed using ICMP ping. Some networks may block ICMP traffic, which could affect Moonbeam's ability to measure latency accurately.

2. Resolution and FPS:
   - When using shorthand resolution options (e.g., --1080), both minimum and maximum resolutions are set to the specified value, potentially limiting Moonbeam's ability to adapt to network conditions.
   - The actual streaming resolution and FPS may be lower than the specified maximum values if network conditions or host capabilities do not support them.
   - Moonbeam will not exceed the native resolution or refresh rate of your display, even if higher values are specified.

3. Bitrate Calculation:
   - If no bitrate is specified, Moonbeam calculates an appropriate bitrate based on the resolution, FPS, and available bandwidth. This calculation is an estimate and may not always be optimal for all types of content.
   - The --bitrate option sets a maximum bitrate. Actual streaming bitrate may be lower based on network conditions.

4. Compatibility:
   - Moonbeam is designed for Linux systems and may not function correctly on other operating systems.
   - While Moonbeam is compatible with most Moonlight setups, certain advanced Moonlight features may not be fully supported or optimized.

5. Host Requirements:
   - The streaming host must be running Sunshine or NVIDIA GeForce Experience with GameStream enabled.
   - For optimal performance, ensure that the host GPU drivers are up-to-date.

6. Client System Impact:
   - Moonbeam may require additional CPU resources compared to standard Moonlight, due to its dynamic optimization features.
   - In --dry-run mode, Moonbeam performs all calculations and measurements but does not actually start the stream. This can be useful for testing but may still impact network and system resources briefly.

7. Reconnection Behavior:
   - When using the --reconnect option, Moonbeam will attempt to re-establish the connection if it's lost. However, this may not work in all scenarios, particularly if the host becomes unavailable.
   - Reconnection attempts may result in brief periods of high CPU usage as Moonbeam re-optimizes settings.

8. Logging and Debugging:
   - Log files are stored in /tmp/moonbeam.log by default. These logs can be crucial for troubleshooting issues.
   - Higher log levels (e.g., DEBUG, TRACE) can provide more detailed information but may impact performance slightly.

9. Integration with Other Tools:
   - Moonbeam can be integrated with tools like Gamescope for additional features such as upscaling. However, this may require manual configuration and could affect Moonbeam's automatic optimization.

10. Security Considerations:
    - Moonbeam does not implement its own security measures. It relies on Moonlight's built-in security features. Ensure your network is secure, especially when streaming over the internet.
    - Be cautious when streaming on public or unsecured networks, as this could potentially expose your stream to unauthorized access.

11. Performance Variability:
    - Streaming performance can vary based on many factors including network congestion, host system load, and client hardware capabilities. Moonbeam attempts to optimize for these variables, but perfect performance is not always achievable.

13. Automatic Updates:
    - Moonbeam does not include an auto-update feature. Users should regularly check for updates to ensure they have the latest optimizations and compatibility fixes.

14. Conflict with Manual Settings:
    - If you specify manual settings (e.g., fixed resolution or FPS) that conflict with Moonbeam's calculated optimal settings, Moonbeam may prioritize your manual settings. This may result in suboptimal streaming performance in some cases.

# SEE ALSO

`moonlight(1)`
    The main Moonlight client command. Moonbeam wraps and extends the functionality of Moonlight.

`sunshine(1)`
    The Sunshine streaming host, which is compatible with Moonbeam and Moonlight clients.

`iperf3(1)`
    Network bandwidth measurement tool used by Moonbeam for determining optimal streaming settings.

`ping(8)`
    Network utility for measuring round-trip time, used by Moonbeam for latency calculations.

Moonbeam Documentation:
    https://docs.moonbeam.ing

Moonlight Documentation:
    https://github.com/moonlight-stream/moonlight-docs/wiki/Setup-Guide

NVIDIA GameStream Documentation:
    https://www.nvidia.com/en-us/support/gamestream/gamestream-pc-setup/

# AUTHOR

Moonbeam is primarily developed and maintained by Simon W. Jackson <contact@moonbeam.ing>.

Contributors to the project can be found in the GitHub repository:
https://github.com/simonwjackson/moonbeam/graphs/contributors

# COPYRIGHT

Copyright (C) 2023-2024 Simon W. Jackson and contributors

Moonbeam is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

Moonbeam incorporates code from the following projects:

- Moonlight (https://github.com/moonlight-stream/moonlight-qt)
  Copyright (C) 2015-2024 Cameron Gutman and contributors
  Licensed under GPLv3

For full copyright and license information of dependencies, please refer to the project's GitHub repository:
https://github.com/simonwjackson/moonbeam
