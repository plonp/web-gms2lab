import { useState, useCallback } from 'react'

export function useCopy(timeout = 1500) {
  const [copiedId, setCopiedId] = useState(null)
  const copy = useCallback((text, id = true) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), timeout)
  }, [timeout])
  return [copiedId, copy]
}
