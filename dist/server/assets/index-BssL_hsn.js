import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
const profile = {
  name: "Nancy Kataria",
  role: "Software Engineer",
  location: "San Jose, CA",
  email: "katarianancy8@gmail.com",
  tagline: "Full-stack engineer building AI-powered, human-friendly software.",
  github: "https://github.com/nancy-kataria",
  linkedin: "https://www.linkedin.com/in/nancy-kataria8/"
};
const projects = [
  {
    name: "Code Intelligence",
    blurb: "RAG app that answers questions about any GitHub repo.",
    stack: ["Next.js", "TypeScript", "Langchain", "Pinecone", "GPT-4"],
    link: "https://github.com/nancy-kataria/codebase-intelligence"
  },
  {
    name: "Digital Lawyer",
    blurb: "Offline-first AI legal assistant running fully on-device.",
    stack: ["Next.js", "Ollama", "Gemma3", "Llava", "Web Speech API"],
    link: "https://github.com/nancy-kataria/Digital_Lawyer"
  },
  {
    name: "Parking Violations Checker",
    blurb: "Prolog expert system that infers campus parking violations.",
    stack: ["Prolog", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/nancy-kataria/Parking-Violations-Checker"
  }
];
const experience = [
  {
    company: "i3 Digital Health",
    role: "Software Engineer",
    period: "Jul 2023 — Nov 2023",
    location: "Bangalore, India",
    points: [
      "Built a doctor-facing portal with React + Redux for cancer genomics and treatments.",
      "Designed JWT auth and RESTful APIs in Express.js.",
      "Used React Query for cached, real-time patient ↔ doctor communication."
    ]
  },
  {
    company: "i3 Digital Health",
    role: "Software Engineer Intern",
    period: "Jan 2023 — Jun 2023",
    location: "Bangalore, India",
    points: [
      "Shipped a Time Log & Payroll system with React, Express and MongoDB.",
      "Built v1 of the Cancer Patient Health Records app from scratch."
    ]
  }
];
const education = [
  {
    school: "California State University, Fullerton",
    degree: "M.S. Computer Science",
    period: "2024 — 2025",
    detail: "GPA 3.68"
  },
  {
    school: "Panjab University",
    degree: "B.E. Computer Science (Hons.)",
    period: "2019 — 2023",
    detail: "CGPA 8.31 / 10"
  }
];
const skills = {
  Languages: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  Frameworks: ["React", "Next.js", "Node.js", "Express.js", "Deno"],
  "AI / Data": [
    "Langchain",
    "Pinecone",
    "PyTorch",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Prolog"
  ],
  Databases: ["MongoDB", "MySQL", "Supabase", "Prisma"],
  Tools: ["Git", "GitHub", "Postman", "Zod"]
};
const flatSkills = Object.values(skills).flat();
const HELP = `Available commands:
  about         — who I am
  skills        — tech stack
  experience    — work history
  projects      — selected projects
  education     — schools
  contact       — how to reach me
  socials       — github / linkedin
  clear         — clear screen
  exit          — close terminal

  Try Easter egg commands: sudo, git commit,
  coffee, fix-bugs, recursion, sudo rm -rf `;
function fmtSkills() {
  return Object.entries(skills).map(([k, v]) => `  ${k.padEnd(12)} ${v.join(", ")}`).join("\n");
}
function fmtExp() {
  return experience.map(
    (e) => `  ${e.role} @ ${e.company}
    ${e.period} · ${e.location}
` + e.points.map((p) => `    - ${p}`).join("\n")
  ).join("\n\n");
}
function fmtProjects() {
  return projects.map((p) => `  ▸ ${p.name} — ${p.blurb}
      [${p.stack.join(", ")}]`).join("\n\n");
}
function fmtEdu() {
  return education.map((e) => `  ${e.degree}
    ${e.school} · ${e.period} · ${e.detail}`).join("\n\n");
}
const COMMANDS = {
  help: () => HELP,
  about: () => `${profile.name} — ${profile.role}
${profile.location}

${profile.tagline}`,
  skills: fmtSkills,
  experience: fmtExp,
  exp: fmtExp,
  projects: fmtProjects,
  education: fmtEdu,
  contact: () => `  email     ${profile.email}
  location  ${profile.location}`,
  socials: () => `  github    ${profile.github}
  linkedin  ${profile.linkedin}`,
  whoami: () => "guest@nancy.dev",
  ls: () => "about  skills  experience  projects  education  contact  socials",
  pwd: () => "/home/nancy/portfolio",
  date: () => (/* @__PURE__ */ new Date()).toString(),
  echo: () => "",
  // Easter eggs
  sudo: () => "Permission denied. Nice try, but you don't have root privileges on my portfolio! 😉",
  "sudo rm -rf /": () => "⚠️  CRITICAL ERROR: Attempting to delete the portfolio core...\nWait, I'm an AI-enhanced application. I cannot let you do that, Dave.\n(Plus, I already checked my inputs with Zod.)",
  recursion: () => "Did you mean: 'recursion'?\n(Type 'recursion' to find out...)",
  "git commit": () => 'Error: Cannot commit.\nReason: Your staging area contains 47 console.log statements\nand a comment that says "// I will fix this tomorrow."',
  coffee: () => "☕  Error: 418 I'm a teapot.\nPlease insert coffee token to convert caffeine into clean TypeScript code.",
  caffeine: () => "☕  Error: 418 I'm a teapot.\nPlease insert coffee token to convert caffeine into clean TypeScript code.",
  "fix-bugs": () => "🐛  0 bugs found! (Because it works on my local machine.)",
  vim: () => "Trapped in vim? :q to escape. Welcome to the club.",
  hello: () => "hi there 👋",
  hi: () => "hello, fellow human (or bot, no judgement)."
};
const BANNER = `  _   _                       _  __     _             _      
 | \\ | | __ _ _ __   ___ _   _| |/ /__ _| |_ __ _ _ __(_) __ _ 
 |  \\| |/ _\` | '_ \\ / __| | | | ' // _\` | __/ _\` | '__| |/ _\` |
 | |\\  | (_| | | | | (__| |_| | . \\ (_| | || (_| | |  | | (_| |
 |_| \\_|\\__,_|_| |_|\\___|\\__, |_|\\_\\__,_|\\__\\__,_|_|  |_|\\__,_|
                         |___/                                  
`;
function Terminal({
  open,
  onClose
}) {
  const [lines, setLines] = useState([
    { kind: "sys", text: BANNER },
    { kind: "sys", text: "Last login: just now on ttys000" },
    { kind: "sys", text: "Type 'help' to get started.\n" }
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  function run(raw) {
    const cmd = raw.trim();
    const next = [...lines, { kind: "in", text: cmd }];
    if (!cmd) return setLines(next);
    if (cmd === "clear" || cmd === "cls") {
      setLines([]);
      return;
    }
    if (cmd === "exit" || cmd === "quit") {
      setLines(next);
      onClose();
      return;
    }
    const lower = cmd.toLowerCase();
    let out;
    if (COMMANDS[lower]) out = COMMANDS[lower]();
    else if (lower.startsWith("echo ")) out = cmd.slice(5);
    else if (lower.startsWith("sudo ")) out = COMMANDS["sudo"]();
    else out = `command not found: ${cmd}
Type 'help' for available commands.`;
    setLines([...next, { kind: "out", text: out }]);
  }
  function onSubmit(e) {
    e.preventDefault();
    run(input);
    if (input.trim()) setHistory((h) => [input, ...h]);
    setInput("");
    setHIdx(-1);
  }
  function onKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hIdx + 1, history.length - 1);
      if (history[n] !== void 0) {
        setHIdx(n);
        setInput(history[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(hIdx - 1, -1);
      setHIdx(n);
      setInput(n === -1 ? "" : history[n]);
    }
  }
  if (!open) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm rise",
      onMouseDown: onClose,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 shadow-2xl",
          onMouseDown: (e) => e.stopPropagation(),
          style: { backgroundColor: "var(--terminal-bg)" },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-2.5", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  "aria-label": "Close",
                  onClick: onClose,
                  className: "h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-[#febc2e]" }),
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-[#28c840]" }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 text-center font-mono-ui text-xs text-white/60", children: "nancy — -zsh — 80×24" }),
              /* @__PURE__ */ jsx("div", { className: "w-12" })
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                ref: scrollRef,
                className: "term-scroll h-[60vh] max-h-[520px] overflow-y-auto px-4 py-3 font-mono-ui text-[13px] leading-relaxed",
                style: { color: "var(--terminal-fg)" },
                onClick: () => inputRef.current?.focus(),
                children: [
                  lines.map((l, i) => /* @__PURE__ */ jsx(
                    "pre",
                    {
                      className: "whitespace-pre-wrap break-words",
                      style: {
                        color: l.kind === "sys" ? "var(--terminal-dim)" : l.kind === "in" ? "var(--terminal-fg)" : "var(--terminal-fg)"
                      },
                      children: l.kind === "in" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx("span", { style: { color: "var(--terminal-prompt)" }, children: "nancy@portfolio" }),
                        /* @__PURE__ */ jsx("span", { style: { color: "var(--terminal-dim)" }, children: " ~ " }),
                        /* @__PURE__ */ jsx("span", { style: { color: "var(--terminal-accent)" }, children: "$ " }),
                        l.text
                      ] }) : l.text
                    },
                    i
                  )),
                  /* @__PURE__ */ jsxs("form", { onSubmit, className: "flex items-center", children: [
                    /* @__PURE__ */ jsx("span", { style: { color: "var(--terminal-prompt)" }, children: "nancy@portfolio" }),
                    /* @__PURE__ */ jsx("span", { style: { color: "var(--terminal-dim)" }, children: " ~ " }),
                    /* @__PURE__ */ jsx("span", { style: { color: "var(--terminal-accent)" }, children: "$ " }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        ref: inputRef,
                        value: input,
                        onChange: (e) => setInput(e.target.value),
                        onKeyDown,
                        spellCheck: false,
                        autoComplete: "off",
                        className: "flex-1 bg-transparent font-mono-ui text-[13px] outline-none",
                        style: {
                          color: "var(--terminal-fg)",
                          caretColor: "var(--terminal-accent)"
                        }
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function Index() {
  const [termOpen, setTermOpen] = useState(false);
  useEffect(() => {
    function onKey(e) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTermOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-5xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("a", { href: "#top", className: "font-mono-ui text-sm tracking-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "~/" }),
        "nancy.dev"
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden gap-7 text-sm text-muted-foreground sm:flex", children: [
        /* @__PURE__ */ jsx("a", { href: "#work", className: "transition hover:text-foreground", children: "Work" }),
        /* @__PURE__ */ jsx("a", { href: "#experience", className: "transition hover:text-foreground", children: "Experience" }),
        /* @__PURE__ */ jsx("a", { href: "#stack", className: "transition hover:text-foreground", children: "Stack" }),
        /* @__PURE__ */ jsx("a", { href: "#contact", className: "transition hover:text-foreground", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setTermOpen(true), className: "group inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 font-mono-ui text-xs text-foreground transition hover:border-accent hover:bg-accent/10", "aria-label": "Open terminal", children: [
        /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent" }),
        /* @__PURE__ */ jsx("span", { children: "terminal" }),
        /* @__PURE__ */ jsx("kbd", { className: "hidden text-muted-foreground sm:inline", children: "⌘K" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "top", className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-grid pointer-events-none absolute inset-0 opacity-60" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-5xl px-6 pb-24 pt-24 sm:pt-32", children: [
        /* @__PURE__ */ jsxs("p", { className: "rise font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "caret mr-1 inline-block h-2 w-2 rounded-full bg-accent align-middle" }),
          "available for new-grad roles · ",
          profile.location
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "rise mt-6 max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl", children: [
          "Hi, I'm",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-display italic", children: profile.name.split(" ")[0] }),
          ".",
          /* @__PURE__ */ jsx("br", {}),
          "I build software that",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-display italic", children: "feels right" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "rise mt-7 max-w-xl text-lg text-muted-foreground", style: {
          animationDelay: "120ms"
        }, children: profile.tagline }),
        /* @__PURE__ */ jsxs("div", { className: "rise mt-10 flex flex-wrap gap-3", style: {
          animationDelay: "200ms"
        }, children: [
          /* @__PURE__ */ jsxs("a", { href: `mailto:${profile.email}`, className: "link-arrow rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition hover:bg-primary/90", children: [
            "Get in touch ",
            /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
          ] }),
          /* @__PURE__ */ jsx("a", { href: profile.github, target: "_blank", rel: "noreferrer", className: "rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-foreground", children: "GitHub" }),
          /* @__PURE__ */ jsx("a", { href: profile.linkedin, target: "_blank", rel: "noreferrer", className: "rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-foreground", children: "LinkedIn" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setTermOpen(true), className: "rounded-full border border-dashed border-accent/70 px-5 py-2.5 font-mono-ui text-xs text-foreground transition hover:bg-accent/10", children: "$ open terminal" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "stack", className: "border-y border-border/60 bg-secondary/40 py-6", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "marquee-track flex w-max gap-10 whitespace-nowrap font-mono-ui text-sm text-muted-foreground", children: [...flatSkills, ...flatSkills].map((s, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-10", children: [
      s,
      /* @__PURE__ */ jsx("span", { className: "text-accent", children: "/" })
    ] }, i)) }) }) }),
    /* @__PURE__ */ jsxs("section", { id: "work", className: "mx-auto max-w-5xl px-6 py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-medium tracking-tight sm:text-4xl", children: [
          "Selected ",
          /* @__PURE__ */ jsx("span", { className: "font-display italic", children: "work" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-mono-ui text-xs text-muted-foreground", children: [
          "0",
          projects.length,
          " projects"
        ] })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border", children: projects.map((p, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: p.link, target: "_blank", rel: "noreferrer", className: "group grid grid-cols-12 gap-6 py-8 transition", children: [
        /* @__PURE__ */ jsxs("span", { className: "col-span-12 font-mono-ui text-xs text-muted-foreground sm:col-span-1", children: [
          "0",
          i + 1
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-12 sm:col-span-7", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-medium tracking-tight transition group-hover:text-accent sm:text-3xl", children: [
            p.name,
            /* @__PURE__ */ jsx("span", { className: "ml-2 inline-block opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100", children: "↗" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: p.blurb })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-12 flex flex-wrap items-start gap-2 sm:col-span-4 sm:justify-end", children: p.stack.map((s) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border px-2.5 py-1 font-mono-ui text-[11px] text-muted-foreground", children: s }, s)) })
      ] }) }, p.name)) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "experience", className: "border-t border-border/60 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-6 py-24", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-12 text-3xl font-medium tracking-tight sm:text-4xl", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display italic", children: "Experience" }),
        " & education"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-12 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-6 font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Work" }),
          /* @__PURE__ */ jsx("ol", { className: "relative space-y-8 border-l border-border pl-6", children: experience.map((e, i) => /* @__PURE__ */ jsxs("li", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-accent" }),
            /* @__PURE__ */ jsx("p", { className: "font-mono-ui text-xs text-muted-foreground", children: e.period }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg font-medium", children: e.role }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              e.company,
              " · ",
              e.location
            ] })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-6 font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Education" }),
          /* @__PURE__ */ jsx("ol", { className: "relative space-y-8 border-l border-border pl-6", children: education.map((e, i) => /* @__PURE__ */ jsxs("li", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-foreground" }),
            /* @__PURE__ */ jsx("p", { className: "font-mono-ui text-xs text-muted-foreground", children: e.period }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg font-medium", children: e.degree }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              e.school,
              " · ",
              e.detail
            ] })
          ] }, i)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "contact", className: "mx-auto max-w-5xl px-6 py-28", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl font-medium tracking-tight sm:text-6xl", children: [
        "Let's build ",
        /* @__PURE__ */ jsx("span", { className: "font-display italic", children: "something" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 max-w-lg text-muted-foreground", children: [
        "Open to new-grad SWE roles. The fastest way to reach me is email — or open the terminal and type",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-foreground", children: "contact" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxs("a", { href: `mailto:${profile.email}`, className: "link-arrow rounded-full bg-primary px-6 py-3 text-primary-foreground", children: [
          profile.email,
          " ",
          /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
        ] }),
        /* @__PURE__ */ jsx("a", { href: profile.linkedin, target: "_blank", rel: "noreferrer", className: "rounded-full border border-border px-6 py-3 transition hover:border-foreground", children: "LinkedIn" }),
        /* @__PURE__ */ jsx("a", { href: profile.github, target: "_blank", rel: "noreferrer", className: "rounded-full border border-border px-6 py-3 transition hover:border-foreground", children: "GitHub" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border/60", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-6 py-8 font-mono-ui text-xs text-muted-foreground sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        profile.name,
        ". Crafted with too much ☕."
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setTermOpen(true), className: "hover:text-foreground", children: "press ⌘K for terminal →" })
    ] }) }),
    /* @__PURE__ */ jsx(Terminal, { open: termOpen, onClose: () => setTermOpen(false) })
  ] });
}
export {
  Index as component
};
