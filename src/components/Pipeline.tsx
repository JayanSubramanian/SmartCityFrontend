"use client"

import Layout from "./Layout"
import { useState, useEffect } from "react"
import PipelineSystem from "./Pipeline/system"
import Toast from "./Pipeline/toast"

// Define the possible pipe statuses
export type PipeStatus = "OK" | "CRACK"
export type PipeSegmentId = "top" | "right" | "bottom" | "left"

// Interface for pipe segment data
export interface PipeSegmentData {
  id: PipeSegmentId
  status: PipeStatus
  color: string
}

// Interface for API response
interface CrackResponse {
  id: string
  has_crack: boolean
}

// Map API ID to pipe segment ID
const mapApiIdToSegmentId = (apiId: string): PipeSegmentId => {
  // Customize this mapping based on your API's ID system
  switch (apiId) {
    case "1":
      return "top"
    case "2":
      return "right"
    case "3":
      return "bottom"
    case "4":
      return "left"
    default:
      return "top" // Default fallback
  }
}

export default function PipelineMonitor() {
  // Initialize pipe segments with default values
  const [pipeSegments, setPipeSegments] = useState<PipeSegmentData[]>([
    { id: "top", status: "OK", color: "#FFD700" }, // Yellow
    { id: "right", status: "OK", color: "#FFD700" }, // Yellow
    { id: "bottom", status: "OK", color: "#FFD700" }, // Yellow
    { id: "left", status: "OK", color: "#FFD700" }, // Yellow
  ])

  // Toast state
  const [toast, setToast] = useState<{
    visible: boolean
    message: string
    type: "success" | "error"
  }>({
    visible: false,
    message: "",
    type: "success",
  })

  // Function to show toast
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ visible: true, message, type })
  }

  // Function to hide toast
  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }))
  }

  // Function to update pipe status
  const updatePipeStatus = (segment: PipeSegmentId, status: PipeStatus) => {
    setPipeSegments((prevSegments) =>
      prevSegments.map((pipe) => {
        if (pipe.id === segment) {
          const newColor = status === "CRACK" ? "#FF0000" : "#FFD700" // Red for CRACK, Yellow for OK
          return { ...pipe, status, color: newColor }
        }
        return pipe
      }),
    )
  }

  // Function to check pipe status from API
  const checkPipeStatus = async () => {
    try {
      const response = await fetch("http://localhost:8000/crack_result")
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data: CrackResponse = await response.json()

      // Map API ID to our segment ID
      const segmentId = mapApiIdToSegmentId(data.id)

      // Update the specific pipe segment
      updatePipeStatus(segmentId, data.has_crack ? "CRACK" : "OK")

      // Show success toast notification
      showToast(`Pipeline data updated: ${segmentId} segment is ${data.has_crack ? "cracked" : "normal"}`, "success")

      return {
        [segmentId]: data.has_crack ? "CRACK" : "OK",
      } as Partial<Record<PipeSegmentId, PipeStatus>>
    } catch (error) {
      console.error("Error fetching crack data:", error)
      // Show error toast notification
      showToast("Failed to update pipeline data", "error")
      return {} as Record<PipeSegmentId, PipeStatus>
    }
  }

  // Set up polling interval to check pipe status
  useEffect(() => {
    // Initial check
    checkPipeStatus()

    // Set up interval to poll every 12 seconds
    const intervalId = setInterval(async () => {
      await checkPipeStatus()
    }, 12000)

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Layout>
      <div className="space-y-8">
        <div className="relative aspect-square w-full max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
          <PipelineSystem pipeSegments={pipeSegments} />
        </div>

        {/* Status display and controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {pipeSegments.map((segment) => (
            <div
              key={segment.id}
              className="p-4 rounded-md shadow-sm"
              style={{
                backgroundColor: segment.color === "#FF0000" ? "#FFEEEE" : "#FFFFEE",
                borderLeft: `4px solid ${segment.color}`,
              }}
            >
              <p className="font-medium capitalize">{segment.id} Segment</p>
              <p className="text-sm mt-1">
                Status: <span className="font-bold">{segment.status}</span>
              </p>
              {/* <div className="mt-3 flex justify-center space-x-2">
                <button
                  className="px-3 py-1 text-xs rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                  onClick={() => updatePipeStatus(segment.id, "OK")}
                >
                  Set OK
                </button>
                <button
                  className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                  onClick={() => updatePipeStatus(segment.id, "CRACK")}
                >
                  Set CRACK
                </button>
              </div> */}
            </div>
          ))}
        </div>

        {/* Toast notification */}
        <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
      </div>
    </Layout>
  )
}
