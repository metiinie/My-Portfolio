// Multi-provider AI Chat Service with Google Gemini, OpenRouter, OpenAI, Groq & Zero-Key Fallback

const SYSTEM_FACTS = {
  name: "Awol Ibrahim Ayalew",
  title: "Full-Stack Web & Cross-Platform Mobile Developer",
  location: "Addis Ababa, Ethiopia",
  email: "abumahilkerim@gmail.com",
  phone: "+251 918 982 161",
  experienceYears: 3,
  education: "Dire Dawa University (2021 - 2025), B.Sc. in Software Engineering",
  portfolio: "https://awol-ibrahim.vercel.app",
  linkedin: "https://www.linkedin.com/in/awolbuilds",
  github: "https://github.com/metiinie",
  roles: [
    "Addis Ababa City Administration (Civic Eye platform, Laravel + Vue.js + PostgreSQL)",
    "Qelem Meda Technologies (Software Engineering Intern, React + Node.js + PostgreSQL)",
    "Fanos Tech P.L.C (Municipal Code Enforcement Management System, Laravel + Filament)",
    "Zemenay Tech (Software Engineering Intern, Agile Sprint Delivery)"
  ],
  skills: {
    languages: "JavaScript, TypeScript, PHP, Python, HTML5, CSS3, SQL",
    frontend: "React.js, Next.js, Vue.js, React Native, Tailwind CSS, Bootstrap, Redux Toolkit",
    backend: "Node.js, NestJS, Laravel, Django, Flask, RESTful APIs",
    databases: "PostgreSQL (including Neon serverless), MySQL, MongoDB, Firestore",
    cloud: "Docker, CI/CD pipelines, Vercel, Render, Firebase, IIS"
  },
  projects: [
    {
      name: "Civic Eye",
      tags: "Laravel, Vue.js, PostgreSQL, Geolocation",
      desc: "Community-driven public infrastructure reporting platform built for the Addis Ababa City Administration Innovation & Technology Development Bureau. Citizens submit issues with photo & GPS evidence; city administrators manage and verify repairs."
    },
    {
      name: "Code Enforcement Management System (ICAMS / Denb)",
      tags: "Laravel, Filament, Next.js, PWA, Dexie.js (Offline-First)",
      desc: "Municipal government platform digitizing urban rule-violation tracking and public awareness campaigns with full audit trails and offline-first mobile synchronization."
    },
    {
      name: "Safeland Cafe",
      tags: "Next.js, Node.js, WebSockets, PostgreSQL",
      desc: "Role-based QR code restaurant ordering platform in Hawassa, Ethiopia featuring real-time synchronized kitchen display (KDS), waiter, and manager dashboards."
    },
    {
      name: "WOOD CARVO",
      tags: "Django 5, DRF, Next.js, TypeScript, Tailwind, next-intl",
      desc: "Bespoke furniture workshop showcase in Addis Ababa with trilingual internationalization (English, Amharic, Afaan Oromo) and direct Telegram/WhatsApp inquiry flows."
    },
    {
      name: "Ethiopian Farmers Market Platform",
      tags: "Next.js, Node.js, Express, PostgreSQL, Prisma",
      desc: "B2B agricultural marketplace connecting smallholder farmers directly with commercial buyers (restaurants, hotels, exporters) with structured order fulfillment."
    },
    {
      name: "Edmealem Ejigu Business Group",
      tags: "HTML5, CSS3, JavaScript, B2B Portal",
      desc: "Corporate web portal for an Ethiopian trading and investment conglomerate across industrial imports, agricultural exports, logistics, and hospitality."
    },
    {
      name: "Face Recognition Attendance System",
      tags: "Python, OpenCV, Computer Vision, Biometric AI",
      desc: "Automated employee attendance tracking system utilizing facial recognition algorithms and an administrative control dashboard."
    },
    {
      name: "Lib le Lib",
      tags: "React Native, Expo, NestJS, PostgreSQL",
      desc: "Privacy-first mobile support and connection platform for people living with HIV, designed with strict privacy boundaries and medical verification."
    },
    {
      name: "Multi-Vendor Food Delivery Platform",
      tags: "React.js, Redux Toolkit, Cloud Functions",
      desc: "Real-time logistics platform connecting customers, delivery drivers, and kitchen preparation stations."
    },
    {
      name: "Unique Equb",
      tags: "React Native, Expo, TypeScript, Jest",
      desc: "Mobile-first digital platform modernizing traditional rotating savings and credit associations (Equb) with verifiable invariants."
    }
  ]
};

// Built-in intelligent persona generator when no external API key is configured or when APIs are unreachable
function generatePersonaResponse(userMessage) {
  const query = (userMessage || "").toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|hola|greetings|selam|halo|good\s*(morning|afternoon|evening))/i.test(query)) {
    return `Hello! I'm ${SYSTEM_FACTS.name} 👋 Full-Stack Web and Cross-Platform Mobile Developer based in ${SYSTEM_FACTS.location}.\n\nGreat to meet you! Feel free to ask me about my engineering work, projects like Civic Eye or Safeland Cafe, my tech stack, or make a move and let's play chess!`;
  }

  // Who are you / about
  if (/who are you|about you|tell me about yourself|introduce|bio/i.test(query)) {
    return `I am ${SYSTEM_FACTS.name}, a Full-Stack Web and Cross-Platform Mobile Developer with ${SYSTEM_FACTS.experienceYears} years of experience building secure, role-based systems for government and commercial clients.\n\nI graduated from ${SYSTEM_FACTS.education} and have delivered municipal platforms like Civic Eye for the Addis Ababa City Administration, offline-first code enforcement systems, and real-time ordering platforms.`;
  }

  // Specific project queries
  if (/civic\s*eye/i.test(query)) {
    const p = SYSTEM_FACTS.projects[0];
    return `**Civic Eye** is one of my key government projects:\n\n• **Client:** Addis Ababa City Administration (Innovation & Technology Development Bureau)\n• **Tech Stack:** ${p.tags}\n• **What it does:** ${p.desc}\n• **Outcome:** Successfully delivered with official completion certification.`;
  }

  if (/code\s*enforcement|denb|icams/i.test(query)) {
    const p = SYSTEM_FACTS.projects[1];
    return `**Code Enforcement Management System (ICAMS / Denb):**\n\n• **Client:** Addis Ababa City Government (via Fanos Tech)\n• **Tech Stack:** ${p.tags}\n• **What it does:** ${p.desc}\n• **Key Features:** Offline-first IndexedDB synchronization via Dexie.js so field officers can inspect properties even without active mobile data.`;
  }

  if (/safe\s*land|cafe|qr\s*order/i.test(query)) {
    const p = SYSTEM_FACTS.projects[2];
    return `**Safeland Cafe Ordering System:**\n\n• **Location:** Hawassa, Ethiopia\n• **Tech Stack:** ${p.tags}\n• **Architecture:** Zero-download QR code table ordering synchronized with live kitchen display systems (KDS) via WebSockets for zero order bottlenecks.`;
  }

  if (/wood\s*carvo|furniture/i.test(query)) {
    const p = SYSTEM_FACTS.projects[3];
    return `**WOOD CARVO Showcase & Inquiry Platform:**\n\n• **Location:** Addis Ababa, Ethiopia\n• **Tech Stack:** ${p.tags}\n• **Highlights:** Trilingual support (English, Amharic, Afaan Oromo), Django REST Framework backend, Next.js edge caching, and automated Telegram broadcasting for incoming customer inquiries.`;
  }

  if (/farmers\s*market|agriculture|farm/i.test(query)) {
    const p = SYSTEM_FACTS.projects[4];
    return `**Ethiopian Farmers Market Platform:**\n\n• **Tech Stack:** ${p.tags}\n• **Impact:** Facilitates B2B transactions connecting smallholder farmers directly with commercial buyers (hotels, restaurants, wholesalers), structuring trade and delivery verification.`;
  }

  if (/edmealem|corporate/i.test(query)) {
    const p = SYSTEM_FACTS.projects[5];
    return `**Edmealem Ejigu Business Group Portal:**\n\n• **Tech Stack:** ${p.tags}\n• **Overview:** A high-performance corporate web portal representing an Ethiopian trading and investment conglomerate across industrial imports, agricultural exports, and hospitality.\n• **Live Link:** https://edmialem-ejigu.vercel.app/`;
  }

  if (/face\s*recognition|attendance|opencv|biometric/i.test(query)) {
    const p = SYSTEM_FACTS.projects[6];
    return `**Face Recognition Attendance System:**\n\n• **Tech Stack:** ${p.tags}\n• **Engineering:** Utilizes OpenCV facial detection and embeddings to automate employee clock-ins with anti-spoofing checks and an administrative monitoring dashboard.`;
  }

  if (/lib\s*le\s*lib|hiv/i.test(query)) {
    const p = SYSTEM_FACTS.projects[7];
    return `**Lib le Lib Platform:**\n\n• **Tech Stack:** ${p.tags}\n• **Purpose:** Privacy-first mobile support and peer connection for individuals living with HIV, engineered with strict data compartmentalization and medical verification gates.`;
  }

  if (/unique\s*equb|equb|savings/i.test(query)) {
    const p = SYSTEM_FACTS.projects[9];
    return `**Unique Equb Digital Management:**\n\n• **Tech Stack:** ${p.tags}\n• **Concept:** Digitizes traditional Ethiopian rotating savings groups (Equb) with algorithmic lottery distribution, invariant state validation, and full audit logs.`;
  }

  // All Projects
  if (/project|portfolio|work|what have you built|case stud/i.test(query)) {
    return `Here are some of my standout engineering projects:\n\n1. **Civic Eye** — Public infrastructure reporting platform for Addis Ababa City Administration (Laravel, Vue.js, PostgreSQL)\n2. **Code Enforcement Management System** — Municipal violation tracking with offline-first PWA (Laravel, Filament, Dexie.js)\n3. **Safeland Cafe** — Real-time QR ordering and live kitchen KDS in Hawassa (Next.js, Node.js, WebSockets)\n4. **WOOD CARVO** — Trilingual furniture workshop showcase (Django 5 DRF, Next.js, Telegram bot)\n5. **Ethiopian Farmers Market** — B2B agricultural trading marketplace\n6. **Edmealem Ejigu Business Group** — B2B corporate investment portal\n\nYou can also click **See All Works** on this portfolio for in-depth case studies!`;
  }

  // Skills / Tech stack
  if (/skill|tech\s*stack|stack|technolog|language|framework|python|django|react|vue|laravel|node/i.test(query)) {
    return `My core technical stack includes:\n\n• **Languages:** ${SYSTEM_FACTS.skills.languages}\n• **Frontend:** ${SYSTEM_FACTS.skills.frontend}\n• **Backend:** ${SYSTEM_FACTS.skills.backend}\n• **Databases:** ${SYSTEM_FACTS.skills.databases}\n• **DevOps & Cloud:** ${SYSTEM_FACTS.skills.cloud}\n\nI focus on scalable system architecture, clean role-based data integrity, and high-performance user experiences.`;
  }

  // Experience / Jobs / Internships
  if (/experience|career|job|intern|company|companies|work history/i.test(query)) {
    return `My professional software engineering background:\n\n• **Addis Ababa City Administration (IT Bureau)** — Fullstack Developer (Freelance): Delivered the Civic Eye platform.\n• **Qelem Meda Technologies** — Software Engineering Intern: Production fullstack features with React, Node.js, and PostgreSQL.\n• **Fanos Tech P.L.C** — Fullstack Developer (Freelance): Built the municipal Code Enforcement System.\n• **Zemenay Tech** — Software Engineering Intern: Client-facing agile sprint development.\n\nI have earned official recommendation letters and completion certificates for each of these engagements.`;
  }

  // Education / University / Degree
  if (/education|degree|university|college|study|graduat/i.test(query)) {
    return `I graduated from **${SYSTEM_FACTS.education}**.\n\nMy studies established deep foundations in data structures, algorithms, database systems, distributed architectures, and agile engineering practices.`;
  }

  // Contact / Hire / Phone / Email
  if (/contact|email|phone|hire|reach|call|telegram|message|interview/i.test(query)) {
    return `I'd love to connect with you! Here is how you can reach me:\n\n• 📧 **Email:** [${SYSTEM_FACTS.email}](mailto:${SYSTEM_FACTS.email})\n• 📱 **Phone:** ${SYSTEM_FACTS.phone}\n• 📍 **Location:** ${SYSTEM_FACTS.location}\n• 🔗 **LinkedIn:** [${SYSTEM_FACTS.linkedin}](${SYSTEM_FACTS.linkedin})\n• 🐙 **GitHub:** [${SYSTEM_FACTS.github}](${SYSTEM_FACTS.github})\n\nYou can also drop a message using the Contact section on the homepage!`;
  }

  // Chess questions
  if (/chess|move|game|board|king|queen|knight|bishop|pawn|checkmate|engine|redox/i.test(query)) {
    return `I love chess! This page is running the **Redox Chess engine** in WebAssembly alongside my AI persona.\n\nJust like in software engineering, chess is all about positional control, calculating trade-offs, and anticipating your opponent's moves. Make a move on the board and let's play!`;
  }

  // Default intelligent response
  return `Thanks for asking! As a Full-Stack Web and Cross-Platform Mobile Developer, I specialize in translating complex business requirements into clean, practical, and user-friendly software.\n\nYou can ask me specifically about:\n• My municipal government projects (**Civic Eye**, **Code Enforcement**)\n• Real-time & e-commerce platforms (**Safeland Cafe**, **WOOD CARVO**)\n• My tech stack (React, Next.js, Node.js, Laravel, Django, PostgreSQL)\n• Contact details or hiring availability. What would you like to know?`;
}

// 1. Google Gemini API (Free tier from https://aistudio.google.com)
async function callGemini(apiKey, messages) {
  const systemMsg = messages.find((m) => m.role === "system");
  const chatMsgs = messages.filter((m) => m.role !== "system");

  const contents = chatMsgs.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  if (contents.length === 0) {
    contents.push({ role: "user", parts: [{ text: "Hello" }] });
  }

  const payload = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 350
    }
  };

  if (systemMsg && systemMsg.content) {
    payload.systemInstruction = {
      parts: [{ text: systemMsg.content }]
    };
  }

  // Models to attempt (Gemini 2.5 Flash, 2.0 Flash, 1.5 Flash)
  const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-2.5-flash"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return {
          ok: true,
          status: 200,
          data: {
            choices: [
              {
                message: {
                  role: "assistant",
                  content: data.candidates[0].content.parts[0].text
                }
              }
            ]
          }
        };
      }
    } catch {
      // try next model
    }
  }

  return { ok: false, status: 500, error: "Gemini models unreachable" };
}

// 2. OpenRouter API (Free models supported, e.g. meta-llama/llama-3.2-3b-instruct:free)
async function callOpenRouter(apiKey, messages) {
  const models = [
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "meta-llama/llama-3.1-8b-instruct:free",
    "openrouter/auto"
  ];

  for (const model of models) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://awol-ibrahim.vercel.app",
          "X-Title": "Awol Ibrahim Portfolio"
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 350
        })
      });
      const data = await response.json();
      if (response.ok && data.choices && data.choices[0]?.message?.content) {
        return { ok: true, status: 200, data };
      }
    } catch {
      // try next model
    }
  }
  return { ok: false, status: 500, error: "OpenRouter request failed" };
}

// 3. OpenAI or Groq Compatible API
async function callOpenAICompatible(url, apiKey, model, messages) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 350
      })
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (err) {
    return { ok: false, status: 500, error: err.message };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages must be a non-empty array" });
  }

  const userMessages = messages.filter((m) => m.role === "user");
  const lastUserPrompt = userMessages[userMessages.length - 1]?.content || "";

  // 1. Try Google Gemini API (Recommended free tier)
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (geminiKey) {
    const geminiRes = await callGemini(geminiKey, messages);
    if (geminiRes.ok) {
      return res.status(200).json(geminiRes.data);
    }
    console.warn("Gemini call failed, checking next provider...");
  }

  // 2. Try OpenRouter API
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    const openRouterRes = await callOpenRouter(openRouterKey, messages);
    if (openRouterRes.ok) {
      return res.status(200).json(openRouterRes.data);
    }
    console.warn("OpenRouter call failed, checking next provider...");
  }

  // 3. Try OpenAI API
  const openAIKey = process.env.OPENAI_API_KEY;
  if (openAIKey) {
    const openAIRes = await callOpenAICompatible(
      "https://api.openai.com/v1/chat/completions",
      openAIKey,
      "gpt-4o-mini",
      messages
    );
    if (openAIRes.ok && openAIRes.data?.choices?.[0]?.message?.content) {
      return res.status(200).json(openAIRes.data);
    }
  }

  // 4. Try Groq API (if key is present)
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    const groqRes = await callOpenAICompatible(
      "https://api.groq.com/openai/v1/chat/completions",
      groqKey,
      "llama-3.3-70b-versatile",
      messages
    );
    if (groqRes.ok && groqRes.data?.choices?.[0]?.message?.content) {
      return res.status(200).json(groqRes.data);
    }
  }

  // 5. Zero-Key Fallback: Always respond with Awol's intelligent persona
  // This guarantees the portfolio chat NEVER breaks or shows a 500 error to clients!
  const fallbackAnswer = generatePersonaResponse(lastUserPrompt);
  return res.status(200).json({
    choices: [
      {
        message: {
          role: "assistant",
          content: fallbackAnswer
        }
      }
    ],
    mode: "knowledge-engine"
  });
}
