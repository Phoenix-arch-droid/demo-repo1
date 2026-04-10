#!/usr/bin/env bash
set -euo pipefail

# Educational kill switch:
# - Blocks outbound traffic unless it's going out via wg0 (VPN) or loopback
# - Allows established/related connections
# Implemented as an iptables chain inserted into OUTPUT.

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "This script is intended for Linux. (Demo mode on non-Linux.)"
  exit 0
fi

command -v iptables >/dev/null 2>&1 || { echo "iptables not found."; exit 1; }

VPN_IFACE="${VPN_IFACE:-wg0}"
CHAIN="VPN_EDU_KILLSWITCH"

echo "Enabling kill switch on interface: $VPN_IFACE"

sudo iptables -N "$CHAIN" 2>/dev/null || true
sudo iptables -F "$CHAIN"

# Allow loopback
sudo iptables -A "$CHAIN" -o lo -j ACCEPT

# Allow VPN interface
sudo iptables -A "$CHAIN" -o "$VPN_IFACE" -j ACCEPT

# Allow established traffic
sudo iptables -A "$CHAIN" -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Drop everything else
sudo iptables -A "$CHAIN" -j DROP

# Ensure chain is referenced from OUTPUT (insert at top if missing)
if ! sudo iptables -C OUTPUT -j "$CHAIN" 2>/dev/null; then
  sudo iptables -I OUTPUT 1 -j "$CHAIN"
fi

echo "Kill switch enabled."

