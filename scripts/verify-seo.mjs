import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../out/', import.meta.url))
const errors = []

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(path))
    else if (entry.name.endsWith('.html') && !['200.html', '404.html', '_not-found.html', 'googlecbd8cccd08774ec4.html'].includes(entry.name)) files.push(path)
  }
  return files
}

const files = await walk(ROOT)
for (const file of files) {
  const html = await readFile(file, 'utf8')
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? ''
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1]?.trim() ?? ''
  const route = `/${file.replace(`${ROOT}/`, '').replace(/\.html$/, '')}`
  if (!title) errors.push(`${route}: title manquant`)
  if (title.length > 70) errors.push(`${route}: title trop long (${title.length})`)
  if (title.length < 20) errors.push(`${route}: title trop court (${title.length})`)
  if (!description) errors.push(`${route}: meta description manquante`)
  if (/bttspredict\.com|BttsPredict/i.test(`${title} ${description}`)) errors.push(`${route}: ancienne marque ou ancien domaine`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`[SEO] ${files.length} pages vérifiées, aucune violation.`)
