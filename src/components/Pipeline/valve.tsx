export default function Valve() {
  return (
    <div className="relative w-full h-full">
      {/* Main valve body */}
      <div
        className="absolute inset-0 bg-red-600 rounded-md transform rotate-45 shadow-md"
        style={{
          boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.3)",
        }}
      ></div>

      {/* Valve handle */}
      <div
        className="absolute left-1/2 top-0 w-2 h-6 bg-gray-800 transform -translate-x-1/2 -translate-y-4 rounded-t-md"
        style={{
          boxShadow: "0 -1px 2px rgba(0,0,0,0.3)",
        }}
      ></div>

      {/* Valve center */}
      <div
        className="absolute inset-[15%] bg-red-700 rounded-sm transform rotate-45"
        style={{
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
        }}
      ></div>

      {/* Valve highlights */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-transparent opacity-50 rounded-md transform rotate-45"></div>

      {/* Valve bolts */}
      {[45, 135, 225, 315].map((angle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gray-300 rounded-full"
          style={{
            top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 40}%)`,
            left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 40}%)`,
            transform: "translate(-50%, -50%)",
            boxShadow: "inset 0 1px 1px rgba(0,0,0,0.3)",
          }}
        ></div>
      ))}
    </div>
  )
}
