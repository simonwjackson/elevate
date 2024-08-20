# Elevate

Elevate is a flexible game management service that provides APIs for listing games, launching games, and closing the current game session.

## Features

- List available games
- Launch games with specific profiles
- Close the current game session
- RESTful API for easy integration
- Configurable through NixOS modules
- Custom configuration file support
- Ability to run under a specified user account

## Usage

To use Elevate, you need to have NixOS installed on your system. If you haven't set up NixOS yet:

> Visit https://nixos.org/download.html for installation instructions. NixOS ensures reproducibility and easy configuration management.

### NixOS Module Configuration

To enable and configure the Elevate service in your NixOS configuration:

```nix
{ config, pkgs, ... }:

{
  imports = [ 
    # Path to the Elevate module
    ./path/to/elevate/module
  ];

  services.elevate = {
    enable = true;
    port = 8080;
    host = "localhost";
    package = pkgs.elevate; # Or your custom Elevate package
    config = "/path/to/your/elevate-config.yaml";
    user = "elevate"; # Or any other user you want the service to run as
  };
}
```

### Configuration File

Elevate uses a YAML configuration file to define games and their properties. Here's a basic example:

```yaml
games:
  my-favorite-game:
    name: "My Favorite Game"
    uri: "steam://rungameid/12345"
  another-game:
    name: "Another Great Game"
    uri: "epic://rungameid/67890"
```

### API Endpoints

1. List games:
   ```
   GET /api/list?page-size=<number>
   ```

2. Launch a game:
   ```
   GET /api/launch/<game-id>/<profile-id>
   ```

3. Close the current game:
   ```
   GET /api/close
   ```

### Examples

1. List available games (limit to 10):
   ```sh
   curl "http://localhost:8080/api/list?page-size=10"
   ```

2. Launch a game with a specific profile:
   ```sh
   curl "http://localhost:8080/api/launch/my-favorite-game/default-profile"
   ```

3. Close the current game session:
   ```sh
   curl "http://localhost:8080/api/close"
   ```

## Development

To work on Elevate locally:

1. Clone the repository containing the Elevate service.
2. Use `nix develop` to enter a development environment with all necessary dependencies.
3. Make your changes and test them using the provided test script:
   ```sh
   ./check.sh
   ```

## Testing

Elevate comes with a NixOS test to ensure its functionality. You can run the test using:

```sh
nix build .#checks.x86_64-linux.service
```

This will build and run the NixOS test, verifying that the service starts correctly and its API endpoints are functioning as expected.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
