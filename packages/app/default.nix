{
  lib,
  python3,
}: let
  python = python3.withPackages (ps:
    with ps; [
      flask
      requests
      flask-caching
    ]);
in
  python.pkgs.buildPythonApplication rec {
    pname = "game-app";
    version = "0.1.0";

    src = ./.; # Use the current directory as the source

    format = "other"; # Tell Nix this isn't a standard Python package

    propagatedBuildInputs = [python];

    installPhase = ''
      mkdir -p $out/bin $out/lib
      cp -r . $out/lib/game-app
      cat > $out/bin/game-app <<EOF
      #!/bin/sh
      export FLASK_APP=$out/lib/game-app/app.py
      export FLASK_ENV=production
      exec ${python}/bin/python -m flask run "\$@"
      EOF
      chmod +x $out/bin/game-app
    '';

    meta = with lib; {
      description = "A Python Flask project with video handling capabilities";
      homepage = "https://github.com/your-github-username/your-repo-name";
      license = licenses.mit; # Adjust this to your actual license
      maintainers = with maintainers; [your-name];
    };
  }
