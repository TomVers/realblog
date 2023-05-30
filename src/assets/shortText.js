export function shortText(text, maxLength = 60) {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.slice(0, maxLength) + '...'
  }
}
