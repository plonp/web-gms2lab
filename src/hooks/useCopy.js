import { useState } from 'react'

export function useCopy(timeout = 1500) {
  const [copied, setCopied] = useState(null)
  const copy = (text, id = true) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), timeout)
  }
  return [copied, copy]
}

