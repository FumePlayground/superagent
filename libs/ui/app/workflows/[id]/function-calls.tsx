import React from "react"

interface CompileReportProps {
  // Define props here if needed
}

function CompileReport({}: CompileReportProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-primary/70">Compile Report</h3>
      <div className="text-sm text-gray-600">
        <p>This section provides a detailed compilation report of the workflow.</p>
      </div>
      <div className="text-sm text-gray-600">
        <h4 className="text-primary/70">Company Profile</h4>
        <p>Details about the company including name, location, and sector.</p>
      </div>
      <div className="text-sm text-gray-600">
        <h4 className="text-primary/70">Founder Backgrounds</h4>
        <p>Insights into the founders' backgrounds, experiences, and roles within the company.</p>
      </div>
      <div className="text-sm text-gray-600">
        <h4 className="text-primary/70">Business Operations</h4>
        <p>Overview of day-to-day operations and business strategies.</p>
      </div>
      <div className="text-sm text-gray-600">
        <h4 className="text-primary/70">Summary</h4>
        <p>This section summarizes the key points and outcomes from the compilation process.</p>
      </div>
      {/* Additional component content will go here */}
    </div>
  )
}

interface FunctionCallsProps {
  functionCalls?: any[]
}

function FunctionCalls({ functionCalls }: FunctionCallsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-primary/70">Run Logs</h3>

      {functionCalls?.map((call, index) => (
        <div key={index} className="flex flex-row items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          {call?.type == "function_call" && (
            <div className="flex-1 truncate">
              <span className="font-mono text-sm font-normal text-muted-foreground">
                TOOL: {call.function}
              </span>
            </div>
          )}
          {call?.type == "start" && (
            <span className="font-mono text-sm font-normal text-muted-foreground">
              INPUT
            </span>
          )}
          {call?.type == "end" && (
            <span className="font-mono text-sm font-normal text-muted-foreground">
              OUTPUT
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default FunctionCalls
