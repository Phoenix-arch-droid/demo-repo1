import { spawn } from 'child_process'

export async function runBash({ cwd, scriptPath, args = [], env = {} }) {
  return new Promise((resolve, reject) => {
    const child = spawn('bash', [scriptPath, ...args], {
      cwd,
      env: { ...process.env, ...env },
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (d) => (stdout += d.toString()))
    child.stderr.on('data', (d) => (stderr += d.toString()))
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr })
      else reject(new Error(`Command failed (exit ${code}): ${stderr || stdout}`))
    })
  })
}

