"use client"

import { useState, useEffect } from "react"
import PipelineSystem from "./system"

// Define the possible pipe statuses
export type PipeStatus = "OK" | "CRACK"
export type PipeSegmentId = "top" | "right" | "bottom" | "left"

// Interface for pipe segment data
export interface PipeSegmentData {
  id: PipeSegmentId
  status: PipeStatus
  color: string
}

// Mock function that would be replaced with your actual status checking function
const checkPipeStatus = (): Record<PipeSegmentId, PipeStatus> => {
  // This is a placeholder. Replace with your actual status checking logic
  return {
    top: "OK",
    right: "OK",
    bottom: "OK",
    left: "OK",
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

  // Function to update pipe color based on segment ID
  const updatePipeColor = (segment: PipeSegmentId, color: string) => {
    setPipeSegments((prevSegments) => prevSegments.map((pipe) => (pipe.id === segment ? { ...pipe, color } : pipe)))
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

  // Function to update all pipe statuses at once
  const updateAllPipeStatuses = (statuses: Record<PipeSegmentId, PipeStatus>) => {
    setPipeSegments((prevSegments) =>
      prevSegments.map((pipe) => {
        const status = statuses[pipe.id]
        const newColor = status === "CRACK" ? "#FF0000" : "#FFD700"
        return { ...pipe, status, color: newColor }
      }),
    )
  }

  // This effect would be where you integrate your actual status checking
  useEffect(() => {
    // This is where you would integrate your interval function
    // that checks the status of each pipe segment
    // Example of how you might use it:
    // const interval = setInterval(() => {
    //   const statuses = checkPipeStatus()
    //   updateAllPipeStatuses(statuses)
    // }, 5000)
    // return () => clearInterval(interval)
  }, [])

  return (
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
            <div className="mt-3 flex justify-center space-x-2">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
