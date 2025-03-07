import type React from "react"

import { useState, useRef } from "react"
import { Upload, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Layout from "./Layout"

export default function WasteClassification() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ text: string; status: "success" | "error" | null }>({
    text: "",
    status: null,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
      setResult({ text: "", status: null })
    }
  }

  const handleUploadClick = async () => {
    if (!fileInputRef.current?.files?.length) {
      setResult({
        text: "Please select an image to upload!",
        status: "error",
      })
      return
    }

    setIsProcessing(true)
    setResult({ text: "", status: null })

    const file = fileInputRef.current.files[0]
    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("http://127.0.0.1:8000/process_image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process image. Please try again.")
      }

      const data = await response.json()
      setResult({
        text: `Classification: ${data.classification}`,
        status: "success",
      })
    } catch (error: any) {
      console.error("Error:", error)
      setResult({
        text: `Error: ${error.message}`,
        status: "error",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Waste Classification
            </CardTitle>
            <CardDescription className="text-lg mt-4">
            Upload an image of waste to classify it into categories such as plastic, paper, organic, metal, or other.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full max-w-md cursor-pointer hover:border-green-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected waste"
                      className="max-h-64 rounded-md object-contain"
                    />
                    <p className="text-sm text-gray-500 mt-2">Click to change image</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center">Click to select an image or drag and drop</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {result.text && (
              <div
                className={`p-4 rounded-md text-center text-lg ${
                  result.status === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {result.text}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center pb-6">
            <Button
              onClick={handleUploadClick}
              className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isProcessing || !selectedImage}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Classify Waste
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}

