import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import {
  BookOpen,
  Bot,
  Calculator,
  ChevronDown,
  Clock,
  FileText,
  Globe,
  History,
  Menu,
  MessageSquare,
  Mic,
  MicOff,
  PenLine,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Star,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Role,
  useSaveMessage,
  useSetUserPreferences,
} from "./hooks/useQueries";
import {
  LANGUAGES,
  type Language,
  getAIResponse,
  translatePhrase,
} from "./utils/aiEngine";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  language: string;
  timestamp: Date;
};

type ActiveTool = "translate" | "summarize" | "research" | "draft" | null;
type ActiveApp =
  | "calculator"
  | "notes"
  | "clock"
  | "calendar"
  | "translator"
  | null;
type NavItem =
  | "shortcuts"
  | "conversations"
  | "assistants"
  | "history"
  | "settings";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      'Hello! I\'m LinguaBot 🌐 — your intelligent multilingual AI assistant. I can answer questions in 10 languages, help with translations, science, history, math calculations, and much more!\n\nTry asking me: "What is 25 × 18?", "Tell me about space", or switch the language and ask anything!',
    language: "en",
    timestamp: new Date(),
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm"
        style={{ background: "oklch(var(--assistant-bubble))" }}
      >
        <div className="flex gap-1 items-center h-4">
          <div className="typing-dot w-2 h-2 rounded-full bg-primary/70" />
          <div className="typing-dot w-2 h-2 rounded-full bg-primary/70" />
          <div className="typing-dot w-2 h-2 rounded-full bg-primary/70" />
        </div>
      </div>
    </div>
  );
}

function WaveformBars() {
  return (
    <div className="flex items-center gap-0.5 h-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="wave-bar w-0.5 h-full rounded-full bg-primary"
        />
      ))}
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    LANGUAGES[0],
  );
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [activeApp, setActiveApp] = useState<ActiveApp>(null);
  const [activeNav, setActiveNav] = useState<NavItem>("shortcuts");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const saveMessage = useSaveMessage();
  const setUserPreferences = useSetUserPreferences();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message/typing change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setUserPreferences is stable
  useEffect(() => {
    setUserPreferences.mutate({
      preferredLanguage: selectedLanguage.code,
      voiceEnabled,
    });
  }, [selectedLanguage.code, voiceEnabled]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        language: selectedLanguage.code,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setIsTyping(true);
      saveMessage.mutate({
        content: text.trim(),
        language: selectedLanguage.code,
        role: Role.user,
      });

      // Simulate AI thinking delay
      const thinkTime = 800 + Math.random() * 1200;
      setTimeout(() => {
        let response: string;

        // Handle tool mode
        if (activeTool === "translate") {
          response = translatePhrase(text.trim(), selectedLanguage.code);
        } else {
          response = getAIResponse(text.trim(), selectedLanguage.code);
        }

        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          language: selectedLanguage.code,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        saveMessage.mutate({
          content: response,
          language: selectedLanguage.code,
          role: Role.assistant,
        });

        // TTS
        if (voiceEnabled && window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(
            response.replace(/[*#]/g, "").replace(/\p{Emoji}/gu, ""),
          );
          utterance.lang = selectedLanguage.code;
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
      }, thinkTime);
    },
    [selectedLanguage, activeTool, voiceEnabled, saveMessage],
  );

  const handleToolAction = (tool: ActiveTool) => {
    setActiveTool(tool === activeTool ? null : tool);
    if (tool === "translate") {
      toast.info("Translate mode active — type a phrase to translate it!");
    } else if (tool === "summarize") {
      const lastAi = [...messages]
        .reverse()
        .find((m) => m.role === "assistant");
      if (lastAi) {
        const wordCount = lastAi.content.split(" ").length;
        toast.success(
          `Last response: ${wordCount} words. Ask me to summarize any topic!`,
        );
      }
    } else if (tool === "research") {
      toast.info("Research mode — ask me detailed questions about any topic!");
    } else if (tool === "draft") {
      toast.info("Draft mode — ask me to write emails, essays, or messages!");
    }
  };

  const startVoiceInput = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      toast.error("Voice input not supported in your browser.");
      return;
    }
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = selectedLanguage.code;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice recognition error. Try again!");
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopVoiceInput = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleCalcKey = (key: string) => {
    if (key === "=") {
      try {
        // biome-ignore lint/security/noGlobalEval: calculator feature requires eval
        const res = eval(calcInput);
        setCalcResult(String(res));
      } catch {
        setCalcResult("Error");
      }
    } else if (key === "C") {
      setCalcInput("");
      setCalcResult("");
    } else if (key === "⌫") {
      setCalcInput((prev) => prev.slice(0, -1));
    } else {
      setCalcInput((prev) => prev + key);
    }
  };

  const calcButtons = [
    "C",
    "⌫",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "(",
    "=",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Nav */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md"
        style={{ background: "oklch(var(--background) / 0.85)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center teal-glow-sm">
              <Sparkles className="w-4.5 h-4.5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">
              LinguaBot
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["Features", "Guide", "Account"].map((item) => (
              <button
                key={item}
                type="button"
                data-ocid={`nav.${item.toLowerCase()}.link`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              data-ocid="nav.get_started.primary_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 teal-glow-sm text-xs px-4"
            >
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-8 h-8"
              onClick={() => setSidebarOpen((p) => !p)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hero-glow py-14 text-center px-4"
      >
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 text-xs">
          <Sparkles className="w-3 h-3 mr-1" /> Multilingual AI · 10 Languages
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight text-balance mb-4">
          Your Multilingual <span className="text-primary">AI Assistant</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Ask anything, in any language. LinguaBot understands, responds, and
          helps — intelligently.
        </p>
      </motion.section>

      {/* Main Chat App */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex-1 max-w-7xl mx-auto w-full px-3 pb-6"
      >
        <div
          className="rounded-2xl border border-border overflow-hidden"
          style={{ background: "oklch(var(--card))", minHeight: "640px" }}
        >
          <div className="flex h-[640px]">
            {/* Left Sidebar */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 border-r border-border flex flex-col overflow-hidden"
                  style={{ background: "oklch(var(--sidebar))", width: 240 }}
                >
                  {/* Logo + New Chat */}
                  <div className="p-3 border-b border-border/60">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="font-semibold text-sm text-foreground">
                        LinguaBot
                      </span>
                    </div>
                    <Button
                      size="sm"
                      data-ocid="sidebar.new_chat.primary_button"
                      className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs gap-1.5"
                      variant="outline"
                      onClick={() => {
                        setMessages(INITIAL_MESSAGES);
                        toast.success("New conversation started!");
                      }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      New Chat
                    </Button>
                  </div>

                  {/* Nav items */}
                  <div className="p-2 border-b border-border/60">
                    {(
                      [
                        { id: "shortcuts", icon: Zap, label: "Shortcuts" },
                        {
                          id: "conversations",
                          icon: MessageSquare,
                          label: "My Conversations",
                        },
                        { id: "assistants", icon: Bot, label: "Assistants" },
                        { id: "history", icon: History, label: "History" },
                        { id: "settings", icon: Settings, label: "Settings" },
                      ] as { id: NavItem; icon: any; label: string }[]
                    ).map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        data-ocid={`sidebar.${item.id}.tab`}
                        onClick={() => setActiveNav(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all mb-0.5 ${
                          activeNav === item.id
                            ? "bg-primary/15 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                        }`}
                      >
                        <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Shortcuts / Apps */}
                  {activeNav === "shortcuts" && (
                    <div className="flex-1 p-2 overflow-auto">
                      <p className="text-xs text-muted-foreground px-2 mb-2 font-medium uppercase tracking-wider">
                        Shortcuts
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(
                          [
                            {
                              id: "calculator",
                              icon: Calculator,
                              label: "Calc",
                              color: "text-amber-400",
                            },
                            {
                              id: "notes",
                              icon: FileText,
                              label: "Notes",
                              color: "text-sky-400",
                            },
                            {
                              id: "clock",
                              icon: Clock,
                              label: "Clock",
                              color: "text-emerald-400",
                            },
                            {
                              id: "calendar",
                              icon: BookOpen,
                              label: "Calendar",
                              color: "text-violet-400",
                            },
                            {
                              id: "translator",
                              icon: Globe,
                              label: "Translate",
                              color: "text-primary",
                            },
                            {
                              id: "research",
                              icon: Search,
                              label: "Research",
                              color: "text-rose-400",
                            },
                          ] as {
                            id: string;
                            icon: any;
                            label: string;
                            color: string;
                          }[]
                        ).map((app) => (
                          <button
                            type="button"
                            key={app.id}
                            data-ocid={`shortcuts.${app.id}.button`}
                            onClick={() =>
                              setActiveApp(
                                activeApp === (app.id as ActiveApp)
                                  ? null
                                  : (app.id as ActiveApp),
                              )
                            }
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-all border ${
                              activeApp === app.id
                                ? "bg-primary/10 border-primary/30"
                                : "bg-secondary/30 border-border/40 hover:bg-secondary/60"
                            }`}
                          >
                            <app.icon className={`w-4 h-4 ${app.color}`} />
                            <span className="text-muted-foreground">
                              {app.label}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* App Panels */}
                      {activeApp === "calculator" && (
                        <div
                          className="mt-3 p-2 rounded-lg border border-border/60 bg-secondary/20"
                          data-ocid="calc.panel"
                        >
                          <div className="bg-background/60 rounded p-2 text-right text-xs font-mono mb-2 min-h-8">
                            <div className="text-muted-foreground truncate">
                              {calcInput || "0"}
                            </div>
                            {calcResult && (
                              <div className="text-primary font-bold text-sm">
                                {calcResult}
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {calcButtons.map((key) => (
                              <button
                                type="button"
                                key={key}
                                onClick={() => handleCalcKey(key)}
                                className={`text-xs py-1.5 rounded font-medium transition-colors ${
                                  key === "="
                                    ? "col-span-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                    : [
                                          "C",
                                          "⌫",
                                          "%",
                                          "/",
                                          "*",
                                          "-",
                                          "+",
                                        ].includes(key)
                                      ? "bg-primary/15 text-primary hover:bg-primary/25"
                                      : "bg-secondary/60 text-foreground hover:bg-secondary"
                                }`}
                              >
                                {key}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeApp === "clock" && (
                        <div
                          className="mt-3 p-3 rounded-lg border border-border/60 bg-secondary/20 text-center"
                          data-ocid="clock.panel"
                        >
                          <div className="text-2xl font-bold text-primary font-mono">
                            {new Date().toLocaleTimeString()}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date().toLocaleDateString(undefined, {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      )}

                      {activeApp === "notes" && (
                        <div className="mt-3" data-ocid="notes.panel">
                          <textarea
                            data-ocid="notes.textarea"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Write your notes here..."
                            className="w-full h-28 text-xs p-2 rounded-lg border border-border/60 bg-secondary/20 text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:border-primary/50"
                          />
                        </div>
                      )}

                      {activeApp === "translator" && (
                        <div
                          className="mt-3 p-2 rounded-lg border border-border/60 bg-secondary/20"
                          data-ocid="translator.panel"
                        >
                          <p className="text-xs text-muted-foreground mb-1">
                            Quick translate
                          </p>
                          <p className="text-xs text-primary">
                            Try: "translate hello" in the chat!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeNav === "history" && (
                    <div className="flex-1 p-2 overflow-auto">
                      <p className="text-xs text-muted-foreground px-2 mb-2 font-medium uppercase tracking-wider">
                        Recent
                      </p>
                      {messages
                        .filter((m) => m.role === "user")
                        .slice(-5)
                        .reverse()
                        .map((m, i) => (
                          <div
                            key={m.id}
                            data-ocid={`history.item.${i + 1}`}
                            className="px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/40 rounded-lg cursor-pointer truncate"
                          >
                            {m.content.slice(0, 32)}...
                          </div>
                        ))}
                    </div>
                  )}

                  {activeNav === "settings" && (
                    <div className="flex-1 p-3 overflow-auto">
                      <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                        Settings
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground">
                            Voice Output
                          </span>
                          <button
                            type="button"
                            data-ocid="settings.voice.toggle"
                            onClick={() => setVoiceEnabled((p) => !p)}
                            className={`w-8 h-4 rounded-full transition-colors ${
                              voiceEnabled ? "bg-primary" : "bg-muted"
                            } relative`}
                          >
                            <span
                              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                                voiceEnabled
                                  ? "translate-x-4"
                                  : "translate-x-0.5"
                              }`}
                            />
                          </button>
                        </div>
                        <div>
                          <span className="text-xs text-foreground">
                            Default Language
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {selectedLanguage.flag} {selectedLanguage.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* User profile */}
                  <div className="p-3 border-t border-border/60 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        You
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {selectedLanguage.flag} {selectedLanguage.nativeName}
                      </p>
                    </div>
                    <Star className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Center Chat */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen((p) => !p)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="chat.sidebar.toggle"
                  >
                    <Menu className="w-4 h-4" />
                  </button>
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm text-foreground">
                    Chat
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs border-primary/30 text-primary bg-primary/10 ml-1"
                    data-ocid="chat.active_language.badge"
                  >
                    {selectedLanguage.flag} {selectedLanguage.name}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setVoiceEnabled((p) => !p)}
                    data-ocid="chat.voice_output.toggle"
                    className={`transition-colors ${voiceEnabled ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                    title={voiceEnabled ? "Mute voice" : "Enable voice"}
                  >
                    {voiceEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRightPanelOpen((p) => !p)}
                    data-ocid="chat.tools_panel.toggle"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 px-4 py-3">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={msg.id}
                        initial={
                          msg.role === "user"
                            ? { opacity: 0, x: 20 }
                            : { opacity: 0, x: -20 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        data-ocid={`chat.message.item.${idx + 1}`}
                        className={`flex items-start gap-3 ${
                          msg.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                            msg.role === "user"
                              ? "bg-primary/20 border-primary/30"
                              : "bg-primary/10 border-primary/20"
                          }`}
                        >
                          {msg.role === "user" ? (
                            <User className="w-4 h-4 text-primary" />
                          ) : (
                            <Bot className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div
                          className={`flex flex-col gap-1 max-w-[75%] ${
                            msg.role === "user" ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                              msg.role === "user"
                                ? "rounded-tr-sm text-white"
                                : "rounded-tl-sm text-foreground"
                            }`}
                            style={{
                              background:
                                msg.role === "user"
                                  ? "oklch(var(--user-bubble))"
                                  : "oklch(var(--assistant-bubble))",
                            }}
                          >
                            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                              {msg.content}
                            </pre>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="text-xs px-1.5 py-0.5 rounded"
                              style={{
                                background: "oklch(var(--lang-badge))",
                                color: "oklch(var(--muted-foreground))",
                              }}
                            >
                              {LANGUAGES.find((l) => l.code === msg.language)
                                ?.flag ?? "🌐"}{" "}
                              {LANGUAGES.find((l) => l.code === msg.language)
                                ?.name ?? msg.language}
                            </span>
                            <span className="text-xs text-muted-foreground/60">
                              {msg.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Tool indicator */}
              {activeTool && (
                <div className="px-4 py-1.5 border-t border-border/30 flex items-center gap-2">
                  <Badge className="text-xs bg-primary/10 text-primary border-primary/30">
                    <Zap className="w-2.5 h-2.5 mr-1" />
                    {activeTool.charAt(0).toUpperCase() + activeTool.slice(1)}{" "}
                    Mode Active
                  </Badge>
                  <button
                    type="button"
                    onClick={() => setActiveTool(null)}
                    className="text-muted-foreground hover:text-foreground"
                    data-ocid="chat.tool_mode.close_button"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Composer */}
              <div className="px-3 py-3 border-t border-border/60 flex-shrink-0">
                <div
                  className="flex items-end gap-2 rounded-xl border border-border/60 px-3 py-2 transition-colors focus-within:border-primary/50"
                  style={{ background: "oklch(var(--secondary))" }}
                >
                  {/* Language selector */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        data-ocid="chat.language.select"
                        className="text-lg flex-shrink-0 hover:scale-110 transition-transform pb-0.5"
                        title="Select language"
                      >
                        {selectedLanguage.flag}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="bg-card border-border max-h-60 overflow-y-auto"
                      data-ocid="chat.language.dropdown_menu"
                    >
                      {LANGUAGES.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            toast.success(`Language changed to ${lang.name}!`);
                          }}
                          className={`text-sm cursor-pointer ${
                            selectedLanguage.code === lang.code
                              ? "text-primary"
                              : ""
                          }`}
                        >
                          {lang.flag} {lang.name} — {lang.nativeName}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <textarea
                    data-ocid="chat.message.textarea"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(inputText);
                      }
                    }}
                    placeholder="Type your message or use voice input…"
                    rows={1}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none py-1 max-h-24"
                    style={{ overflowY: "auto" }}
                  />

                  {/* Mic button */}
                  <button
                    type="button"
                    data-ocid="chat.voice.upload_button"
                    onClick={isListening ? stopVoiceInput : startVoiceInput}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all pb-0.5 ${
                      isListening
                        ? "bg-primary text-primary-foreground mic-active"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? (
                      <div className="flex items-center gap-0.5">
                        <WaveformBars />
                      </div>
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>

                  {/* Send button */}
                  <button
                    type="button"
                    data-ocid="chat.message.submit_button"
                    onClick={() => sendMessage(inputText)}
                    disabled={!inputText.trim() || isTyping}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all pb-0.5 ${
                      inputText.trim() && !isTyping
                        ? "bg-primary text-primary-foreground teal-glow-sm hover:bg-primary/90"
                        : "bg-secondary text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2 px-1">
                  <p className="text-xs text-muted-foreground/60">
                    Press Enter to send · Shift+Enter for new line
                  </p>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-muted-foreground/60" />
                    <span className="text-xs text-muted-foreground/60">
                      {selectedLanguage.nativeName}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Quick Tools */}
            <AnimatePresence>
              {rightPanelOpen && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 border-l border-border/60 flex flex-col overflow-hidden"
                  style={{ background: "oklch(var(--card))", width: 260 }}
                >
                  <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm text-foreground">
                        Quick Tools
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRightPanelOpen(false)}
                      data-ocid="tools.panel.close_button"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 flex-1 overflow-auto">
                    {/* Tool buttons */}
                    <div className="space-y-2 mb-4">
                      {(
                        [
                          {
                            id: "translate",
                            icon: Globe,
                            label: "Translate",
                            desc: "Translate phrases",
                          },
                          {
                            id: "summarize",
                            icon: FileText,
                            label: "Summarize",
                            desc: "Summarize content",
                          },
                          {
                            id: "research",
                            icon: Search,
                            label: "Research",
                            desc: "Deep dive topics",
                          },
                          {
                            id: "draft",
                            icon: PenLine,
                            label: "Draft",
                            desc: "Write & compose",
                          },
                        ] as {
                          id: ActiveTool;
                          icon: any;
                          label: string;
                          desc: string;
                        }[]
                      ).map((tool) => (
                        <button
                          type="button"
                          key={tool.id}
                          data-ocid={`tools.${tool.id}.button`}
                          onClick={() => handleToolAction(tool.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all border ${
                            activeTool === tool.id
                              ? "bg-primary/15 border-primary/40 text-primary"
                              : "bg-secondary/30 border-border/40 text-foreground hover:bg-secondary/60 hover:border-border"
                          }`}
                        >
                          <tool.icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              activeTool === tool.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <div className="text-left">
                            <p className="text-xs font-medium leading-none">
                              {tool.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {tool.desc}
                            </p>
                          </div>
                          {activeTool === tool.id && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Active Language */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                        Active Language
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            data-ocid="tools.language.select"
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border/60 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                          >
                            <span className="text-sm text-foreground">
                              {selectedLanguage.flag} {selectedLanguage.name}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-card border-border max-h-52 overflow-y-auto w-52"
                          data-ocid="tools.language.dropdown_menu"
                        >
                          {LANGUAGES.map((lang) => (
                            <DropdownMenuItem
                              key={lang.code}
                              onClick={() => {
                                setSelectedLanguage(lang);
                                toast.success(`Switched to ${lang.name}!`);
                              }}
                              className={`text-sm cursor-pointer ${
                                selectedLanguage.code === lang.code
                                  ? "text-primary bg-primary/5"
                                  : ""
                              }`}
                            >
                              {lang.flag} {lang.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Session Stats
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Messages
                          </span>
                          <span className="text-xs text-foreground font-medium">
                            {messages.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Language
                          </span>
                          <span className="text-xs text-primary font-medium">
                            {selectedLanguage.nativeName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Voice
                          </span>
                          <span
                            className={`text-xs font-medium ${voiceEnabled ? "text-primary" : "text-muted-foreground"}`}
                          >
                            {voiceEnabled ? "On" : "Off"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Suggested prompts */}
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                        Try Asking
                      </p>
                      <div className="space-y-1.5">
                        {[
                          "What is 25 × 18?",
                          "Tell me about space",
                          "Give me a joke",
                          "Motivate me",
                          "translate hello",
                        ].map((prompt, i) => (
                          <button
                            type="button"
                            key={prompt}
                            data-ocid={`tools.prompt.item.${i + 1}`}
                            onClick={() => sendMessage(prompt)}
                            className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg bg-secondary/20 hover:bg-primary/10 hover:text-primary text-muted-foreground border border-border/30 hover:border-primary/30 transition-all"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} · Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <Toaster position="top-right" richColors />
    </div>
  );
}
