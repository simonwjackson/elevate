mock_iperf3() {
  cat <<EOF
{
  "end": {
    "sum_received": {
      "bits_per_second": 100000000
    }
  }
}
EOF
}

# Override the real iperf3 command with our mock function
iperf3() {
  mock_iperf3
}

# Export the function so it's available to subshells
export -f iperf3
export -f mock_iperf3
