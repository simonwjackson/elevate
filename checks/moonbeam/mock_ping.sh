cat <<EOF
PING example.com (93.184.216.34) 56(84) bytes of data.
64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=20.1 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=19.8 ms
64 bytes from 93.184.216.34: icmp_seq=3 ttl=56 time=20.3 ms
64 bytes from 93.184.216.34: icmp_seq=4 ttl=56 time=19.9 ms
64 bytes from 93.184.216.34: icmp_seq=5 ttl=56 time=20.2 ms

--- example.com ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 19.761/20.060/20.300/0.193 ms
EOF
