import { db } from "@/db/db"
import Image from "next/image"
import { Download, Share, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "sonner"
import { ImageDownloadButton } from "@/components/image-download-button"

async function UserImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Fetch image from database
  const res = await db.image
    .findFirst({
      where: {
        id: id,
      },
      select: {
        cdn: true,
        name: true,
        createdAt: true,
      },
    })
    .catch(() => null)

  // Fallback to direct URL if database fetch fails or image not found
  const imageUrl = res?.cdn || `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/images/${id}`
  const imageName = res?.name || `Image-${id}`

  // Format date if available
  const formattedDate = res?.createdAt
    ? new Date(res.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="gap-1 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden bg-background border-muted">
        <CardContent className="p-0">
          <div className="relative aspect-auto min-h-[300px] flex justify-center items-center bg-muted/30">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={imageName}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              priority
            />
          </div>

          <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold mb-1">{imageName}</h1>
              {formattedDate && <p className="text-sm text-muted-foreground">Uploaded on {formattedDate}</p>}
            </div>

            <div className="flex gap-2">
              {/* <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(imageUrl)
                  toast("Url copied")
                }}
              >
                <Share className="h-4 w-4 mr-2" />
                Copy URL
              </Button> */}
              {/* <img src="http://localhost:3000/images/1348699322073481216" alt="Image" /> */}

                <ImageDownloadButton imageName={imageName} imageUrl={imageUrl}/>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Direct Image URL</h2>
        <div className="bg-muted p-4 rounded-md">
          <code className="text-sm break-all">
            {`<img src="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/images/${id}" alt="Image" />`}
          </code>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          You can use this HTML code to embed this image directly on your website.
        </p>
      </div>
    </div>
  )
}

export default UserImage

