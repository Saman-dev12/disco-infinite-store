// "use client"

// import { useState } from "react"
// import { Download } from "lucide-react"
// import { Button } from "@/components/ui/button"

// interface ImageDownloadButtonProps {
//   imageUrl: string
//   imageName: string
// }

// export function ImageDownloadButton({ imageUrl, imageName }: ImageDownloadButtonProps) {
//   const [isDownloading, setIsDownloading] = useState(false)

//   const handleDownload = async () => {
//     try {
//       setIsDownloading(true)

//       const link = document.createElement("a")
//       link.href = imageUrl
//       link.download = imageName || "image.jpg"
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     } catch (error) {
//       console.error("Download failed:", error)
//     } finally {
//       setIsDownloading(false)
//     }
//   }

//   return (
//     <Button onClick={handleDownload} disabled={isDownloading}>
//       <Download className="h-4 w-4 mr-2" />
//       {isDownloading ? "Downloading..." : "Download"}
//     </Button>
//   )
// }

"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageDownloadButtonProps {
  imageUrl: string
  imageName: string
}

export function ImageDownloadButton({ imageUrl, imageName }: ImageDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      // Fetch the image as a Blob
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      // Create a temporary URL
      const blobUrl = URL.createObjectURL(blob)

      // Create a hidden <a> element to trigger the download
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = imageName || "image.jpg"
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={isDownloading}>
      <Download className="h-4 w-4 mr-2" />
      {isDownloading ? "Downloading..." : "Download"}
    </Button>
  )
}
