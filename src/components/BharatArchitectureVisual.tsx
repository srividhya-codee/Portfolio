import React, { useState } from 'react';
import { 
  ArrowDown, 
  Database, 
  FileCheck, 
  LineChart, 
  BrainCircuit, 
  Cpu, 
  Eye, 
  Search, 
  GitFork, 
  CheckCircle2, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { PIPELINE_STEPS } from '../data/portfolioData';

export const BharatArchitectureVisual: React.FC = () => {
  const [selectedStepId, setSelectedStepId] = useState<string>('risk-engine');

  const stepIcons = [
    Database,       // Gov Data
    FileCheck,      // Data Processing
    LineChart,      // EVM Analytics
    BrainCircuit,   // ML Risk Engine
    Cpu,            // XGBoost + Gradient Boosting
    Eye,            // SHAP Explainability
    Search,         // RAG Knowledge Retrieval
    GitFork,        // LangGraph Agent
    Sparkles        // Decision Support
  ];

  const stepDetails: Record<string, {
    input: string;
    output: string;
    technicalHighlights: string[];
    samplePayload: Record<string, string | number>;
  }> = {
    'gov-data': {
      input: 'Public Works Dept (PWD), NHAI & Smart City portals, statutory tenders, bills of quantities',
      output: 'Raw multi-source structured and unstructured project logs',
      technicalHighlights: [
        'Contractor monthly progress filings (MPRs)',
        'Site inspection engineer handwritten notes',
        'Physical milestone deliverables & financial outlays'
      ],
      samplePayload: {
        'project_code': 'INFRA-TN-2024-88',
        'initial_budget_cr': 142.50,
        'contractor_tier': 'Class-A',
        'baseline_duration_months': 24
      }
    },
    'processing': {
      input: 'Raw documents, disparate tables, CSVs, PDF inspection logs',
      output: 'Unified analytical feature matrix + vector chunk embeddings',
      technicalHighlights: [
        'Financial-physical lead gap calculation',
        'Temporal variance alignment & missing date imputation',
        'Text extraction with OCR verification'
      ],
      samplePayload: {
        'sanitized_records': 1420,
        'feature_count': 38,
        'variance_delta_days': 46,
        'missing_fields_repaired': 12
      }
    },
    'evm': {
      input: 'Planned Value (PV), Earned Value (EV), Actual Cost (AC)',
      output: 'EVM performance metrics & health indicators',
      technicalHighlights: [
        'Schedule Performance Index (SPI = EV / PV)',
        'Cost Performance Index (CPI = EV / AC)',
        'Estimate at Completion (EAC = BAC / CPI)',
        'Lead gap detection between physical progress and disbursements'
      ],
      samplePayload: {
        'SPI': '0.84 (Behind Schedule)',
        'CPI': '0.91 (Cost Overrun Risk)',
        'BAC_in_cr': 142.5,
        'EAC_projected_cr': 156.6
      }
    },
    'risk-engine': {
      input: 'Aggregated EVM indices + project parameters + environmental factors',
      output: 'Predicted delay duration & overrun probability distribution',
      technicalHighlights: [
        'Multi-target delay prediction pipeline',
        'Early-warning severity threshold flags',
        'Historical contractor performance profiling'
      ],
      samplePayload: {
        'predicted_delay_days': 68,
        'overrun_prob_percent': 74.2,
        'risk_severity': 'HIGH_CRITICAL',
        'confidence_score': 0.89
      }
    },
    'boost-models': {
      input: 'Normalized engineered features from 500+ government infrastructure benchmarks',
      output: 'Regression scores for duration delay and cost escalation percentage',
      technicalHighlights: [
        'Gradient Boosting Regressor for continuous milestone deviation',
        'XGBoost with weighted loss for high-impact infrastructure lags',
        'Hyperparameter tuning for non-linear correlation capture'
      ],
      samplePayload: {
        'model_architecture': 'XGBoost + GradientBoosting Ensemble',
        'rmse_delay_days': 11.4,
        'r2_score': 0.87,
        'tree_depth': 6
      }
    },
    'shap': {
      input: 'Ensemble model decision paths & sample project vectors',
      output: 'Local & global Shapley attribution values',
      technicalHighlights: [
        'TreeExplainer for real-time feature contribution scoring',
        'Transparent explanation for government audit compliance',
        'Identifies exact drivers (e.g. monsoon delay vs contractor liquidity)'
      ],
      samplePayload: {
        'top_driver_1': 'Contractor past delay history (+31 days)',
        'top_driver_2': 'Land acquisition clearance delay (+22 days)',
        'mitigating_factor': 'High upfront equipment deployment (-8 days)'
      }
    },
    'rag': {
      input: 'Auditor query + project risk profile + statutory guidelines',
      output: 'Semantically retrieved evidence chunks with exact document citations',
      technicalHighlights: [
        'Dense vector retrieval over statutory circulars & site notes',
        'Hybrid BM25 + dense semantic reranking',
        'Chunking with metadata preservation (clause numbers & dates)'
      ],
      samplePayload: {
        'relevant_chunks_retrieved': 5,
        'top_source': 'Site_Inspection_Q3_Note.pdf#Page4',
        'circular_citation': 'Govt_Circular_MoRTH_2023_Sec12',
        'retrieval_latency_ms': 140
      }
    },
    'langgraph': {
      input: 'EVM indices + ML predictions + SHAP explanations + RAG context',
      output: 'Verified, guardrailed execution state graph',
      technicalHighlights: [
        'Deterministic state transitions with error traps',
        'Numerical consistency checks (verifies numbers against raw tables)',
        'Role-Based Access Control (RBAC) enforcement'
      ],
      samplePayload: {
        'agent_status': 'COMPLETED_SUCCESS',
        'guardrail_passed': 'YES (Hallucination check 100%)',
        'rbac_tier': 'Superintending_Engineer_Level',
        'citations_count': 4
      }
    },
    'decision': {
      input: 'Synthesized intelligence graph output',
      output: 'Actionable executive brief with verifiable audit citations',
      technicalHighlights: [
        'Automated executive risk briefs for District Collectors & Ministry',
        'Specific intervention recommendations with estimated recovery days',
        'Evidence-based AI responses eliminating hallucination'
      ],
      samplePayload: {
        'recommended_action': 'Expedite Right-of-Way clearance at Ch 14+200',
        'expected_recovery': '21 days saved if resolved within 14 days',
        'financial_impact_saved': '₹4.2 Cr'
      }
    }
  };

  const selectedStep = PIPELINE_STEPS.find(s => s.id === selectedStepId) || PIPELINE_STEPS[3];
  const selectedInfo = stepDetails[selectedStep.id];

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 backdrop-blur-xl p-6 shadow-2xl">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Interactive System Architecture
            </span>
          </div>
          <h4 className="text-lg font-bold text-white font-display">
            End-to-End Pipeline: Data Ingestion to Evidence-Based Decision Support
          </h4>
        </div>
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <span>Click any node to inspect data contract:</span>
        </div>
      </div>

      {/* Interactive Horizontal / Vertical Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-2 mb-8">
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = stepIcons[idx];
          const isSelected = selectedStepId === step.id;

          return (
            <div key={step.id} className="relative flex flex-col items-center">
              <button
                onClick={() => setSelectedStepId(step.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-full ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50'
                    : 'bg-slate-900/60 border-slate-800/90 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                </div>
                <div className={`text-xs font-semibold leading-tight line-clamp-2 ${
                  isSelected ? 'text-white' : 'text-slate-300'
                }`}>
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-2 truncate font-mono">
                  {step.category}
                </div>
              </button>

              {/* Connecting arrow indicator for visual flow */}
              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600 pointer-events-none">
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Telemetry Inspector */}
      {selectedStep && selectedInfo && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          {/* Left: Step Description & Highlights */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-900/50 border border-cyan-700/50 text-cyan-300">
                Step {selectedStep.step} · {selectedStep.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">Stage Active</span>
            </div>

            <h5 className="text-base font-bold text-white font-display">
              {selectedStep.title}
            </h5>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedStep.desc}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Engineering Invariants:
              </span>
              <ul className="space-y-1.5">
                {selectedInfo.technicalHighlights.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Operational Payload Contract */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/80 rounded-lg p-4 border border-slate-800/80 font-mono text-xs">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span>SIMULATED STAGE TELEMETRY &amp; STATE</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified State
                </span>
              </div>

              <div className="space-y-2 text-slate-300">
                <div className="text-[11px] text-slate-500 mb-1">// Incoming Stream Contract:</div>
                <div className="text-[11px] text-slate-300 bg-slate-900/80 p-2 rounded border border-slate-800/60 break-words mb-3">
                  <span className="text-cyan-400">Input:</span> {selectedInfo.input}
                </div>

                <div className="text-[11px] text-slate-500 mb-1">// Outgoing State Payload:</div>
                <div className="bg-slate-900/90 p-3 rounded border border-slate-800/80 text-[11px] space-y-1">
                  {Object.entries(selectedInfo.samplePayload).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center py-0.5">
                      <span className="text-indigo-300">"{key}":</span>
                      <span className="text-emerald-300 font-semibold">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Audit Trail: <span className="text-cyan-300">Cryptographic Hash Logged</span></span>
              <span>RBAC Tier: <span className="text-slate-200">Gov. Auditor Level</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
