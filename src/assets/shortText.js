export function shortText(text) {
  return text.replace(/^(.{60}[^\W]*).*/gm, '$1...')
}
