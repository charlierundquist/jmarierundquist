export function sanitizeLink(url: string) {
  if (/(http(s?)):\/\//i.test(url)) {
    return url
  }

  return 'https://' + url
}
