export function dashify(str?: string) {
  if (!str) return

  return finalize(convertCamelCase(convertExceptions(prep(str))))
}

function prep(str: string) {
  return str.trim()
}

function convertExceptions(str: string) {
  const dashifyNumbers = str
    .replace(/([a-z])([0-9]+)/g, '$1-$2')
    .replace(/([0-9])([a-z])/g, '$1-$2')

  const avoidXAbbreviation = dashifyNumbers.replace(
    /(x)([A-Z])/g,
    (_match, p1, p2) => p1 + p2.toLowerCase()
  )

  return avoidXAbbreviation
}

function convertCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
}

function finalize(str: string) {
  return str.toLowerCase()
}
