#!/usr/bin/env bash
set -euo pipefail

echo "Generating WireGuard keys..."
command -v wg >/dev/null 2>&1 || { echo "wg not found. Install wireguard-tools first."; exit 1; }

umask 077
wg genkey | tee client_private.key | wg pubkey > client_public.key
wg genkey | tee server_private.key | wg pubkey > server_public.key

echo
echo "Wrote:"
echo "  - client_private.key / client_public.key"
echo "  - server_private.key / server_public.key"
echo
echo "Next: paste keys into wg0.conf and client.conf."

