const { promises: fs } = require('fs')
const fg = require('fast-glob')
const path = require('path')
const SVGO = require('svgo')
const svgo = new SVGO({
  plugins: [
    { removeXMLNS: true },
    { removeDimensions: true },
    { removeAttrs: { attrs: '(stroke|fill)' } }
  ]
})
const regex = /aria-label=(?:"|')([\w ]+)(?:"|')/
const addAria = (svg, name) =>
  regex.test(svg) ? svg : svg.replace(/<svg/, `<svg aria-label="${name} icon"`)
const dashCaseToLower = str => str.split('-').join(' ').toLowerCase()
exports.cleanSvgs = async ({ src, dest = src }) => {
  try {
    await fs.mkdir(dest, { recursive: true })
    const files = await fg([`${src}/*.svg`])
    await Promise.all(
      files.map(async file => {
        const name = dashCaseToLower(path.basename(file, '.svg').split('.')[0])
        const svg = await fs.readFile(file, 'utf8')
        const { data } = await svgo.optimize(svg)
        await fs.writeFile(file, addAria(data, name))
      })
    )
  } catch (err) {
    console.error(err)
  }
}
