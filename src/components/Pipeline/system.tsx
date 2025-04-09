import type { PipeSegmentData } from "./monitor"
import Valve from "./valve"

interface PipelineSystemProps {
  pipeSegments: PipeSegmentData[]
}

export default function PipelineSystem({ pipeSegments }: PipelineSystemProps) {
  // Get colors for each segment
  const getColor = (id: string) => {
    const segment = pipeSegments.find((seg) => seg.id === id)
    return segment ? segment.color : "#FFD700" // Default to yellow
  }

  // Calculate dimensions
  const svgSize = 400
  const pipeWidth = 20
  const cornerRadius = 30
  const padding = 50

  // Calculate positions
  const innerStart = padding
  const innerEnd = svgSize - padding
  const pipeCenter = pipeWidth / 2

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox={`0 0 ${svgSize} ${svgSize}`} preserveAspectRatio="xMidYMid meet">
        {/* Top Pipe */}
        <g>
          {/* Left Corner */}
          <path
            d={`
              M ${innerStart + cornerRadius} ${innerStart}
              Q ${innerStart} ${innerStart} ${innerStart} ${innerStart + cornerRadius}
            `}
            stroke={getColor("top")}
            strokeWidth={pipeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />

          {/* Straight Section */}
          <line
            x1={innerStart + cornerRadius}
            y1={innerStart}
            x2={innerEnd - cornerRadius}
            y2={innerStart}
            stroke={getColor("top")}
            strokeWidth={pipeWidth}
            strokeLinecap="round"
            className="transition-all duration-500"
          />

          {/* Right Corner */}
          <path
            d={`
              M ${innerEnd - cornerRadius} ${innerStart}
              Q ${innerEnd} ${innerStart} ${innerEnd} ${innerStart + cornerRadius}
            `}
            stroke={getColor("top")}
            strokeWidth={pipeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </g>

        {/* Right Pipe */}
        <g>
          {/* Top Corner already covered by top pipe */}

          {/* Straight Section */}
          <line
            x1={innerEnd}
            y1={innerStart + cornerRadius}
            x2={innerEnd}
            y2={innerEnd - cornerRadius}
            stroke={getColor("right")}
            strokeWidth={pipeWidth}
            strokeLinecap="round"
            className="transition-all duration-500"
          />

          {/* Bottom Corner */}
          <path
            d={`
              M ${innerEnd} ${innerEnd - cornerRadius}
              Q ${innerEnd} ${innerEnd} ${innerEnd - cornerRadius} ${innerEnd}
            `}
            stroke={getColor("right")}
            strokeWidth={pipeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </g>

        {/* Bottom Pipe */}
        <g>
          {/* Right Corner already covered by right pipe */}

          {/* Straight Section */}
          <line
            x1={innerEnd - cornerRadius}
            y1={innerEnd}
            x2={innerStart + cornerRadius}
            y2={innerEnd}
            stroke={getColor("bottom")}
            strokeWidth={pipeWidth}
            strokeLinecap="round"
            className="transition-all duration-500"
          />

          {/* Left Corner */}
          <path
            d={`
              M ${innerStart + cornerRadius} ${innerEnd}
              Q ${innerStart} ${innerEnd} ${innerStart} ${innerEnd - cornerRadius}
            `}
            stroke={getColor("bottom")}
            strokeWidth={pipeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </g>

        {/* Left Pipe */}
        <g>
          {/* Bottom Corner already covered by bottom pipe */}

          {/* Straight Section */}
          <line
            x1={innerStart}
            y1={innerEnd - cornerRadius}
            x2={innerStart}
            y2={innerStart + cornerRadius}
            stroke={getColor("left")}
            strokeWidth={pipeWidth}
            strokeLinecap="round"
            className="transition-all duration-500"
          />

          {/* Top Corner already covered by top pipe */}
        </g>

        {/* Valve on bottom pipe */}
        <g transform={`translate(${svgSize / 2}, ${innerEnd - pipeCenter})`}>
          <foreignObject width="40" height="40" x="-20" y="-20">
            <Valve />
          </foreignObject>
        </g>

        {/* Add some depth with highlights */}
        <defs>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
            <feComposite in="SourceAlpha" in2="offsetBlur" operator="out" result="compOut" />
            <feComposite in="SourceGraphic" in2="compOut" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
