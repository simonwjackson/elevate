<p align="center">
  <img src="./moonbeam-logo.png" alt="Moonbeam Logo" width="400">
</p>

<p align="center">
    <img alt="Nix" src="https://img.shields.io/badge/Nix-5277C3?style=for-the-badge&logo=nixos&logoColor=white" style="max-width: 100%;">
    <img alt="Linux" src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&amp;logo=linux&amp;logoColor=black" style="max-width: 100%;">
    <img alt="GPL2" src="https://img.shields.io/badge/license-GPL2-blue.svg?style=for-the-badge" style="max-width: 100%;">
</p>

# Moonbeam

A simple, automated, network aware launcher for  [Moonlight](https://moonlight-stream.org).

## Features

- 🤖 Auto-tuning Moonlight settings
- 🔌 Reconnect automatically on disconnection
- ⚖️ Prioritize FPS, resolution, or bandwidth
- 🧩 Scriptable and launcher-friendly


## Prerequisites

- Linux operating system
- [Nix package manager](https://nixos.org/download.html)
- [Sunshine](https://github.com/LizardByte/Sunshine) installed and configured

## Installation

Moonbeam can be installed using the Nix package manager. For detailed installation instructions, please refer to the [Installation Guide](https://moonbeam.ing/getting-started/installation-guide/) in the documentation.

## Quick Start

1. Start an `iperf3` server on your host PC:

   ```bash
   iperf3 -s -p 31347
   ```

2. Launch Moonbeam with:

   ```bash
   moonbeam stream <host> <app> --reconnect
   ```

   Replace `<host>` with your gaming PC's hostname or IP, and `<app>` with the game or application you want to stream.

## Documentation

Comprehensive documentation for Moonbeam is available at [docs.moonbeam.ing](https://moonbeam.ing/).

## Contributing

We welcome contributions! Please see the [Contributing Guide](https://moonbeam.ing/support/contributing/) for more information.

## License

Moonbeam is released under the GPL2 license.
