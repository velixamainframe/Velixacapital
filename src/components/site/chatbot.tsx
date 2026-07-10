"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Sparkles, ListTree, MessageCircle } from "lucide-react";
import { CONTACT, LOANS, TAX_ACCOUNTING, PROPERTY_SERVICES, CREDIT_CARD_TYPES, itemSlug } from "@/lib/site-data";
import { submitLead } from "@/lib/lead-submit";

/* ---------------- i18n ---------------- */
type LangCode = "en" | "hi" | "hinglish" | "mr" | "gu" | "bn" | "ta" | "te" | "kn" | "ml" | "pa";

const LANGS: { code: LangCode; native: string; english: string }[] = [
  { code: "en", native: "English", english: "English" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "hinglish", native: "Hinglish", english: "Hindi + English" },
  { code: "mr", native: "मराठी", english: "Marathi" },
  { code: "gu", native: "ગુજરાતી", english: "Gujarati" },
  { code: "bn", native: "বাংলা", english: "Bengali" },
  { code: "ta", native: "தமிழ்", english: "Tamil" },
  { code: "te", native: "తెలుగు", english: "Telugu" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada" },
  { code: "ml", native: "മലയാളം", english: "Malayalam" },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
];

type Category = "loan" | "credit-card" | "tax" | "property" | "expert";
const CATEGORIES: { id: Category; en: string; hi: string }[] = [
  { id: "loan", en: "Loans", hi: "लोन" },
  { id: "credit-card", en: "Credit Card", hi: "क्रेडिट कार्ड" },
  { id: "tax", en: "Tax / GST / Accounting", hi: "टैक्स / GST / अकाउंटिंग" },
  { id: "property", en: "Property Finance & Diligence", hi: "प्रॉपर्टी कंसल्टिंग" },
  { id: "expert", en: "Talk to Expert", hi: "एक्सपर्ट से बात करें" },
];

const T: Record<string, Partial<Record<LangCode, string>>> = {
  welcomeTitle: { en: "Hi 👋 Welcome to Velixa Capital", hi: "नमस्ते 👋 Velixa Capital में आपका स्वागत है", hinglish: "Hi 👋 Welcome to Velixa Capital" },
  pickLang: { en: "Please pick your language:", hi: "अपनी भाषा चुनें:", hinglish: "Apni language choose karein:" },
  pickService: { en: "How can we help today? Tap an option:", hi: "हम आपकी क्या मदद कर सकते हैं? कोई विकल्प चुनें:", hinglish: "Hum aapki kya help kar sakte hain? Koi option choose karein:" },
  askLoanAmount: { en: "How much loan do you need? (e.g. ₹5,00,000)", hi: "आपको कितना लोन चाहिए? (जैसे ₹5,00,000)", hinglish: "Kitna loan chahiye? (jaise ₹5,00,000)" },
  askName: { en: "Great 👍 Please share your full name.", hi: "बहुत बढ़िया 👍 कृपया अपना पूरा नाम बताएं।", hinglish: "Great 👍 Apna full name batayein." },
  askMobile: { en: "Thanks! Your 10-digit mobile number?", hi: "धन्यवाद! आपका 10 अंकों का मोबाइल नंबर?", hinglish: "Thanks! Aapka 10-digit mobile number?" },
  askCity: { en: "Which city are you in?", hi: "आप किस शहर में हैं?", hinglish: "Aap kis city me hain?" },
  askState: { en: "And which state?", hi: "और किस राज्य में?", hinglish: "Aur kis state me?" },
  askEmployment: { en: "Are you salaried or self-employed / business?", hi: "आप सैलरीड हैं या सेल्फ-एम्प्लॉयड / बिज़नेस?", hinglish: "Aap salaried hain ya self-employed / business?" },
  askIncome: { en: "What is your approximate monthly income (₹)?", hi: "आपकी अनुमानित मासिक आय (₹) क्या है?", hinglish: "Approximate monthly income (₹) kitni hai?" },
  askTurnover: { en: "What is your monthly business turnover (₹)?", hi: "आपका मासिक बिज़नेस टर्नओवर (₹) कितना है?", hinglish: "Monthly business turnover (₹) kitna hai?" },
  pickLoan: { en: "Which loan are you looking for?", hi: "आप कौन सा लोन चाहते हैं?", hinglish: "Aap kaunsa loan chahte hain?" },
  pickTax: { en: "Which service do you need?", hi: "आपको कौन सी सेवा चाहिए?", hinglish: "Kaunsi service chahiye?" },
  pickProperty: { en: "What kind of property help?", hi: "किस प्रकार की प्रॉपर्टी मदद?", hinglish: "Kis tarah ki property help chahiye?" },
  pickCard: { en: "Which card type interests you?", hi: "कौन सा कार्ड चाहिए?", hinglish: "Kaunsa card chahiye?" },
  anythingElse: { en: "Anything else we can help you with?", hi: "कुछ और मदद चाहिए?", hinglish: "Aur kuch help chahiye?" },
  yes: { en: "Yes, add another", hi: "हाँ, और जोड़ें", hinglish: "Haan, aur add karein" },
  no: { en: "No, that's all", hi: "नहीं, बस इतना ही", hinglish: "Nahi, bas itna" },
  thanks: { en: "✅ Thank you! Our expert will call you within 10–15 minutes.", hi: "✅ धन्यवाद! हमारे एक्सपर्ट 10–15 मिनट में आपको कॉल करेंगे।", hinglish: "✅ Thank you! Hamare expert 10–15 minutes me aapko call karenge." },
  invalidMobile: { en: "Please enter a valid 10-digit Indian mobile (starting 6–9).", hi: "कृपया सही 10 अंकों का भारतीय मोबाइल नंबर डालें (6–9 से शुरू)।", hinglish: "Sahi 10-digit Indian mobile number daalein (6-9 se shuru)." },
  invalidName: { en: "Please enter your full name (min 2 letters).", hi: "कृपया अपना पूरा नाम डालें (कम से कम 2 अक्षर)।", hinglish: "Pura name daalein (min 2 letters)." },
  invalidCity: { en: "Please type your city name.", hi: "कृपया अपने शहर का नाम लिखें।", hinglish: "City ka naam type karein." },
  invalidState: { en: "Please type your state name.", hi: "कृपया अपने राज्य का नाम लिखें।", hinglish: "State ka naam type karein." },
  expertNow: { en: `Sure — call our advisor at ${CONTACT.phone} or share your name & mobile and we'll call you back in 10 minutes.`, hi: `ज़रूर — हमारे एडवाइज़र को ${CONTACT.phone} पर कॉल करें या अपना नाम व मोबाइल शेयर करें, हम 10 मिनट में कॉलबैक करेंगे।`, hinglish: `Sure — advisor ko ${CONTACT.phone} par call karein ya naam & mobile share karein, hum 10 min me callback karenge.` },
  fallback: { en: "I didn't quite catch that 🤔 Please tap one of the options below.", hi: "मैं समझ नहीं पाया 🤔 कृपया नीचे दिए गए विकल्पों में से चुनें।", hinglish: "Samajh nahi aaya 🤔 Niche diye options me se choose karein." },
  salaried: { en: "Salaried", hi: "सैलरीड", hinglish: "Salaried" },
  selfEmployed: { en: "Self-employed / Business", hi: "सेल्फ-एम्प्लॉयड / बिज़नेस", hinglish: "Self-employed / Business" },
  changeLang: { en: "Change language", hi: "भाषा बदलें", hinglish: "Language badlein" },
  startOver: { en: "Start over", hi: "फिर से शुरू करें", hinglish: "Phir se shuru karein" },
};

function t(key: string, lang: LangCode): string {
  return T[key]?.[lang] ?? T[key]?.en ?? key;
}

type Step = "lang" | "category" | "sub_loan" | "sub_tax" | "sub_property" | "sub_card" | "loan_amount" | "employment" | "income" | "city" | "state" | "name" | "mobile" | "more" | "done";
type Msg = { role: "bot" | "user"; text: string; options?: { label: string; value: string }[] };
type Lead = { service?: string; interests?: string[]; loan_amount?: number; employment_type?: "salaried" | "self_employed"; monthly_income?: number; city?: string; state?: string; name?: string; mobile?: string };

function parseAmount(s: string): number | null {
  const cleaned = s.toLowerCase().replace(/[, ₹]/g, "").trim();
  const m = cleaned.match(/^([\d.]+)\s*(lakh|lac|l|cr|crore|k|thousand)?$/);
  if (!m) { const n = Number(cleaned); return Number.isFinite(n) && n > 0 ? n : null; }
  const n = Number(m[1]);
  if (!Number.isFinite(n)) return null;
  const unit = m[2] ?? "";
  if (/lakh|lac|^l$/.test(unit)) return n * 100000;
  if (/cr|crore/.test(unit)) return n * 10000000;
  if (/k|thousand/.test(unit)) return n * 1000;
  return n;
}

const categoryLabel = (id: Category, lang: LangCode) => { const s = CATEGORIES.find((x) => x.id === id)!; return lang === "hi" ? s.hi : s.en; };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  // Auto-popup teaser — appears 5s after first visit, before the user opens the chat
  const [showTeaser, setShowTeaser] = useState(false);
  const [mode, setMode] = useState<"guided" | "ai">("guided");
  const [lang, setLang] = useState<LangCode | null>(null);
  const [step, setStep] = useState<Step>("lang");
  const [lead, setLead] = useState<Lead>({});
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-open the chat window 5 seconds after the user enters the site.
  // We only do this once per session (guarded by sessionStorage) so it doesn't
  // annoy returning visitors who already closed it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let dismissed = false;
    try { dismissed = sessionStorage.getItem("vcs_chat_autoopened") === "1"; } catch {}
    if (dismissed) return;
    const id = window.setTimeout(() => {
      try { sessionStorage.setItem("vcs_chat_autoopened", "1"); } catch {}
      setOpen(true);
    }, 5000);
    return () => window.clearTimeout(id);
  }, []);

  // Teaser bubble — appears after 2.5s if the user hasn't opened the chat yet.
  useEffect(() => {
    if (open) { setShowTeaser(false); return; }
    let dismissed = false;
    try { dismissed = sessionStorage.getItem("vcs_chat_teaser_shown") === "1"; } catch {}
    if (dismissed) return;
    const id = window.setTimeout(() => setShowTeaser(true), 2500);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, aiTyping]);

  useEffect(() => {
    if (!open || messages.length) return;
    setMessages([
      { role: "bot", text: "Hi 👋 Welcome to Velixa Capital" },
      { role: "bot", text: "Please pick your language / अपनी भाषा चुनें:", options: LANGS.map((l) => ({ label: l.native, value: l.code })) },
    ]);
    setStep("lang");
  }, [open, messages.length]);

  function pushBot(text: string, options?: Msg["options"]) { setMessages((m) => [...m, { role: "bot", text, options }]); }
  function pushUser(text: string) { setMessages((m) => [...m, { role: "user", text }]); }
  function addInterest(label: string) { setLead((d) => ({ ...d, service: label, interests: [...(d.interests ?? []), label] })); }

  function startCategory(cat: Category, l: LangCode) {
    pushUser(categoryLabel(cat, l));
    if (cat === "expert") { addInterest("Talk to Expert"); pushBot(t("expertNow", l)); pushBot(t("askName", l)); setStep("name"); return; }
    if (cat === "loan") { pushBot(t("pickLoan", l), LOANS.slice(0, 8).map((x) => ({ label: x.name, value: x.slug }))); setStep("sub_loan"); return; }
    if (cat === "tax") { pushBot(t("pickTax", l), TAX_ACCOUNTING.items.map((x) => ({ label: x.name, value: itemSlug(x) }))); setStep("sub_tax"); return; }
    if (cat === "property") { pushBot(t("pickProperty", l), PROPERTY_SERVICES.items.map((x) => ({ label: x.name, value: itemSlug(x) }))); setStep("sub_property"); return; }
    if (cat === "credit-card") { pushBot(t("pickCard", l), CREDIT_CARD_TYPES.map((x) => ({ label: x.name, value: x.slug }))); setStep("sub_card"); return; }
  }

  function handleOption(value: string) {
    if (step === "lang") {
      const code = value as LangCode; setLang(code);
      pushUser(LANGS.find((x) => x.code === code)?.native ?? code);
      pushBot(t("welcomeTitle", code));
      pushBot(t("pickService", code), CATEGORIES.map((s) => ({ label: code === "hi" ? s.hi : s.en, value: s.id })));
      setStep("category"); return;
    }
    if (!lang) return;
    if (step === "category") { startCategory(value as Category, lang); return; }
    if (step === "sub_loan") { const loan = LOANS.find((l) => l.slug === value); const label = loan?.name ?? value; addInterest(label); pushUser(label); pushBot(t("askLoanAmount", lang)); setStep("loan_amount"); return; }
    if (step === "sub_tax") { const item = TAX_ACCOUNTING.items.find((i) => itemSlug(i) === value); const label = item?.name ?? value; addInterest(label); pushUser(label); pushBot(t("askCity", lang)); setStep("city"); return; }
    if (step === "sub_property") { const item = PROPERTY_SERVICES.items.find((i) => itemSlug(i) === value); const label = item?.name ?? value; addInterest(label); pushUser(label); pushBot(t("askCity", lang)); setStep("city"); return; }
    if (step === "sub_card") { const item = CREDIT_CARD_TYPES.find((c) => c.slug === value); const label = item?.name ?? value; addInterest(label); pushUser(label); pushBot(t("askName", lang)); setStep("name"); return; }
    if (step === "employment") { const v = value as "salaried" | "self_employed"; setLead((d) => ({ ...d, employment_type: v })); pushUser(t(v === "salaried" ? "salaried" : "selfEmployed", lang)); pushBot(t(v === "salaried" ? "askIncome" : "askTurnover", lang)); setStep("income"); return; }
    if (step === "more") { pushUser(value === "yes" ? t("yes", lang) : t("no", lang)); if (value === "yes") { pushBot(t("pickService", lang), CATEGORIES.map((s) => ({ label: lang === "hi" ? s.hi : s.en, value: s.id }))); setStep("category"); } else { pushBot(`📞 ${CONTACT.phone}\n📧 ${CONTACT.email}`); setStep("done"); } return; }
  }

  async function handleText(raw: string) {
    const text = raw.trim();
    if (!text) return;
    if (mode === "ai") { await handleAi(text); return; }
    if (!lang) return;
    pushUser(text); setInput("");
    switch (step) {
      case "loan_amount": { const amt = parseAmount(text); if (!amt) { pushBot(t("askLoanAmount", lang)); return; } setLead((d) => ({ ...d, loan_amount: amt })); pushBot(t("askEmployment", lang), [{ label: t("salaried", lang), value: "salaried" }, { label: t("selfEmployed", lang), value: "self_employed" }]); setStep("employment"); return; }
      case "income": { const amt = parseAmount(text); if (!amt) { pushBot(t(lead.employment_type === "salaried" ? "askIncome" : "askTurnover", lang)); return; } setLead((d) => ({ ...d, monthly_income: amt })); pushBot(t("askCity", lang)); setStep("city"); return; }
      case "city": { if (text.length < 2) { pushBot(t("invalidCity", lang)); return; } setLead((d) => ({ ...d, city: text })); pushBot(t("askState", lang)); setStep("state"); return; }
      case "state": { if (text.length < 2) { pushBot(t("invalidState", lang)); return; } setLead((d) => ({ ...d, state: text })); pushBot(t("askName", lang)); setStep("name"); return; }
      case "name": { if (text.length < 2) { pushBot(t("invalidName", lang)); return; } setLead((d) => ({ ...d, name: text })); pushBot(t("askMobile", lang)); setStep("mobile"); return; }
      case "mobile": {
        const digits = text.replace(/\D/g, "");
        if (!/^[6-9]\d{9}$/.test(digits)) { pushBot(t("invalidMobile", lang)); return; }
        const finalLead = { ...lead, mobile: digits }; setLead(finalLead); setSubmitting(true);
        try {
          await submitLead({ name: finalLead.name ?? "Chatbot lead", mobile: digits, email: "noreply@velixacapital.in", city: finalLead.city ?? "Not specified", loan_amount: finalLead.loan_amount, employment_type: finalLead.employment_type, monthly_income: finalLead.monthly_income, service: finalLead.service, message: `Chatbot · lang=${lang} · state=${finalLead.state ?? "-"} · interests=${(finalLead.interests ?? []).join(", ")}` }, typeof window !== "undefined" ? window.location.pathname : "/chatbot");
        } catch (e) { console.warn("Lead submit failed", e); } finally { setSubmitting(false); }
        pushBot(t("thanks", lang)); pushBot(t("anythingElse", lang), [{ label: t("yes", lang), value: "yes" }, { label: t("no", lang), value: "no" }]); setStep("more"); return;
      }
      default: pushBot(t("fallback", lang));
    }
  }

  async function handleAi(text: string) {
    pushUser(text); setInput(""); setAiTyping(true);
    try {
      const history = messages.map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text }));
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, history }) });
      const data = await res.json();
      pushBot(data.reply || "Sorry, I couldn't process that. Please call us at " + CONTACT.phone + ".");
    } catch {
      pushBot(`I'm having trouble connecting right now. Please call ${CONTACT.phone} and our advisor will help immediately.`);
    } finally { setAiTyping(false); }
  }

  function reset() { setMessages([]); setLead({}); setLang(null); setStep("lang"); }
  function switchMode(m: "guided" | "ai") {
    setMode(m); reset();
    if (m === "ai") {
      setMessages([
        { role: "bot", text: "Hi! I'm the Velixa AI Advisor 🤖 I can help with loans, credit cards, GST/ITR, property finance, and eligibility questions. What would you like to know?" },
        { role: "bot", text: "Here are some things you can ask me:", options: [
          { label: "Business loan eligibility?", value: "What's the eligibility for a business loan?" },
          { label: "Improve my CIBIL score", value: "How can I improve my CIBIL score?" },
          { label: "Home loan rates?", value: "What are the current home loan rates?" },
          { label: "My loan was rejected", value: "My loan was rejected, what should I do?" },
          { label: "GST registration help", value: "I need help with GST registration" },
          { label: "Talk to a human", value: "I want to talk to an expert" },
        ] },
      ]);
    }
  }

  const optionSteps = ["lang", "category", "employment", "sub_loan", "sub_tax", "sub_property", "sub_card", "more", "done"];

  return (
    <>
      {/* ===== Capsule launcher — fixed bottom-right ===== */}
      <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        {/* Teaser bubble */}
        <AnimatePresence>
          {showTeaser && !open && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => { setOpen(true); setShowTeaser(false); try { sessionStorage.setItem("vcs_chat_teaser_shown", "1"); } catch {} }}
              className="group mb-1 flex max-w-[260px] items-center gap-2 rounded-2xl rounded-br-sm border border-border bg-card px-4 py-3 text-left shadow-[var(--shadow-elegant)]"
            >
              <img src="/advisor.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-full object-cover" />
              <span className="text-xs leading-tight text-foreground">
                <span className="block font-semibold text-primary">Need help? Let&apos;s talk 👋</span>
                <span className="block text-muted-foreground">Free loan review · Reply in 10 mins</span>
              </span>
              <X
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70 hover:text-foreground"
                onClick={(e) => { e.stopPropagation(); setShowTeaser(false); try { sessionStorage.setItem("vcs_chat_teaser_shown", "1"); } catch {} }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Capsule-shaped launcher button */}
        <motion.button
          onClick={() => { setOpen((v) => !v); setShowTeaser(false); }}
          aria-label={open ? "Close chat" : "Open chat with Velixa Advisor"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex h-12 items-center gap-2.5 rounded-full bg-gradient-gold py-0 pl-4 pr-5 text-gold-foreground shadow-[0_10px_30px_-8px_oklch(0.78_0.13_80/0.55)] ring-2 ring-gold/30 transition-shadow hover:shadow-[0_15px_40px_-8px_oklch(0.78_0.13_80/0.65)] sm:h-14 sm:pl-5 sm:pr-6"
        >
          {open ? (
            <X className="h-5 w-5 shrink-0" />
          ) : (
            <>
              <span className="relative flex shrink-0">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
              </span>
              <span className="text-sm font-semibold sm:text-base">Chat with Advisor</span>
            </>
          )}
        </motion.button>
      </div>

      {/* ===== Chat panel — pops up above the capsule ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-20 right-4 z-[60] flex h-[min(560px,80vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elegant)] sm:bottom-24 sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <img src="/advisor.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover ring-2 ring-primary-foreground/30" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base leading-tight">Velixa Advisor</p>
                <p className="text-[11px] text-primary-foreground/75"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />Online · usually replies in seconds</p>
              </div>
              <button onClick={reset} title="Start over" className="text-[11px] text-primary-foreground/80 hover:text-gold">↺</button>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-primary-foreground/10"><X className="h-4 w-4" /></button>
            </div>

            {/* Mode tabs */}
            <div className="flex gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
              <button onClick={() => switchMode("guided")} className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium ${mode === "guided" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"}`}><ListTree className="h-3 w-3" /> Guided</button>
              <button onClick={() => switchMode("ai")} className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium ${mode === "ai" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"}`}><Sparkles className="h-3 w-3" /> Ask AI</button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="scroll-thin flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[85%] space-y-2">
                    <div className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border border-border bg-card text-foreground"}`}>{m.text}</div>
                    {m.options && i === messages.length - 1 && (
                      <div className="flex flex-wrap gap-1.5">{m.options.map((o) => (<button key={o.value} onClick={() => mode === "guided" ? handleOption(o.value) : handleText(o.value)} className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{o.label}</button>))}</div>
                    )}
                  </div>
                </motion.div>
              ))}
              {submitting && <p className="text-center text-xs text-muted-foreground">Saving your details…</p>}
              {aiTyping && (
                <div className="flex justify-start"><div className="rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm"><span className="inline-flex gap-1"><span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} /><span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} /><span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} /></span></div></div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleText(input); }} className="flex items-center gap-2 border-t border-border bg-card p-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "ai" ? "Ask anything about loans, tax, property…" : (optionSteps.includes(step) ? "Tap an option above ↑" : "Type your reply…")} className="input flex-1" disabled={submitting || aiTyping || (mode === "guided" && optionSteps.includes(step))} />
              <button type="submit" disabled={submitting || aiTyping || !input.trim()} aria-label="Send" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-40"><Send className="h-4 w-4" /></button>
            </form>
            <p className="border-t border-border bg-muted/40 px-3 py-1.5 text-center text-[10px] text-muted-foreground">Velixa Capital · Call {CONTACT.phone} for instant help</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
