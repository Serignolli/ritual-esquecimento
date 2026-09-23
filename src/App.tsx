import { useEffect, useState, type FormEvent } from 'react';

type Language = 'en' | 'pt';
type Stage = 'begin' | 'offering' | 'releasing' | 'complete';

const RELEASE_MS = 3600;
const COFFEE_URL = 'https://buymeacoffee.com/gabrielserignolli';

const translations = {
  en: {
    pageTitle: 'Ritual of Forgetting',
    title1: 'Ritual of',
    title2: 'Forgetting',
    subtitle: 'Let go of a memory that no longer serves you.',
    beginRitual: 'Begin the ritual',
    memoryOffering: 'The Offering',
    offeringDescription: 'Write the memory you wish to release into the void.',
    placeholder: 'A memory to forget…',
    releaseButton: 'Release into the void',
    burning: 'The memory burns away…',
    complete: 'It is done.',
    completionMessage: 'The memory has been given to the void. You may walk forward unburdened.',
    anotherRitual: 'Begin another ritual',
    thankScribe: 'Thank the scribe with a coffee',
    languageLabel: 'Switch language',
  },
  pt: {
    pageTitle: 'Ritual do Esquecimento',
    title1: 'Ritual do',
    title2: 'Esquecimento',
    subtitle: 'Liberte-se de uma memória que não te serve mais.',
    beginRitual: 'Iniciar o ritual',
    memoryOffering: 'A Oferenda',
    offeringDescription: 'Escreva a memória que deseja entregar ao vazio.',
    placeholder: 'Uma memória para esquecer…',
    releaseButton: 'Entregar ao vazio',
    burning: 'A memória se desfaz em chamas…',
    complete: 'Está feito.',
    completionMessage: 'A memória foi entregue ao vazio. Você pode seguir adiante sem esse fardo.',
    anotherRitual: 'Iniciar outro ritual',
    thankScribe: 'Agradeça ao escriba com um café',
    languageLabel: 'Trocar idioma',
  },
} satisfies Record<Language, Record<string, string>>;

// Generated once so the sky doesn't reshuffle on every re-render.
const STARS = Array.from({ length: 70 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() < 0.85 ? 1 : 2,
  delay: Math.random() * 6,
  duration: 3 + Math.random() * 5,
}));

const initialLanguage = (): Language =>
  navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';

function Sigil({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="47" />
      <circle cx="50" cy="50" r="38" strokeDasharray="1.5 3.5" />
      <path d="M50 12 L82.9 69 H17.1 Z" />
      <circle cx="50" cy="50" r="19" />
      <circle cx="50" cy="12" r="2" fill="currentColor" />
      <circle cx="82.9" cy="69" r="2" fill="currentColor" />
      <circle cx="17.1" cy="69" r="2" fill="currentColor" />
    </svg>
  );
}

function App() {
  const [stage, setStage] = useState<Stage>('begin');
  const [memory, setMemory] = useState('');
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = t.pageTitle;
  }, [language, t.pageTitle]);

  useEffect(() => {
    if (stage !== 'releasing') return;
    const timer = setTimeout(() => setStage('complete'), RELEASE_MS);
    return () => clearTimeout(timer);
  }, [stage]);

  const submitMemory = (e: FormEvent) => {
    e.preventDefault();
    if (memory.trim()) setStage('releasing');
  };

  const resetRitual = () => {
    setMemory('');
    setStage('begin');
  };

  const words = memory.trim().split(/(\s+)/);
  const wordStep = Math.min(120, 1800 / Math.max(words.length, 1));

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="sky" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
        aria-label={t.languageLabel}
        className="lang-toggle"
      >
        <span className={language === 'en' ? 'is-active' : ''}>EN</span>
        <span aria-hidden="true">/</span>
        <span className={language === 'pt' ? 'is-active' : ''}>PT</span>
      </button>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        {stage === 'begin' && (
          <section className="fade-in flex max-w-2xl flex-col items-center text-center">
            <Sigil className="sigil mb-10 h-24 w-24 sm:h-28 sm:w-28" />
            <h1 className="title">
              <span className="block pl-[0.4em] text-lg tracking-[0.4em] text-violet-300/70 sm:text-2xl">{t.title1}</span>
              <span className="mt-2 block text-4xl sm:text-6xl md:text-7xl">{t.title2}</span>
            </h1>
            <p className="mt-8 text-xl italic text-violet-200/80 sm:text-2xl">{t.subtitle}</p>
            <button type="button" onClick={() => setStage('offering')} className="rite-button mt-12">
              {t.beginRitual}
            </button>
          </section>
        )}

        {(stage === 'offering' || stage === 'releasing') && (
          <form onSubmit={submitMemory} className="ritual-card fade-in">
            <h2 className="title text-center text-2xl sm:text-4xl">{t.memoryOffering}</h2>
            <p className="mt-3 text-center text-lg italic text-violet-300/80">{t.offeringDescription}</p>

            {stage === 'offering' ? (
              <>
                <textarea
                  value={memory}
                  onChange={(e) => setMemory(e.target.value)}
                  placeholder={t.placeholder}
                  aria-label={t.placeholder}
                  className="memory-input mt-8"
                  rows={4}
                  autoFocus
                />
                <div className="mt-8 text-center">
                  <button type="submit" disabled={!memory.trim()} className="rite-button rite-button--ember">
                    {t.releaseButton}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="burning-text mt-8" aria-hidden="true">
                  {words.map((word, i) => (
                    <span key={i} style={{ animationDelay: `${i * wordStep}ms` }}>
                      {word}
                    </span>
                  ))}
                </p>
                <p className="mt-8 text-center text-lg italic text-orange-300/90" role="status">
                  {t.burning}
                </p>
              </>
            )}
          </form>
        )}

        {stage === 'complete' && (
          <section className="fade-in flex max-w-2xl flex-col items-center text-center">
            <Sigil className="sigil sigil--spent mb-10 h-20 w-20" />
            <h2 className="title text-4xl sm:text-6xl">{t.complete}</h2>
            <p className="mt-6 text-xl leading-relaxed text-violet-200/80 sm:text-2xl">{t.completionMessage}</p>
            <div className="mt-12 flex flex-col items-center gap-6">
              <button type="button" onClick={resetRitual} className="rite-button">
                {t.anotherRitual}
              </button>
              <a href={COFFEE_URL} target="_blank" rel="noopener noreferrer" className="coffee-link">
                {t.thankScribe}
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
