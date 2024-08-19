import React, { useState, useEffect, useRef } from "react";

export default function Terminal() {
  const initialCommands = [
    "[http-missing-security-headers:permissions-policy] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:clear-site-data] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:cross-origin-embedder-policy] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:cross-origin-resource-policy] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:content-security-policy] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:x-frame-options] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:x-content-type-options] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:x-permitted-cross-domain-policies] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:referrer-policy] [http] [info] https://organization-frontend.vercel.app/",
    "[http-missing-security-headers:cross-origin-opener-policy] [http] [info] https://organization-frontend.vercel.app/",
    "                     __     _",
    "   ____  __  _______/ /__  (_)",
    "  / __ \\/ / / / ___/ / _ \\/ /",
    " / / / / /_/ / /__/ /  __/ /",
    "/_/ /_/\\__,_/\\___/_/\\___/_/   v3.3.1",
    "",
    "        projectdiscovery.io",
    "",
    "[INF] Current nuclei version: v3.3.1 (latest)",
    "[INF] Current nuclei-templates version: v9.9.3 (latest)",
    "[WRN] Scan results upload to cloud is disabled.",
    "[INF] New templates added in latest release: 56",
    "[INF] Templates loaded for current scan: 677",
    "[INF] Executing 677 signed templates from projectdiscovery/nuclei-templates",
    "[INF] Targets loaded for current scan: 1",
    "[INF] Templates clustered: 228 (Reduced 201 Requests)",
  ];

  const [commands, setCommands] = useState();
  const [input, setInput] = useState("");
  const terminalRef = useRef(null);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCommands([...commands, input]);
      setInput("");
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the terminal when commands array changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <div className="bg-gray-900 text-green-400  font-mono h-[86vh]">
      <div
        className="bg-gray-800 p-4 rounded-lg shadow-md h-full overflow-y-scroll"
        ref={terminalRef} // Reference to the terminal container
      >
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white">Terminal</h1>
          <p className="text-gray-400">Type your commands below</p>
        </div>
        {/* <div className="h-[80%] overflow-y-auto">
          {commands.map((cmd, index) => (
            <div key={index} className="flex items-start">
              <span className="text-green-500">$</span>
              <p className="ml-2 whitespace-pre-wrap">{cmd}</p>
            </div>
          ))}
        </div> */}
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
