#!/usr/bin/env bash
set -euo pipefail

# Starts WireGuard on the machine running the backend.
# This expects a Linux environment with wg-quick installed.

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "This script is intended for Linux. (Demo mode on non-Linux.)"
  exit 0
fi

command -v wg-quick >/dev/null 2>&1 || { echo "wg-quick not found. Install wireguard-tools."; exit 1; }

CONF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLIENT_CONF="$CONF_DIR/client.conf"

if [[ ! -f "$CLIENT_CONF" ]]; then
  echo "Missing client.conf at $CLIENT_CONF"
  exit 1
fi

echo "Installing client.conf as /etc/wireguard/wg0.conf..."
sudo install -m 600 "$CLIENT_CONF" /etc/wireguard/wg0.conf

echo "Bringing up wg0..."
sudo wg-quick up wg0

echo "WireGuard wg0 is up."

