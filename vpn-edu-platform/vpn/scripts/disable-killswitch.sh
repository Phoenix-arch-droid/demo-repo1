#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "This script is intended for Linux. (Demo mode on non-Linux.)"
  exit 0
fi

command -v iptables >/dev/null 2>&1 || { echo "iptables not found."; exit 1; }

CHAIN="VPN_EDU_KILLSWITCH"

echo "Disabling kill switch..."

# Remove jump from OUTPUT (if present)
while sudo iptables -C OUTPUT -j "$CHAIN" 2>/dev/null; do
  sudo iptables -D OUTPUT -j "$CHAIN"
done

# Remove chain
sudo iptables -F "$CHAIN" 2>/dev/null || true
sudo iptables -X "$CHAIN" 2>/dev/null || true

echo "Kill switch disabled."

