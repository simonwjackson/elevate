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
    pname = "flask-video-app";
    version = "0.1.0";

    src = ./.; # Use the current directory as the source

    format = "other"; # Tell Nix this isn't a standard Python package

    propagatedBuildInputs = [python];

    installPhase = ''
      mkdir -p $out/bin $out/lib
      cp -r . $out/lib/flask-video-app
      cat > $out/bin/flask-video-app <<EOF
      #!/bin/sh
      export FLASK_APP=$out/lib/flask-video-app/app.py
      export FLASK_ENV=production
      exec ${python}/bin/python -m flask run "\$@"
      EOF
      chmod +x $out/bin/flask-video-app
    '';

    meta = with lib; {
      description = "A Python Flask project with video handling capabilities";
      homepage = "https://github.com/your-github-username/your-repo-name";
      license = licenses.mit; # Adjust this to your actual license
      maintainers = with maintainers; [your-name];
    };
  }
