"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
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
import { Copy, Trash2, Upload, ImageIcon, X, Check, Heart } from "lucide-react"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"


interface Fileschema{
  id : string,
  name:string,
  cdn:string,
  createdAt:Date
}

export default function DashboardPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<Fileschema[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [imageData,setImageData] = useState<string>()

  const inputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUri = reader.result;
        setImageData(imageDataUri as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useEffect(()=>{
    getAllFiles()
  },[])

  async function getAllFiles(){
    try{

      const res = await fetch("/api/getAllFiles");
      const data = await res.json();
      
      setUploadedFiles(data.Files)
    }catch(error:any){
      toast.error("Cannot fetch your Files")
    }
  }

  const handleUpload = async() => {
    if (selectedFile) {
      const formdata = new FormData()
      formdata.append("file", selectedFile)
      console.log(selectedFile)

      const res = await fetch("/api/upload", {
      method: "POST",
      body: formdata,
      })

      const data = await res.json()

      toast(data.message)

      await getAllFiles()
    
      setSelectedFile(null)
      setIsUploadModalOpen(false)
    }
  }

  const handleDelete = async(id: string) => {
    const res = await fetch(`/api/delete?id=${id}`,{
      method:"DELETE"
    })

    const data = await res.json();

    toast(data.message)

   await getAllFiles()

  }

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/images/${encodeURI(id)}`)
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
          {uploadedFiles.slice(0).reverse().map((file) => (
            
            <Card key={file.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image src={file.cdn || "/placeholder.svg"} alt={file.name} fill className="object-contain" />
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
                  <Button 
                  className="h-9 w-9"
                  size="icon"
                  variant="secondary"
                  >
                    <Heart className="h-4 w-4"/>
                  </Button>
                </div>
              </div>
              <Link href={`/${file.id}`}>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{new Date(file.createdAt).toLocaleDateString()}</p>
                </div>
              </CardContent>
              </Link>
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
              <>
              <div className="relative border rounded-lg p-2">
                <div className="flex flex-col items-center gap-2">
                <Image
                src={imageData || "/placeholder.svg"}
                alt="Uploaded"
                className="w-full h-64 object-contain border rounded-lg overflow-hidden cursor-pointer"
                width={400}
                height={200}
                onClick={() => inputRef.current?.click()}
              /> 
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{selectedFile.name.slice(0,20)}...</p>
                    <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="mb-1 font-medium">Drag and drop your image here</p>
                <p className="text-xs text-muted-foreground mb-4">Supports: JPG, PNG, GIF (max 8MB)</p>
                <Input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <Label htmlFor="file-upload">
                  <Button variant="secondary" className="cursor-pointer" asChild>
                  <span>Select Image</span>
                  </Button>
                </Label>
                
                </div>
                
              </>
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

