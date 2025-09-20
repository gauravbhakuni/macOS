// hooks/useImagePreloader.js
import { useState, useEffect } from "react"

export function useImagePreloader(imageUrls = []) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (imageUrls.length === 0) {
      setLoaded(true)
      return
    }

    let loadedCount = 0
    const imageObjects = []

    imageUrls.forEach((url) => {
      const img = new Image()
      img.src = url
      img.onload = img.onerror = () => {
        loadedCount++
        if (loadedCount === imageUrls.length) {
          setLoaded(true)
        }
      }
      imageObjects.push(img)
    })

    return () => {
      imageObjects.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
    }
  }, [imageUrls])

  return loaded
}
