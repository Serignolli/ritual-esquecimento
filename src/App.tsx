import { Coffee, Flame, Globe, Moon, Star } from 'lucide-react';
import { useState } from 'react';

type Language = 'en' | 'pt';

const translations = {
  en: {
    title1: 'RITUAL OF',
    title2: 'FORGETTING',
    subtitle: 'Begin the ritual to let go of a memory that no longer serves you',
    beginRitual: 'Begin Ritual',
    memoryOffering: 'MEMORY OFFERING',
    offeringDescription: 'Speak the memory you wish to release into the void',
    placeholder: 'Enter a memory to forget...',
    releaseButton: 'Release Into The Void',
    burning: 'The memory burns away...',
    complete: 'It is done.',
    completionMessage: 'You are now free. The memory has been released to the cosmic void, and you may walk forward unburdened.',
    anotherRitual: 'Begin Another Ritual',
    thankScribe: 'Thank the scribe of this digital spell with a coffee',
    switchRealm: 'Switch Realm: EN / PT'
  },
  pt: {
    title1: 'RITUAL DO',
    title2: 'ESQUECIMENTO',
    subtitle: 'Inicie o ritual para libertar-se de uma memória que não mais te serve',
    beginRitual: 'Iniciar Ritual',
    memoryOffering: 'OFERENDA DA MEMÓRIA',
    offeringDescription: 'Fale a memória que deseja liberar para o vazio',
    placeholder: 'Digite uma memória para esquecer...',
    releaseButton: 'Liberar Para O Vazio',
    burning: 'A memória se desfaz em chamas...',
    complete: 'Está feito.',
    completionMessage: 'Você agora está livre. A memória foi liberada para o vazio cósmico, e você pode seguir adiante sem esse fardo.',
    anotherRitual: 'Iniciar Outro Ritual',
    thankScribe: 'Agradeça ao escriba deste feitiço digital com um café',
    switchRealm: 'Trocar Reino: EN / PT'
  }
};

function App() {
  const [ritualStage, setRitualStage] = useState<'begin' | 'offering' | 'releasing' | 'complete'>('begin');
  const [memory, setMemory] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  const beginRitual = () => {
    setRitualStage('offering');
  };

  const submitMemory = () => {
    if (!memory.trim()) return;
    
    setIsAnimating(true);
    setRitualStage('releasing');
    
    setTimeout(() => {
      setRitualStage('complete');
      setIsAnimating(false);
    }, 3000);
  };

  const resetRitual = () => {
    setRitualStage('begin');
    setMemory('');
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Language Switch */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-purple-400/30 
                   rounded-lg text-purple-300 hover:text-purple-200 hover:border-purple-400/50 
                   transition-all duration-300 hover:bg-purple-900/20"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{t.switchRealm}</span>
        </button>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-red-900/20">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-300 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Mystical Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="absolute top-1/4 left-1/4 w-6 h-6 text-purple-400 opacity-60 animate-pulse" />
        <Moon className="absolute top-1/3 right-1/4 w-8 h-8 text-pink-400 opacity-40 animate-bounce" style={{ animationDuration: '3s' }} />
        <Flame className="absolute bottom-1/4 left-1/3 w-5 h-5 text-red-400 opacity-50 animate-pulse" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        {/* Hero Section */}
        {ritualStage === 'begin' && (
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-6 tracking-wider">
              {t.title1}
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-8 tracking-wider">
              {t.title2}
            </h1>
            <p className="text-xl md:text-2xl text-purple-300 mb-12 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
            <button
              onClick={beginRitual}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg 
                       hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-purple-500/25 border border-purple-400/30"
            >
              {t.beginRitual}
            </button>
          </div>
        )}

        {/* Main Ritual Card */}
        {(ritualStage === 'offering' || ritualStage === 'releasing') && (
          <div className={`ritual-card ${isAnimating ? 'releasing' : ''}`}>
            <div className="runic-border">
              <div className="card-content">
                <h2 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4 text-center">
                  {t.memoryOffering}
                </h2>
                <p className="text-lg text-purple-400 mb-8 text-center">
                  {t.offeringDescription}
                </p>
                
                <div className="input-container mb-8">
                  <textarea
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    placeholder={t.placeholder}
                    className="memory-input"
                    rows={4}
                    disabled={isAnimating}
                  />
                </div>

                {!isAnimating && (
                  <div className="text-center">
                    <button
                      onClick={submitMemory}
                      disabled={!memory.trim()}
                      className="submit-button"
                    >
                      <Flame className="w-5 h-5 mr-2" />
                      {t.releaseButton}
                    </button>
                  </div>
                )}

                {isAnimating && (
                  <div className="text-center">
                    <div className="burning-animation">
                      <Flame className="w-8 h-8 text-orange-400 animate-pulse mx-auto mb-4" />
                      <p className="text-orange-300 text-lg animate-pulse">
                        {t.burning}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Completion Section */}
        {ritualStage === 'complete' && (
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <Star className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-6">
              {t.complete}
            </h2>
            <p className="text-2xl text-purple-300 mb-8 max-w-2xl leading-relaxed">
              {t.completionMessage}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={resetRitual}
                className="px-6 py-3 border border-purple-400/50 text-purple-300 rounded-lg
                         hover:bg-purple-900/30 transition-all duration-300"
              >
                {t.anotherRitual}
              </button>
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 
                         text-white rounded-lg hover:from-amber-500 hover:to-orange-500 
                         transform hover:scale-105 transition-all duration-300 shadow-lg 
                         hover:shadow-amber-500/25 border border-amber-400/30"
              >
                <Coffee className="w-4 h-4 mr-2" />
                <span className="text-sm">{t.thankScribe}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;