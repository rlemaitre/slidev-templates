import { encode } from 'uqr'

// Phones need a scheme to open a scanned URL; slides show it without one.
export function qrTarget(url: string): string {
  return /^[a-z][a-z\d+.-]*:/i.test(url) ? url : `https://${url}`
}

// One 1×1 square per dark module, drawn in currentColor by the caller.
export function qrPath(text: string): { readonly size: number; readonly d: string } {
  const { size, data } = encode(text, { ecc: 'M', border: 0 })
  const d = data
    .flatMap((row, y) => row.map((dark, x) => (dark ? `M${x} ${y}h1v1h-1z` : '')))
    .join('')
  return { size, d }
}
