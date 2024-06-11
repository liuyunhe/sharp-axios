import { isDate, isPlainObject } from './utils'

function enCode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || undefined) {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${enCode(key)}=${enCode(val)}`)
    })
  })

  let serializeParams = parts.join('&')

  if (serializeParams) {
    const maxIndex = url.indexOf('#')
    if (maxIndex !== -1) {
      url = url.slice(0, maxIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
  }

  return url
}
