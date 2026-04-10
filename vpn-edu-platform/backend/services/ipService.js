export async function getIpSample({ connected, demoMode }) {
  return {
    // Fully mocked to keep the demo self-contained and fast.
    // No external network calls are performed.
    before: { publicIp: '203.0.113.42' },
    after: { publicIp: connected ? '198.51.100.23' : '203.0.113.42' },
    note: demoMode ? 'Demo mode: IP values are simulated to illustrate IP masking.' : 'Live mode: IP values would reflect VPN egress.',
  }
}

