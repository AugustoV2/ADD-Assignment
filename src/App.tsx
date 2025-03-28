import React, { useState } from 'react';
import { Calculator, Play, RefreshCw } from 'lucide-react';

function recurrenceSubstitution(n: number, depth = 0): string {
  if (n <= 1) return 'T(1) = O(1)';

  const step = `T(${n}) = 2T(${n}/2) + O(${n})`;
  const expandedStep = `2(${recurrenceSubstitution(n / 2, depth + 1)}) + O(${n})`;

  return depth === 0 ? `${step}\n${expandedStep}` : expandedStep;
}

function App() {
  const [input, setInput] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSolve = () => {
    try {
      const n = Number(input.trim());
      if (isNaN(n) || n <= 0 || !Number.isInteger(n)) {
        throw new Error('Please enter a positive integer');
      }
      const result = recurrenceSubstitution(n);
      setSolution(result);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
      setSolution('');
    }
  };

  const handleReset = () => {
    setInput('');
    setSolution('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Recurrence Relation Solver</h1>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter value of n (positive integer)
            </label>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 8"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={handleSolve}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              Solve
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {solution && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Solution:</h2>
              <pre className="whitespace-pre-wrap font-mono text-sm bg-white p-4 rounded border border-gray-200">
                {solution}
              </pre>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-600">
            <h3 className="font-medium text-gray-700 mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter a positive integer n</li>
              <li>The solver applies the substitution method to solve the recurrence relation</li>
              <li>T(n) = 2T(n/2) + O(n) is recursively expanded</li>
              <li>Base case: T(1) = O(1)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;