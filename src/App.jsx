import { useState } from "react";

const EXAMPLES = ["Headache", "Fever and cough", "Stomach pain", "Sore throat", "Back pain", "Dizziness"];
const RED_FLAGS = ["chest pain", "can't breathe", "cannot breathe", "difficulty breathing", "shortness of breath",
  "unconscious", "seizure", "stroke", "slurred speech", "suicid", "severe bleeding", "vomiting blood", "face drooping"];

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter your name and a valid email.");
    onLogin({ name: name.trim(), email: email.trim().toLowerCase() });
  };

  return (
    <div className="login">
      <div className="box">
        <h2>Welcome to HealthLens AI</h2>
        <p className="muted">Sign in to save your symptom checks</p>
        {/* Demo only. Real Google login: use @react-oauth/google + verify the token in server/index.js */}
        <button className="ghost" onClick={() => onLogin({ name: "Demo User", email: "demo@google.demo" })}>
          Continue with Google (demo)
        </button>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p className="err">{err}</p>
        <button className="main" onClick={submit}>Sign in</button>
        <button className="link" onClick={() => onLogin({ name: "Guest", email: "guest" })}>Continue as guest</button>
      </div>
    </div>
  );
}

function List({ title, items }) {
  if (!items?.length) return null;
  return (
    <>
      <h3>{title}</h3>
      <ul>{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
    </>
  );
}

function Analyzer({ user, onLogout }) {
  const key = "hl_hist_" + user.email;
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [duration, setDuration] = useState("Less than 1 day");
  const [severity, setSeverity] = useState(5);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(() => read(key, []));

  const emergency = RED_FLAGS.some((k) => symptoms.toLowerCase().includes(k));

  const analyze = async () => {
    if (!symptoms.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, age, duration, severity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      const next = [{ symptoms, result: data }, ...history].slice(0, 10);
      setHistory(next);
      localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const tone = (u = "") => /emergency|urgent/i.test(u) ? "red" : /doctor/i.test(u) ? "yellow" : "green";

  return (
    <div className="wrap">
      <div className="top">
        <span>Hi, <b>{user.name}</b></span>
        <button className="chip" onClick={onLogout}>Log out</button>
      </div>
      <h1>HealthLens AI</h1>
      <p className="muted">Describe your symptoms. Get a plain-language triage guide, not a diagnosis.</p>

      <div className="card">
        <label>What are you feeling?</label>
        <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g. sore throat and mild fever since yesterday" />
        <div className="chips">
          {EXAMPLES.map((t) => <button key={t} className="chip" onClick={() => setSymptoms(t)}>{t}</button>)}
        </div>
        <div className="row">
          <div><label>Age</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} /></div>
          <div>
            <label>Duration</label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
              {["Less than 1 day", "1-3 days", "4-7 days", "More than a week"].map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <label>Severity: {severity}/10</label>
        <input type="range" min="1" max="10" value={severity} onChange={(e) => setSeverity(e.target.value)} />
        <button className="main" onClick={analyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze symptoms"}</button>
      </div>

      {emergency && <div className="alert">Some of what you described can be serious. Contact emergency services or go to the nearest hospital now.</div>}
      {error && <div className="card err">{error}</div>}

      {result && (
        <div className="card">
          <span className={"badge " + tone(result.urgency)}>{result.urgency}</span>
          <p>{result.summary}</p>
          <List title="Possible general causes" items={result.possible_causes} />
          <List title="What you can do now" items={result.self_care} />
          <List title="Seek care promptly if" items={result.red_flags} />
          <List title="Questions to ask a doctor" items={result.doctor_questions} />
        </div>
      )}

      {history.length > 0 && (
        <div className="card">
          <b>Recent checks</b>
          {history.slice(0, 5).map((h, i) => (
            <button key={i} className="hist" onClick={() => setResult(h.result)}>
              {h.symptoms.slice(0, 60)} · {h.result.urgency}
            </button>
          ))}
        </div>
      )}
      <p className="muted small">Demo for general education only. Not medical advice. In an emergency, call your local emergency number.</p>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => read("hl_user", null));
  const login = (u) => { localStorage.setItem("hl_user", JSON.stringify(u)); setUser(u); };
  const logout = () => { localStorage.removeItem("hl_user"); setUser(null); };
  return user ? <Analyzer key={user.email} user={user} onLogout={logout} /> : <Login onLogin={login} />;
}
