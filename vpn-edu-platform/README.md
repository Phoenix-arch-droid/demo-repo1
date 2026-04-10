# Educational VPN Platform

A complete, runnable **educational VPN platform** that demonstrates how VPN technology works (tunneling, encryption, IP masking, kill switch) while exposing a clean **React dashboard** + **Express API**.

> This repo is designed for learning. It includes **real WireGuard + firewall scripts for Linux** and a safe **Demo mode** fallback for Windows/macOS so students can run the UI and explore the architecture locally.

## Features

- **Connect / Disconnect VPN** (WireGuard in Live mode, simulated in Demo mode)
- **Select server location** (feature is modular and independent)
- **Kill switch** toggle (Linux iptables chain)
- **IP demo** page (before/after public IP sampling)
- **Connection logs** (structured JSONL logs)
- **Visual explanations** (diagram + encrypted tunnel visualization)

## Repo structure

```
vpn-edu-platform
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
├── backend
│   ├── server.js
│   ├── routes
│   ├── controllers
│   ├── services
│   ├── logs
├── vpn
│   ├── wg0.conf
│   ├── client.conf
│   ├── scripts
└── README.md
```

## Quick start (runs locally)

From `vpn-edu-platform/`:

```bash
npm install
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5174`

### Demo mode vs Live mode

- **Demo mode**: Windows/macOS (or when `FORCE_DEMO=1`)  
  The backend **does not run** WireGuard/iptables. It simulates state changes so you can learn the UI + API flow safely.

- **Live mode (Linux)**: When running on Linux with `bash`, `wg-quick`, and `iptables` available  
  The backend executes scripts in `vpn/scripts/` to start/stop WireGuard and enable/disable the kill switch.

## Backend API

Base URL: `http://localhost:5174`

- `POST /vpn/connect`
- `POST /vpn/disconnect`
- `POST /vpn/location` body: `{ "locationId": "us-east" }`
- `POST /vpn/killswitch/on`
- `POST /vpn/killswitch/off`
- `GET /vpn/status`
- `GET /vpn/logs`
- `GET /vpn/ip`

## WireGuard setup (Linux Live mode)

### 1) Install dependencies

On Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y wireguard wireguard-tools iptables
```

### 2) Generate keys (example)

```bash
cd vpn/scripts
chmod +x *.sh
./generate-keys.sh
```

Paste the generated keys into:
- `vpn/wg0.conf` (server example)
- `vpn/client.conf` (client example used by the backend scripts)

### 3) Configure the server (high-level)

On the VPN server machine (not your laptop), install WireGuard and:

- Put `wg0.conf` into `/etc/wireguard/wg0.conf`
- Enable IP forwarding:

```bash
sudo sysctl -w net.ipv4.ip_forward=1
```

Then bring up the server:

```bash
sudo wg-quick up wg0
```

> NAT/masquerade rules vary by environment (cloud/VPS/router). For an educational lab, you can add an iptables MASQUERADE rule on the server’s internet-facing interface.

### 4) Run the client (this project)

On the machine running the backend:

```bash
cd vpn/scripts
./start-vpn.sh
```

To stop:

```bash
./stop-vpn.sh
```

## Kill switch (Linux Live mode)

The kill switch is implemented as an iptables chain inserted into `OUTPUT`.

Enable:

```bash
cd vpn/scripts
./enable-killswitch.sh
```

Disable:

```bash
./disable-killswitch.sh
```

Check:

```bash
./check-killswitch.sh
```

### Kill switch behavior (intended)

- **VPN connected** → outbound traffic allowed via `wg0`
- **VPN disconnected** → outbound traffic blocked (prevents leaks)

## Educational notes

### What a VPN is

A VPN creates a secure tunnel between your device and a VPN server. Your device encrypts traffic, sends it through the tunnel, and the VPN server decrypts and forwards it to the internet.

### IP masking

Websites see the **VPN server’s public IP**, not your device’s public IP.

### Tunnel diagram

```
User  →  Encrypted Tunnel  →  VPN Server  →  Internet
```

## Troubleshooting

- **Backend says Demo mode on Linux**: ensure `bash`, `wg-quick`, and `iptables` are installed and the scripts are executable (`chmod +x vpn/scripts/*.sh`).
- **No internet after enabling kill switch**: run `vpn/scripts/disable-killswitch.sh` (or remove the `VPN_EDU_KILLSWITCH` jump from `OUTPUT`).
- **IP doesn’t change**: routing/DNS/NAT issues are common in VPN labs. Confirm `wg show` and route tables; verify the server’s forwarding + NAT rules.

