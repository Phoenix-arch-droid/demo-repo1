#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "NOT_SUPPORTED"
  exit 0
fi

CHAIN="VPN_EDU_KILLSWITCH"

if sudo iptables -S OUTPUT 2>/dev/null | grep -q -- "-j $CHAIN"; then
  echo "ENABLED"
else
  echo "DISABLED"
fi

