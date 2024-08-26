# Moonbeam

Moonbeam is an intelligent shell script that enhances the Moonlight game streaming experience for Linux users. It automatically optimizes streaming settings based on your system and network conditions.

## Features

- 🚀 Automatic optimization of streaming settings
- 🔄 Compatibility with existing Moonlight setups
- 🌐 Smart network detection and dynamic adjustments
- 🔁 Auto-reconnect functionality
- 💼 Versatility for gaming and productivity

## Prerequisites

- Linux operating system
- [Moonlight](https://moonlight-stream.org) and [Sunshine](https://github.com/LizardByte/Sunshine) installed and configured

## Installation

Moonbeam can be installed using the Nix package manager. For detailed installation instructions, please refer to the [Installation Guide](https://docs.moonbeam.ing/getting-started/installing-moonbeam) in our documentation.

## Quick Start

1. Ensure the `iperf3` speed test server is running on your host PC:

   ```bash
   iperf3 -s -p 31347
   ```

2. Launch Moonbeam with:

   ```bash
   moonbeam stream <host> <app>
   ```

   Replace `<host>` with your gaming PC's hostname or IP, and `<app>` with the game or application you want to stream.

For more usage examples and advanced configurations, refer to the [Streaming Basics](https://docs.moonbeam.ing/getting-started/streaming-basics) section.

## Documentation

Comprehensive documentation for Moonbeam is available at [docs.moonbeam.ing](https://docs.moonbeam.ing/). Key sections include:

- [Introduction](https://docs.moonbeam.ing/getting-started/introduction)
- [Installing Moonbeam](https://docs.moonbeam.ing/getting-started/installing-moonbeam)
- [Streaming Basics](https://docs.moonbeam.ing/getting-started/streaming-basics)
- [Configuration Options](https://docs.moonbeam.ing/reference/Options/)
  - [Resolution Settings](https://docs.moonbeam.ing/reference/Options/resolution-settings)
  - [FPS Settings](https://docs.moonbeam.ing/reference/Options/fps-settings)
  - [Bitrate Settings](https://docs.moonbeam.ing/reference/Options/bitrate-settings)
  - [Latency Settings](https://docs.moonbeam.ing/reference/Options/latency-settings)
  - [Priority Settings](https://docs.moonbeam.ing/reference/Options/priority-settings)
  - [Auto-reconnect](https://docs.moonbeam.ing/reference/Options/auto-reconnect)
- [Troubleshooting](https://docs.moonbeam.ing/reference/Troubleshooting/)
  - [Moonbeam Troubleshooting](https://docs.moonbeam.ing/reference/Troubleshooting/troubleshooting)
  - [Understanding Error Messages](https://docs.moonbeam.ing/reference/Troubleshooting/error-messages)
  - [Network Considerations](https://docs.moonbeam.ing/reference/Troubleshooting/understanding-network-speed-tests)
  - [Getting Support](https://docs.moonbeam.ing/reference/Troubleshooting/bugs-and-support)
- [Advanced Usage](https://docs.moonbeam.ing/reference/Advanced-Usage/)
  - [Scripting with Moonbeam](https://docs.moonbeam.ing/reference/Advanced-Usage/scripting)
  - [Integrating Moonbeam with Other Tools](https://docs.moonbeam.ing/reference/Advanced-Usage/integrating-moonbeam)

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://docs.moonbeam.ing/reference/contributing) for more information.

## License

Moonbeam is released under the GPL2 license.
