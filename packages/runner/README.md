# Runner

Runner is a flexible game launcher script. It allows you to execute commands with additional features such as running cleanup commands, storing metadata, and managing output.

## Features

- Execute any command or application
- Run cleanup commands after the main process ends (or killed)
- Store and manage metadata
- Control output redirection
- Prevent multiple instances from running simultaneously

## Usage

To use Runner, you need to have Nix installed on your system. If you haven't installed Nix yet:

> Visit https://nixos.org/download.html for installation instructions. Nix ensures reproducibility, allowing all packages to be available on any system where Nix is installed.

### Running directly

To run the Runner package directly, use the following command structure:

```sh
nix run .#runner -- [options] [--] <command>...
```

### Options

- `-h, --help`: Show the help screen
- `-a, --after <cmd>`: Command to run during cleanup (can be specified multiple times)
- `-m, --meta <key=value>`: Metadata to store (can be specified multiple times)
- `-o, --output <file>`: File to append the output of after commands
- `-q, --quiet`: Redirect all output to /tmp/game.log

### Examples

1. Launch an application with a cleanup command:

```sh
nix run .#runner -- --after 'echo "Finished" | tee -a ./output.log' -- /path/to/your/app
```

2. Launch a game with metadata and multiple cleanup commands:

```sh
nix run .#runner -- \
  --meta "game=MyFavoriteGame" \
  --meta "version=1.2.3" \
  --after 'echo "Saving game stats..."' \
  --after 'python3 upload_stats.py' \
  --output game_session.log \
  -- /path/to/game/executable
```

3. Run a server application quietly with a shutdown command:

```sh
nix run .#runner -- \
  --quiet \
  --after 'echo "Shutting down server..."' \
  --after './shutdown_script.sh' \
  -- ./start_server.sh
```

4. Launch an application with resource monitoring:

```sh
nix run .#runner -- \
  --after 'echo "Resource usage summary:"' \
  --after 'cat /tmp/resource_usage.log' \
  --output session_log.txt \
  -- sh -c 'while true; do ps -p $$ -o %cpu,%mem >> /tmp/resource_usage.log; sleep 5; done & exec /path/to/your/app'
```

## Development

To work on Runner locally, clone the repository containing the Snowfall lib flake and use `nix develop` to enter a development environment with all necessary dependencies.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
