import express from "express";
import cors from "cors";
import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
app.use(cors());
app.use(express.json());

// The API key stays on the server, never in the React code.
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post("/api/analyze", async (req, res) => {
  const { symptoms, age, duration, severity } = req.body || {};
  if (!symptoms || !symptoms.trim()) {
    return res.status(400).json({ error: "Please describe your symptoms." });
  }

  const prompt = `You are a cautious health-information assistant for a triage demo. You never diagnose.
Patient: age ${age || "unknown"}, duration ${duration}, severity ${severity}/10.
Symptoms: """${symptoms}"""
Reply ONLY with JSON (no markdown) with keys:
urgency (one of "Self-care is likely fine","See a doctor soon","Urgent care needed","Emergency"),
summary (2 plain sentences),
possible_causes (2-4 general, common possibilities),
self_care (3-5 safe steps),
red_flags (3-5 warning signs),
doctor_questions (3 questions).
Lean toward caution.`;

  try {
    const msg = await client.messages.create({
      model: "claude-sonnet-5-5",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });
    const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
    res.json(JSON.parse(text.replace(/```json|```/g, "").trim()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed. Check your API key and try again." });
  }
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));
