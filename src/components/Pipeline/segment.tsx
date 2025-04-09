interface PipeSegmentProps {
  position: "horizontal" | "vertical"
  color: string
  hasLeftCorner?: boolean
  hasRightCorner?: boolean
  hasTopCorner?: boolean
  hasBottomCorner?: boolean
}

export default function PipeSegment({
  position,
  color,
  hasLeftCorner = false,
  hasRightCorner = false,
  hasTopCorner = false,
  hasBottomCorner = false,
}: PipeSegmentProps) {
  // Determine if we're rendering a horizontal or vertical pipe
  const isHorizontal = position === "horizontal"

  // Set the dimensions based on orientation
  const width = isHorizontal ? "100%" : "100%"
  const height = isHorizontal ? "100%" : "100%"

  return (
    <div className="relative w-full h-full">
      {/* Main pipe */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          borderRadius: "10px",
          border: "2px solid rgba(0,0,0,0.2)",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
          transition: "background-color 0.5s ease",
        }}
      />

      {/* Corner elements */}
      {hasLeftCorner && isHorizontal && (
        <div
          className="absolute left-0 top-0 bottom-0 aspect-square h-full"
          style={{
            backgroundColor: color,
            borderRadius: "50% 0 0 50%",
            border: "2px solid rgba(0,0,0,0.2)",
            borderRight: "none",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
            transition: "background-color 0.5s ease",
          }}
        />
      )}

      {hasRightCorner && isHorizontal && (
        <div
          className="absolute right-0 top-0 bottom-0 aspect-square h-full"
          style={{
            backgroundColor: color,
            borderRadius: "0 50% 50% 0",
            border: "2px solid rgba(0,0,0,0.2)",
            borderLeft: "none",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
            transition: "background-color 0.5s ease",
          }}
        />
      )}

      {hasTopCorner && !isHorizontal && (
        <div
          className="absolute top-0 left-0 right-0 aspect-square w-full"
          style={{
            backgroundColor: color,
            borderRadius: "50% 50% 0 0",
            border: "2px solid rgba(0,0,0,0.2)",
            borderBottom: "none",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
            transition: "background-color 0.5s ease",
          }}
        />
      )}

      {hasBottomCorner && !isHorizontal && (
        <div
          className="absolute bottom-0 left-0 right-0 aspect-square w-full"
          style={{
            backgroundColor: color,
            borderRadius: "0 0 50% 50%",
            border: "2px solid rgba(0,0,0,0.2)",
            borderTop: "none",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
            transition: "background-color 0.5s ease",
          }}
        />
      )}

      {/* Highlight effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)",
          borderRadius: isHorizontal ? "10px" : "10px",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
