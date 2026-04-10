#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "This script is intended for Linux. (Demo mode on non-Linux.)"
  exit 0
fi

command -v wg-quick >/dev/null 2>&1 || { echo "wg-quick not found. Install wireguard-tools."; exit 1; }

echo "Bringing down wg0..."
sudo wg-quick down wg0 || true

echo "WireGuard wg0 is down."

