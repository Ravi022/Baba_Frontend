import React, { useState, useEffect, useRef } from "react";

export default function Terminal({ terminalOut }) {
  console.log("terminalOut :", terminalOut);

  const [commands, setCommands] = useState(terminalOut);
  const [input, setInput] = useState("");
  const terminalRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the terminal when commands array changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    // Update commands with terminalOut
    if (terminalOut) {
      setCommands((prevCommands) => [...prevCommands, terminalOut]);
    }
  }, [terminalOut]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCommands([...commands, input]);
      setInput("");
    }
  };

  return (
    <div className="bg-gray-900 text-green-400 font-mono h-[86vh]">
      <div
        className="bg-gray-800 p-4 rounded-lg shadow-md h-full overflow-y-scroll"
        ref={terminalRef} // Attach the ref here to the container holding the commands
      >
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white">Terminal</h1>
          <p className="text-gray-400">Type your commands below</p>
        </div>
        <div className="h-[80%] overflow-y-auto">
          {commands.map((cmd, index) => (
            <div key={index} className="flex items-start">
              <span className="text-green-500">$</span>
              <p className="ml-2 whitespace-pre-wrap">{cmd}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleCommandSubmit} className="mt-4">
          <div className="flex items-center">
            <span className="text-green-500">$</span>
            <input
              type="text"
              className="flex-grow ml-2 bg-transparent text-white outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          </div>
        </form>
      </div>
    </div>
  );
}
