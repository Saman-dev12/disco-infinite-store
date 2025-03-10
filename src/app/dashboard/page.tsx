"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Copy, Trash2, Upload, ImageIcon, X, Check } from "lucide-react"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"

interface FileSchema{
  id : string,
  name:string,
  cdn:string,
  createdAt:Date
}

export default function DashboardPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<FileSchema[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // In a real app, you would upload the file to Discord here
      // For now, we'll just add it to our local state
      const newFile = {
        id: (uploadedFiles.length + 1).toString(),
        name: selectedFile.name,
        cdn: "/placeholder.svg?height=400&width=400", // Placeholder for the actual Discord CDN URL
        createdAt: new Date(),
      }

      setUploadedFiles([newFile, ...uploadedFiles])
      setSelectedFile(null)
      setIsUploadModalOpen(false)
    }
  }

  const handleDelete = (id: string) => {
    // In a real app, you would delete the file from Discord here
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="w-[100%]">
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Files</h1>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      </div>

      {uploadedFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Files uploaded yet</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            Upload your first image to get started. Your Files will appear here.
          </p>
          <Button onClick={() => setIsUploadModalOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedFiles.map((file) => (
            <Card key={file.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image src={file.cdn || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => copyToClipboard(file.cdn, file.id)}
                    className="h-9 w-9"
                  >
                    {copiedId === file.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(file.id)} className="h-9 w-9">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{file.createdAt.toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>Upload an image to store on Discord CDN</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedFile ? (
              <div className="relative border rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="mb-1 font-medium">Drag and drop your image here</p>
                <p className="text-xs text-muted-foreground mb-4">Supports: JPG, PNG, GIF (max 8MB)</p>
                <Input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <label htmlFor="file-upload">
                  <Button variant="secondary" className="cursor-pointer" asChild>
                    <span>Select Image</span>
                  </Button>
                </label>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
    </div>
  )
}

