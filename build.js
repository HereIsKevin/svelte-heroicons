import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { basename, format, join, resolve } from "node:path"

import camelcase from "camelcase"

const styles = {
  "24/outline": "outline",
  "24/solid": "solid",
  "20/solid": "mini",
}

for (const [directory, style] of Object.entries(styles)) {
  const input = resolve("./node_modules/heroicons/", directory)
  const output = resolve("./", style)

  rmSync(output, { recursive: true, force: true })
  mkdirSync(output, { recursive: true })

  for (const icon of readdirSync(input)) {
    const path = join(input, icon)
    const content = readFileSync(path, "utf-8")
    const component = content.replace(">", " {...$$props}>")

    const name = basename(path, ".svg")
    const pascalcased = camelcase(name, { pascalCase: true })
    const file = format({ dir: output, name: pascalcased, ext: "svelte" })

    writeFileSync(file, component)
  }
}
