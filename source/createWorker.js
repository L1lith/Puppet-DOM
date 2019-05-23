const {join} = require("path")
const {writeFile, readFile} = require("mz/fs")
const del = require('del')
const cp = require('@alexbinary/cp')

const buildFolder = join(__dirname, "build")
const templateFolder = join(__dirname, "template")
const timer = require('./functions/timer')
const entryFile = join(buildFolder, "entry.js")

async function createWorker(config={}) {
  const {dependencies=[]} = config
  if (!Array.isArray(dependencies) || dependencies.some(dependency => typeof dependency != 'string')) throw new Error("Dependencies must be an array of strings")
  await del(buildFolder)
  await timer(100)
  await cp(templateFolder, buildFolder)
  let entryFileContents = await readFile(entryFile, "utf8")
  entryFileContents = "const dependencies = {"+ dependencies.map(dependency => `"${dependency}": require("${dependency}")`).join(",") + "}\n" + entryFileContents
  await writeFile(entryFile, entryFileContents)
}

module.exports = createWorker
