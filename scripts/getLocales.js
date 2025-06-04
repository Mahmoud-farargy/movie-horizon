import { fileURLToPath } from "url"
import fs from "fs"
import path from "path"
// NOTE: to refresh the generated locales to be in sync with the JSON files inside the locales folder,
// run the command: npm run prebuild

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, "..", "/internationalization/locales")
const files = fs.readdirSync(localesDir)

const locales = files
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/\.json$/, ""))

fs.writeFileSync(
  path.join(__dirname, "..", "/internationalization/locales.generated.json"),
  JSON.stringify(locales, null, 2)
)
