<div align="center">
  <h1>🩺 HealthLens AI</h1>
  <p>
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1000&color=22C55E&center=true&vCenter=true&width=600&lines=Your+Smart+First+Step+Before+the+Doctor;AI-Powered+Safe+Triage;Built+with+React+%26+Node.js" alt="Typing SVG" />
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/Anthropic_Claude-D97757?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude API" />
  </p>
</div>

<div align="center" style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; border: 1px solid #333; margin: 20px 0;">
  <h3>🚀 An AI-powered web app that turns your symptoms into a clear, cautious triage guide.</h3>
  <p><i>Know whether to rest at home or see a doctor. Never a diagnosis. Always a safe next step.</i></p>
</div>

---

### ❓ The Problem
Many people, especially in places with few clinics or long travel times, don’t know whether a symptom is serious. They either panic over small things or ignore warning signs. Searching online often gives confusing or scary results.

### 💡 Our Solution
**HealthLens AI** lets you describe how you feel in plain language. It then returns a structured, easy-to-read guide. 
**It never diagnoses.** It explains general possibilities, safe next steps and warning signs, and tells you when to get real medical care.

---

### ⚙️ How It Works

1. 🔐 **Login:** Sign in via demo login, or use guest mode.
2. 📝 **Input:** Enter your symptoms, age, duration, and severity.
3. 🚨 **Safety Check:** A rule-based check runs instantly. If you type serious words like “chest pain” or “difficulty breathing”, the app shows an emergency warning *before any AI is involved*.
4. 🔄 **API Call:** React sends your details to our Express server.
5. 🧠 **AI Triage:** The server asks Claude (the AI) for a triage guide, with strict instructions to be cautious and reply in a fixed format.
6. 📊 **Results:** The result appears as cards:
   - 🚦 **Urgency level** (self-care, see a doctor soon, urgent care, or emergency)
   - 📝 **Short summary**
   - 🔍 **Possible general causes**
   - 🩹 **Safe self-care steps**
   - ⚠️ **Warning signs to watch for**
   - 👨‍⚕️ **Questions to ask a doctor**
7. 💾 **History:** Your check is saved to your recent history on your device.

---

### 🛠️ Tech Stack

| Part | Technology | Job |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | The UI: login, form, result cards, history |
| **Backend** | Node.js + Express | Receives symptoms, talks to the AI |
| **AI** | Claude API | Generates the triage guide |
| **Storage** | Browser `localStorage` | Saves login and history (demo) |
| **Safety** | Rule-based keyword check | Instant emergency warning |

---

### 🛡️ What Makes It Responsible
- ✅ **It never diagnoses** and always includes a disclaimer.
- ✅ It leans toward caution and prominently shows warning signs.
- ✅ The emergency check works without AI, so it can’t be skipped or delayed.
- ✅ The API key stays secure on the server, never in the browser.

---

### ⚠️ Honest Limitations
*(Good to know before testing)*
- The login is a demo, with no real accounts or passwords yet.
- History is stored locally on the device only, not in a database.
- **It is for education, not medical advice.**

---

### 🗺️ Future Plans
- [ ] Real Google login integration.
- [ ] Database for user accounts and secure history.
- [ ] Multiple language support.
- [ ] Finding nearby clinics using geolocation.
- [ ] Voice input for symptoms.

---

### 📈 Live Project Activity
*(Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPO_NAME` in the link below with your actual repo details)*

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=sudip-codes18&theme=react-dark&bg_color=0D1117&hide_border=true&line=22C55E&point=FFFFFF&area=true&area_color=22C55E" alt="Activity Graph" width="100%" />
</div>

<div align="center">
  <i>Built with ❤️ for safer healthcare decisions.</i>
</div>
