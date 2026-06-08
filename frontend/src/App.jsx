import { useState,useEffect } from 'react'
import './App.css'


function App() {

 const OPTION_MAPS = {
  status_account: [
    { value: 0, label: "0 to < 200 DM (Moderate Balance)" },
    { value: 1, label: "< 0 DM (Negative Balance)" },
    { value: 2, label: ">= 200 DM (High Balance)" },
    { value: 3, label: "No Checking Account" }
  ],
  credit_history: [
    { value: 0, label: "All Credits Paid Back Duly at This Bank" },
    { value: 1, label: "Critical Account / Other Credits Existing Elsewhere" },
    { value: 2, label: "Delay in Paying Off Past Credits" },
    { value: 3, label: "Existing Credits Paid Back Duly Till Now" },
    { value: 4, label: "No Credits Taken / All Paid Duly" }
  ],
  purpose: [
    { value: 0, label: "Business" },
    { value: 1, label: "Car (New)" },
    { value: 2, label: "Car (Used)" },
    { value: 3, label: "Domestic Appliances" },
    { value: 4, label: "Education" },
    { value: 5, label: "Furniture / Equipment" },
    { value: 6, label: "Others" },
    { value: 7, label: "Radio / Television" },
    { value: 8, label: "Repairs" },
    { value: 9, label: "Retraining" },
    { value: 10, label: "Vacation" }
  ],
  status_savings: [
    { value: 0, label: "100 to < 500 DM (Low)" },
    { value: 1, label: "500 to < 1000 DM (Moderate)" },
    { value: 2, label: "< 100 DM (Very Low)" },
    { value: 3, label: ">= 1000 DM (High)" },
    { value: 4, label: "Unknown / No Savings Account" }
  ],
  years_employment: [
    { value: 0, label: "1 to < 4 Years (Medium Term)" },
    { value: 1, label: "4 to < 7 Years (Long Term)" },
    { value: 2, label: "< 1 Year (Short Term)" },
    { value: 3, label: ">= 7 Years (Very Long Term)" },
    { value: 4, label: "Unemployed" }
  ],
  status_and_sex: [
    { value: 0, label: "Female: Divorced / Separated / Married" },
    { value: 1, label: "Female: Single" },
    { value: 2, label: "Male: Divorced / Separated" },
    { value: 3, label: "Male: Married / Widowed" },
    { value: 4, label: "Male: Single" }
  ],
  secondary_obligor: [
    { value: 0, label: "Co-Applicant" },
    { value: 1, label: "Guarantor" },
    { value: 2, label: "None" }
  ],
  collateral: [
    { value: 0, label: "Car / Other" },
    { value: 1, label: "None / Other Assets" },
    { value: 2, label: "Real Estate" },
    { value: 3, label: "Savings Agreement / Life Insurance" }
  ],
  other_installment_plans: [
    { value: 0, label: "Bank" },
    { value: 1, label: "None" },
    { value: 2, label: "Stores" }
  ],
  housing: [
    { value: 0, label: "For Free" },
    { value: 1, label: "Own" },
    { value: 2, label: "Rent" }
  ],
  job: [
    { value: 0, label: "Management / Self-Employed / Highly Qualified" },
    { value: 1, label: "Skilled Employee / Official" },
    { value: 2, label: "Unemployed / Unskilled - Non-Resident" },
    { value: 3, label: "Unskilled - Resident" }
  ],
  telephone: [
    { value: 0, label: "None / Not Registered" },
    { value: 1, label: "Yes, Registered Under Customer Name" }
  ],
  is_foreign_worker: [
    { value: 0, label: "Yes" },
    { value: 1, label: "No" }
  ]
};


 const [formData, setFormData] = useState({
    status_account: 3, month_duration: 12, credit_history: 2, purpose: 3, credit_amount: 3000,
    status_savings: 4, years_employment: 2, payment_to_income_ratio: 4, status_and_sex: 2,
    secondary_obligor: 0, residence_since: 4, collateral: 0, age: 35, other_installment_plans: 2,
    housing: 1, n_credits: 1, job: 2, n_guarantors: 0, telephone: 1, is_foreign_worker: 0
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [telemetryLog, setTelemetryLog] = useState("PARSING NODES...");
  
  useEffect(() => {
    if (!loading) return;
    const logs = [
      "PARSING TARGET MATRIX...",
      "EXTRACTING WEIGHT ARRAYS...",
      "COMPUTING WEIGHT DISTRIBUTIONS...",
      "LAYER 3 CORE EVALUATION...",
      "COMPUTING BIAS CORRECTIONS..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setTelemetryLog(logs[i]);
        i++;
      }
    }, 400);
    return () => clearInterval(interval);
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Evaluation pipeline failed.');

      // Exact 2-second locked futuristic visual process evaluation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700 flex flex-col items-center justify-center p-6 antialiased selection:bg-blue-100 selection:text-blue-800">
      <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-2xl shadow-[0_4px_30px_rgba(148,163,184,0.12)] relative flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden min-h-[600px]">
        
        {/* Left Section: Input Parameters */}
        <div className="w-full md:w-3/5 p-8">
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Credit Risk Intelligence Engine
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Provide applicant financial and demographic parameters below.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
              {Object.keys(formData).map((key) => {
                const isCategorical = OPTION_MAPS[key] !== undefined;

                return (
                  <div key={key} className="flex flex-col space-y-1 group">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-colors duration-200 group-focus-within:text-blue-600">
                      {key.replace(/_/g, ' ')}
                    </label>
                    
                    {isCategorical ? (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 cursor-pointer"
                      >
                        {OPTION_MAPS[key].map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                        required
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Running Matrix Assessment...</span>
                </div>
              ) : (
                <span>Compute Risk Analytics</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Section: Results Display Viewport */}
        <div className="w-full md:w-2/5 bg-slate-50/40 p-8 flex flex-col justify-center items-center relative min-h-[350px] md:min-h-auto overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.25]" />

          {!loading && !result && (
            <div className="text-center p-6 max-w-sm z-10">
              <div className="h-10 w-10 bg-white border border-slate-200 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-slate-800">Awaiting Analytics Payload</h3>
              <p className="text-xs text-slate-400 mt-1">
                Configure parameter inputs on the left pane and hit execute to populate real-time diagnostics output.
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center space-y-8 z-10 w-full max-w-xs flex flex-col items-center">
              <div className="relative h-28 w-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping duration-1000" />
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-600/40 animate-spin [animation-direction:reverse] [animation-duration:8s]" />
                <div className="absolute inset-2 rounded-full border border-slate-300 border-t-blue-600 border-b-cyan-500 animate-spin [animation-duration:1.5s]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-slate-200 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                </div>
                <div className="relative rounded-full h-14 w-14 border border-blue-200/50 bg-white shadow-[0_0_20px_rgba(37,99,235,0.15)] flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
              </div>

              <div className="w-full bg-slate-900 text-slate-400 font-mono text-[10px] p-3 rounded-lg border border-slate-800 shadow-md text-left space-y-1 relative">
                <div className="absolute top-1 right-2 flex gap-1 items-center">
                  <span className="h-1 w-1 bg-blue-500 rounded-full animate-ping" />
                  <span className="text-[8px] text-blue-400 font-bold tracking-tighter">EXECUTE</span>
                </div>
                <div className="text-slate-500 border-b border-slate-800 pb-1 flex justify-between items-center text-[9px]">
                  <span>CORE.NEURAL_ANALYZER</span>
                  <span className="text-blue-500 font-bold">ETA: 2.0s</span>
                </div>
                <p className="text-cyan-400 animate-pulse pt-1 truncate font-semibold flex items-center gap-1.5">
                  <span className="inline-block w-1 h-2 bg-cyan-400 animate-blink" />
                  {telemetryLog}
                </p>
              </div>
            </div>
          )}

          {!loading && result && (
            <div className="w-full space-y-6 z-10 animate-fadeIn">
              <div className="text-center pb-4 border-b border-slate-200/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Diagnostic Verdict</span>
                <h2 className={`text-2xl font-black mt-1 tracking-tight ${result.prediction === 'Good Credit Risk' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {result.prediction}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex justify-between items-center shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Optimal Class Weight</span>
                    <span className="text-xs text-emerald-600 font-semibold mt-0.5 inline-block">Confidence Score</span>
                  </div>
                  <span className="text-2xl font-semibold text-slate-900 tracking-tight">{result.good_risk_probability}%</span>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex justify-between items-center shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Adverse Class Weight</span>
                    <span className="text-xs text-rose-600 font-semibold mt-0.5 inline-block">Risk Exposure</span>
                  </div>
                  <span className="text-2xl font-semibold text-slate-900 tracking-tight">{result.bad_risk_probability}%</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}



export default App
