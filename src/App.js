import React from "react";
import GSTCalculator from "./components/GSTCalculator";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6">
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <span className="font-bold text-xl">GST</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Calculator</h1>
          </div>
          <div className="text-sm text-gray-500">
            Made with React & Tailwind CSS
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <GSTCalculator />
      </main>

      <footer className="mt-12 max-w-4xl mx-auto text-center text-gray-600 text-sm">
        <p className="mb-2">GST Rate Calculator &copy; {new Date().getFullYear()}</p>
        <p>A simple tool to calculate GST amounts with various rate options</p>
      </footer>
    </div>
  );
}

export default App;