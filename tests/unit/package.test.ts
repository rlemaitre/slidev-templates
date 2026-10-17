import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, test } from 'vitest'

const ROOT = resolve(__dirname, '../..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
// Provided by Slidev itself to every theme (it aliases them for the app).
const PROVIDED_BY_SLIDEV = new Set(['vue', '@slidev/client'])

function files(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}

function packageName(spec: string): string {
  const parts = spec.split('/')
  return spec.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
}

describe('package.json', () => {
  test('every runtime import in shipped files is a declared dependency or peer', () => {
    const shipped = (pkg.files as string[]).flatMap(dir => files(join(ROOT, dir)))
      .filter(f => /\.(ts|vue)$/.test(f))
    const declared = new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})])
    const missing = shipped.flatMap(file => {
      const source = readFileSync(file, 'utf8')
      return [...source.matchAll(/^import\s+(?!type\b)(?:[^'"]*from\s+)?'([^'.][^']*)'/gm)]
        .map(([, spec]) => packageName(spec))
        .filter(name => !PROVIDED_BY_SLIDEV.has(name) && !declared.has(name))
        .map(name => `${file.replace(ROOT, '')}: ${name}`)
    })
    expect(missing).toEqual([])
  })

  test('shipped theme files carry no author attribution (it lives in package.json, LICENSE and README)', () => {
    const shipped = (pkg.files as string[]).flatMap(dir => files(join(ROOT, dir))).filter(f => /\.(ts|vue|css)$/.test(f))
    const hits = shipped.filter(file => /rlemaitre|lemaitre|rapha[eë]l/i.test(readFileSync(file, 'utf8')))
    expect(hits.map(f => f.replace(ROOT, ''))).toEqual([])
  })
})
