import { useState } from 'react'
import './App.css'

function App() {
  
  const [formData, setFormData] = useState({
    age: '',
    credit_amount: '',
    month_duration: '',
    status_account: '< 0 DM'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(false);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(formData.age),
          credit_amount: parseInt(formData.credit_amount),
          month_duration: parseInt(formData.month_duration),
          status_account: formData.status_account
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setResult(data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Score ke mutabiq dynamic color nikalne ke liye helper
  const getScoreColor = (score) => {
    if (score >= 750) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 650) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden grid md:grid-cols-12">
        
        {/* Left Side: Form Panel */}
        <div className="p-8 md:col-span-7">
          <div className="mb-6">
            <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">Risk Analytics</span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Credit Scoring Assessment</h1>
            <p className="text-sm text-slate-500 mt-1">Enter applicant details to evaluate financial risk indicators.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="e.g. 32" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">Duration (Months)</label>
                <input type="number" name="month_duration" value={formData.month_duration} onChange={handleChange} required placeholder="e.g. 12" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">Credit Amount (DM)</label>
              <input type="number" name="credit_amount" value={formData.credit_amount} onChange={handleChange} required placeholder="e.g. 5000" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">Checking Account Status</label>
              <select name="status_account" value={formData.status_account} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                <option value="< 0 DM">&lt; 0 DM (Negative Balance)</option>
                <option value="0 to < 200 DM">0 to &lt; 200 DM (Low Balance)</option>
                <option value="no checking account">No Checking Account</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-2 flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 transition-colors">
              {loading ? 'Evaluating Protocol...' : 'Run Credit Analysis'}
            </button>
          </form>
        </div>

        {/* Right Side: Decision & Insights Panel */}
        <div className="bg-slate-900 p-8 md:col-span-5 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-800 text-white">
          {!result && !error && !loading && (
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400 font-mono text-lg">i</div>
              <p className="text-sm text-slate-400 font-medium">Awaiting Execution</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Fill out the parameters on the left pane and execute analytics to review financial scoring indicators.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
              <p className="text-sm text-slate-400 animate-pulse">Running risk evaluation models...</p>
            </div>
          )}

          {error && (
            <div className="text-center p-4 bg-rose-950/40 border border-rose-900/50 rounded-xl text-rose-300">
              <p className="text-sm font-semibold">API Connection Failure</p>
              <p className="text-xs text-rose-400/80 mt-1">Verify if Flask application is actively listening on Port 5000.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Analysis Output</span>
                <h3 className="text-xl font-bold mt-1">Decision Summary</h3>
              </div>

              {/* Score Metric Card */}
              <div className={`p-4 rounded-xl border text-center transition-all ${getScoreColor(result.credit_score)}`}>
                <span className="text-xs font-bold tracking-widest uppercase opacity-80">Computed Credit Score</span>
                <div className="text-4xl font-extrabold tracking-tight my-1">{result.credit_score}</div>
                <div className="text-sm font-semibold">Classification: {result.credit_risk} Risk</div>
              </div>

              {/* Progress/Gauge Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Risk Scale</span>
                  <span className="font-semibold">{result.credit_score} / 850</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${result.credit_risk === 'Good' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: `${(result.credit_score / 850) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center border-t border-slate-800 pt-4">
                <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                  {result.message}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );

}

export default App
