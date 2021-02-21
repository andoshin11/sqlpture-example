const fs = require('fs')
const path = require('path')

async function main() {
  const dbSchema = fs.readFileSync(path.resolve(__dirname, '../src/types/db/schema.ts'), 'utf-8')
  const lines = dbSchema.split('\n')
  const interfaces = lines.filter(l => l.startsWith('export interface ')).map(i => i.replace(/^export interface ([^{]*) {\r/, '$1')).sort()
  const output = `import * as schema from './schema'

export type DB = {
  dialect: 'postgres';
  schema: {
    ${ interfaces.map(i => `${i}: schema.${i}`).join('\n\t\t') }
  }
}\n`
  fs.writeFileSync(path.resolve(__dirname, '../src/types/db/index.ts'), output)
}

main()
