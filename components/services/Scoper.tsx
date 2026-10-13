"use client";

import { AnimatePresence, m } from "framer-motion";
import { Download, FileText, Mail, MessageSquare, RotateCcw, Send, Sparkles } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/data/site";
import { SectionIntro } from "@/components/ui/SectionLabel";
import { blueprintToMarkdown, buildBlueprint, scoperQuestions, type Blueprint, type ScoperAnswers } from "@/lib/scoper";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Message = { from: "bot" | "you"; text: string };

const empty: ScoperAnswers = { idea: "", audience: "", mustHaves: "", integrations: "" };
const panelClass =
  "relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface/60 shadow-2xl shadow-black/5";

function BlueprintView({ blueprint }: { blueprint: Blueprint }) {
  const section = (title: string, children: React.ReactNode) => (
    <div className="border-t border-ink/10 py-5">
      <h4 className="mb-3 font-mono text-mini tracking-meta text-ink/40 uppercase">{title}</h4>
      {children}
    </div>
  );

  return (
    <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOutExpo }}>
      <p className="font-mono text-mini tracking-meta text-accent uppercase">Draft blueprint</p>
      <h3 className="mt-2 font-syne text-2xl font-extrabold text-ink">{blueprint.title}</h3>
      <p className="mt-2 mb-5 text-sm leading-relaxed text-ink/60">{blueprint.summary}</p>
      {section(
        "Goals",
        <ul className="space-y-2 text-sm text-ink/75">
          {blueprint.goals.map((g) => (
            <li key={g} className="flex gap-2.5">
              <span aria-hidden className="text-accent">
                ▸
              </span>
              {g}
            </li>
          ))}
        </ul>,
      )}
      {section(
        "Features",
        <ul className="flex flex-wrap gap-2">
          {blueprint.features.map((f) => (
            <li key={f} className="border border-ink/12 px-2.5 py-1 text-xs text-ink/70">
              {f}
            </li>
          ))}
        </ul>,
      )}
      {section(
        "Tech stack",
        <dl className="space-y-3 text-sm">
          {blueprint.stack.map((s) => (
            <div key={s.layer} className="grid grid-cols-[5.5rem_1fr] gap-3">
              <dt className="font-mono text-mini tracking-tag text-ink/40 uppercase">{s.layer}</dt>
              <dd>
                <span className="text-ink/85">{s.choice}</span>
                <span className="block text-xs text-ink/45">{s.why}</span>
              </dd>
            </div>
          ))}
        </dl>,
      )}
      {section(
        "User flows",
        <ol className="list-decimal space-y-2 pl-4 text-sm text-ink/70 marker:text-ink/30">
          {blueprint.flows.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ol>,
      )}
      {section(
        "Timeline",
        <ul className="space-y-1.5 text-sm">
          {blueprint.timeline.map((t) => (
            <li key={t.week} className="flex gap-3">
              <span className="w-16 shrink-0 font-mono text-mini tracking-tag text-accent uppercase">{t.week}</span>
              <span className="text-ink/70">{t.focus}</span>
            </li>
          ))}
        </ul>,
      )}
    </m.div>
  );
}

/**
 * Guided scoping chat. Four questions in, a draft PRD out — all computed
 * locally (see lib/scoper.ts). The blueprint can be downloaded as Markdown
 * or sent to Sazzad by email.
 */
export function Scoper() {
  const inputId = useId();
  const [answers, setAnswers] = useState<ScoperAnswers>(empty);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [tab, setTab] = useState<"chat" | "blueprint">("chat");
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const done = step >= scoperQuestions.length;
  const phase = done ? "Phase 3: Blueprint" : step === 0 ? "Phase 1: Analysis" : "Phase 2: Details";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || done || thinking) return;
    const q = scoperQuestions[step];
    const next = { ...answers, [q.key]: text };
    const firstQuestion = messages.length === 0 ? [{ from: "bot" as const, text: q.prompt }] : [];
    setAnswers(next);
    setMessages((cur) => [...cur, ...firstQuestion, { from: "you", text }]);
    setDraft("");
    setThinking(true);

    timer.current = setTimeout(() => {
      setThinking(false);
      const nextStep = step + 1;
      setStep(nextStep);
      if (nextStep < scoperQuestions.length) {
        setMessages((cur) => [...cur, { from: "bot", text: scoperQuestions[nextStep].prompt }]);
      } else {
        setBlueprint(buildBlueprint(next));
        setMessages((cur) => [
          ...cur,
          {
            from: "bot",
            text: "That's enough to sketch it. Your draft blueprint is ready — goals, features, stack, flows and a four-week plan.",
          },
        ]);
        setTab("blueprint");
      }
    }, 650);
  }

  function reset() {
    clearTimeout(timer.current);
    setAnswers(empty);
    setStep(0);
    setMessages([]);
    setDraft("");
    setThinking(false);
    setBlueprint(null);
    setTab("chat");
  }

  function download() {
    if (!blueprint) return;
    const blob = new Blob([blueprintToMarkdown(blueprint)], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${
      blueprint.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "project"
    }-blueprint.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const mailHref = blueprint
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Project scope: ${blueprint.title}`)}&body=${encodeURIComponent(blueprintToMarkdown(blueprint))}`
    : undefined;

  const current = scoperQuestions[Math.min(step, scoperQuestions.length - 1)];

  return (
    <section id="scoper" className="relative mb-16 scroll-mt-20 overflow-hidden px-3" aria-labelledby="scoper-title">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-ink/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-ink/5 blur-3xl" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl">
        <SectionIntro
          eyebrow="Try it out"
          title={<span id="scoper-title">Got an idea? Let&apos;s think it through</span>}
          lead="Describe what you want to build. I built this tool to help us both figure out what a project actually needs — before anyone writes a line of code."
          className="my-16"
        />

        <div
          className="mx-auto mb-6 flex w-full max-w-md rounded-xl border border-ink/10 bg-ink/5 p-1 lg:hidden"
          role="tablist"
          aria-label="Scoper view"
        >
          {(["chat", "blueprint"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all",
                tab === t ? "bg-ink/10 text-ink shadow-sm" : "text-ink/60 hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid h-[min(85dvh,760px)] gap-6 lg:grid-cols-2">
          {/* Chat */}
          <div className={cn(panelClass, tab !== "chat" && "hidden lg:flex")}>
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/10 bg-ink/5 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-ink/10 p-2">
                  <Sparkles aria-hidden className="h-5 w-5 text-ink" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink">Project Assistant</h3>
                  <p className="text-xs text-ink/60">Guided scoping · runs in your browser</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-ink/10 bg-ink/5 px-3 py-1 text-xs font-medium whitespace-nowrap text-ink/75">
                {phase}
              </span>
            </div>

            <div ref={scrollRef} className="thin-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto p-6" aria-live="polite">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center text-ink/60">
                  <MessageSquare aria-hidden className="mb-4 h-12 w-12 text-ink/40" />
                  <p className="text-base font-medium text-ink/75">Tell me about your idea</p>
                  <p className="mt-1 text-sm text-ink/50">&ldquo;I want to build a…&rdquo;</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn("flex", msg.from === "you" ? "justify-end" : "justify-start")}
                    >
                      <p
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                          msg.from === "you"
                            ? "rounded-br-sm bg-ink text-surface"
                            : "rounded-bl-sm border border-ink/10 bg-surface-3 text-ink/85",
                        )}
                      >
                        {msg.text}
                      </p>
                    </m.div>
                  ))}
                  {thinking && (
                    <m.p
                      key="thinking"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-mono text-mini tracking-meta text-ink/40 uppercase"
                    >
                      thinking…
                    </m.p>
                  )}
                </AnimatePresence>
              )}
            </div>

            <div className="flex shrink-0 items-center border-t border-ink/10 bg-ink/5 px-6 py-4">
              {done ? (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink"
                >
                  <RotateCcw aria-hidden className="h-4 w-4" /> Start over
                </button>
              ) : (
                <form onSubmit={send} className="flex w-full items-end gap-3">
                  <label htmlFor={inputId} className="sr-only">
                    {current.prompt}
                  </label>
                  <textarea
                    id={inputId}
                    value={draft}
                    rows={1}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder={current.placeholder}
                    disabled={thinking}
                    className="thin-scrollbar max-h-[120px] min-h-[50px] flex-1 resize-none rounded-xl border border-ink/10 bg-surface/40 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:ring-1 focus:ring-ink/50 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!draft.trim() || thinking}
                    className="flex h-[50px] w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-surface transition-colors hover:bg-ink/85 disabled:opacity-50"
                  >
                    <Send aria-hidden className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Blueprint */}
          <div className={cn(panelClass, tab !== "blueprint" && "hidden lg:flex")}>
            {blueprint ? (
              <>
                <div className="thin-scrollbar min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
                  <BlueprintView blueprint={blueprint} />
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-3 border-t border-ink/10 bg-ink/5 px-6 py-4">
                  <button
                    type="button"
                    onClick={download}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-ink/85"
                  >
                    <Download aria-hidden className="h-4 w-4" /> Download .md
                  </button>
                  <a
                    href={mailHref}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/10"
                  >
                    <Mail aria-hidden className="h-4 w-4" /> Send it to {site.shortName}
                  </a>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-ink/50">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-ink/10 bg-ink/5">
                  <FileText aria-hidden className="h-10 w-10 opacity-50" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-ink">PRD Generator</h3>
                <p className="max-w-xs text-sm leading-relaxed text-ink/60">
                  Your project blueprint will appear here after the analysis phase is complete.
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-mini tracking-tag text-ink/35 uppercase">
          This demo runs entirely in your browser — nothing you type is sent anywhere.
        </p>
      </div>
    </section>
  );
}
