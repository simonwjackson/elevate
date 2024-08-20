#!/bin/bash

set -euo pipefail

PORT=${PORT:-8080}
HOST=${HOST:-localhost}
TIMEOUT=10

echo "Checking if Elevate service is running on $HOST:$PORT..."

# Wait for the service to start
for i in $(seq 1 "$TIMEOUT"); do
  if curl -s "http://$HOST:$PORT/api/list" >/dev/null; then
    echo "Service is up!"
    break
  fi
  if [ "$i" -eq "$TIMEOUT" ]; then
    echo "Timeout waiting for service to start"
    exit 1
  fi
  sleep 1
done

# Check if the /api/list endpoint returns a valid JSON response
response=$(curl -s "http://$HOST:$PORT/api/list?page-size=1")
if echo "$response" | jq -e '.daata | type == "array"' >/dev/null; then
  echo "API returned valid JSON:"
  echo "$response" | jq .
else
  echo "API did not return valid JSON"
  exit 1
fi

# Check if the /api/launch endpoint works
launch_response=$(curl -s "http://$HOST:$PORT/api/launch/test-game-id/test-profile-id")
if echo "$launch_response" | jq -e '.message == "ok"' >/dev/null; then
  echo "Launch API working correctly"
else
  echo "Launch API not working as expected"
  exit 1
fi

# Check if the /api/close endpoint works
close_response=$(curl -s "http://$HOST:$PORT/api/close")
if echo "$close_response" | jq -e '.message == "ok"' >/dev/null; then
  echo "Close API working correctly"
else
  echo "Close API not working as expected"
  exit 1
fi

echo "All checks passed successfully!"
