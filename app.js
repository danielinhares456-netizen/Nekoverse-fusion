const { useState, useEffect, useRef, useMemo } = React;

// 🔥 CONFIG FIREBASE OFICIAL
const firebaseConfig = {
  apiKey: "AIzaSyCRVlWueUGUq85NdPApEN5DiybhzWDV9EA",
  authDomain: "nekoverse-c7060.firebaseapp.com",
  projectId: "nekoverse-c7060",
  storageBucket: "nekoverse-c7060.firebasestorage.app",
  messagingSenderId: "266968734769",
  appId: "1:266968734769:web:0ff21faf8d2d324434c910"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const appId = "nekoverse-oficial";

// =========================================================
// ÍCONES NATIVOS (Visual Exato do Lucide)
// =========================================================
const Icon = ({ path, className, fill="none", stroke="currentColor" }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} dangerouslySetInnerHTML={{__html: path}} />
);

const Zap = ({className}) => <Icon className={className} fill="currentColor" stroke="none" path='<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'/>;
const FingerHeart = ({className}) => <Icon className={className} fill="currentColor" stroke="none" path='<path d="M14 18V9.5C14 8.7 13.3 8 12.5 8S11 8.7 11 9.5V14M11 12H9.5C8.7 12 8 12.7 8 13.5V17M8 15H6.5C5.7 15 5 15.7 5 16.5V18M14 12h1.5c.8 0 1.5.7 1.5 1.5V18M5 18h10.5M12.5 8l-2.5-3.5C9.5 4 10 3 11 3c.8 0 1.5.7 1.5 1.5V6M11 5l2.5-2.5C14 2 15 2 15.5 3c.5.8.5 1.5 0 2.5L14 7M12.5 2C13 1.5 14 1.5 14.5 2C15 2.5 15 3.5 14.5 4L12.5 6L10.5 4C10 3.5 10 2.5 10.5 2C11 1.5 12 1.5 12.5 2Z"/>'/>;
const Play = ({className}) => <Icon className={className} fill="currentColor" stroke="none" path='<polygon points="5 3 19 12 5 21 5 3"/>'/>;
const Bell = ({className}) => <Icon className={className} path='<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'/>;
const HomeIcon = ({className}) => <Icon className={className} path='<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'/>;
const SearchIcon = ({className}) => <Icon className={className} path='<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'/>;
const UserIcon = ({className}) => <Icon className={className} path='<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'/>;
const Dices = ({className}) => <Icon className={className} path='<rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/>'/>;
const Plus = ({className}) => <Icon className={className} path='<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'/>;
const Info = ({className}) => <Icon className={className} path='<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'/>;
const XIcon = ({className}) => <Icon className={className} path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'/>;
const Heart = ({className}) => <Icon className={className} fill="currentColor" stroke="none" path='<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'/>;
const HistoryIcon = ({className}) => <Icon className={className} path='<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>'/>;
const Trophy = ({className}) => <Icon className={className} path='<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 1.1-.9 2-2 2H4"/><path d="M14 14.66V17c0 1.1.9 2 2 2h4"/><path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2Z"/>'/>;
const MonitorPlay = ({className}) => <Icon className={className} path='<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m10 10 5 3-5 3v-6Z"/>'/>;
const LogOut = ({className}) => <Icon className={className} path='<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'/>;
const ChevronRight = ({className}) => <Icon className={className} path='<polyline points="9 18 15 12 9 6"/>'/>;
const Star = ({className}) => <Icon className={className} path='<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'/>;
const Check = ({className}) => <Icon className={className} path='<polyline points="20 6 9 17 4 12"/>'/>;
const Loader2 = ({className}) => <Icon className={className} path='<path d="M21 12a9 9 0 1 1-6.219-8.56"/>'/>;
const AlertCircle = ({className}) => <Icon className={className} path='<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'/>;
const Mail = ({className}) => <Icon className={className} path='<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'/>;
const Lock = ({className}) => <Icon className={className} path='<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'/>;
const Cast = ({className}) => <Icon className={className} path='<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M2 20a2 2 0 0 0 2-2"/><path d="M2 16a6 6 0 0 0 6 6"/><path d="M2 12a10 10 0 0 0 10 10"/>'/>;
const Crown = ({className}) => <Icon className={className} path='<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>'/>;
const Flame = ({className}) => <Icon className={className} path='<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'/>;
const MessageSquare = ({className}) => <Icon className={className} path='<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'/>;
const Shuffle = ({className}) => <Icon className={className} path='<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>'/>;
const NekoLogo = ({ className = "text-3xl" }) => (
  <h1 className={`font-black tracking-tighter flex items-center justify-center ${className}`}>
    <span className="text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">NEKO</span>
    <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">VERSE</span>
  </h1>
);

const SplashScreen = ({ onComplete }) => {
  useEffect(() => { const timer = setTimeout(() => onComplete(), 2500); return () => clearTimeout(timer); }, [onComplete]);
  return (
    <div className="fixed inset-0 z-[999] bg-[#050505] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2" style={{ animation: 'fly-left 2.5s forwards' }}><Zap className="w-8 h-8 text-purple-500" /><span className="text-4xl font-black text-purple-500">ANIME</span></div>
        <div className="flex items-center gap-2" style={{ animation: 'fly-right 2.5s forwards' }}><span className="text-4xl font-black text-blue-500">DORAMA</span><FingerHeart className="w-8 h-8 text-blue-500" /></div>
      </div>
      <div className="absolute w-10 h-10 rounded-full pointer-events-none mix-blend-screen" style={{ animation: 'core-flash 2.5s forwards' }}></div>
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'logo-pop 2.5s forwards' }}><NekoLogo className="text-6xl md:text-8xl" /></div>
    </div>
  );
};

const AuthScreen = ({ auth }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); const [error, setError] = useState('');

  const translateError = (err) => {
    if (err.includes('invalid-credential') || err.includes('wrong-password')) return 'E-mail ou senha incorretos.';
    if (err.includes('email-already-in-use')) return 'Este e-mail já possui cadastro.';
    if (err.includes('weak-password')) return 'A senha deve ter no mínimo 6 caracteres.';
    return 'Ocorreu um erro. Tente novamente.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      if (isRegister) await auth.createUserWithEmailAndPassword(email, password);
      else await auth.signInWithEmailAndPassword(email, password);
    } catch (err) { setError(translateError(err.message)); } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true); setError('');
    try { await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); } catch (err) { setError("Erro na conexão com Google."); setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-[#050505] relative overflow-hidden">
      {/* FUNDO CSS PURO ORIGINAL */}
      <div className="absolute inset-0 flex z-0 opacity-50">
        <div className="w-1/2 h-full bg-gradient-to-br from-purple-950 to-[#050505] border-r border-white/10"></div>
        <div className="w-1/2 h-full bg-gradient-to-bl from-blue-950 to-[#050505]"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent z-0"></div>

      {/* LOGO NO TOPO ESQUERDO */}
      <div className="absolute top-6 left-6 z-20">
        <NekoLogo className="text-2xl drop-shadow-md" />
      </div>

      <div className="w-full max-w-sm mx-auto z-10 animate-in slide-in-from-bottom-10 duration-700">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Bem-vindo</h2>
          <div className="flex justify-center items-center gap-3">
             <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 flex items-center gap-1.5"><Zap className="w-3 h-3 fill-purple-400" /> ANIMES</span>
             <span className="text-gray-500 text-[10px]">X</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-1.5">DORAMAS <FingerHeart className="w-3 h-3" /></span>
          </div>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-2xl mb-6 text-sm text-center backdrop-blur-md flex items-center justify-center gap-2 animate-in zoom-in"><AlertCircle className="w-5 h-5 shrink-0"/> {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl">
          <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="email" required placeholder="E-mail" className="w-full bg-black/50 border border-white/10 text-white rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-purple-500 transition-all text-sm shadow-inner" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="password" required placeholder="Senha" className="w-full bg-black/50 border border-white/10 text-white rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-blue-500 transition-all text-sm shadow-inner" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black tracking-widest uppercase py-4 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 transition-transform flex justify-center items-center gap-2 mt-4">
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isRegister ? 'Criar Conta' : 'ACESSAR')}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4"><div className="flex-1 h-px bg-white/10"></div><span className="text-gray-500 text-xs font-bold uppercase">Ou</span><div className="flex-1 h-px bg-white/10"></div></div>
        
        {/* BOTÃO GOOGLE RESTAURADO COM SVG */}
        <button onClick={handleGoogle} disabled={loading} className="w-full bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 active:scale-95 transition-transform mt-6 flex items-center justify-center gap-3 shadow-lg">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> Google
        </button>
        
        <p className="mt-8 text-center text-gray-400 text-sm">{isRegister ? 'Já é membro?' : 'Ainda não tem acesso?'} <button onClick={() => setIsRegister(!isRegister)} className="text-white font-bold ml-2 active:scale-90 transition-transform">{isRegister ? 'Faça login' : 'Inscreva-se'}</button></p>
      </div>
    </div>
  );
};

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-[60px] h-full gap-1 active:scale-90 transition-all duration-200 ${active ? 'opacity-100' : 'opacity-50'}`}>
    <Icon className={`w-6 h-6 text-white`} /><span className={`text-[9px] font-bold text-white`}>{label}</span>
  </button>
);

const Card = ({ item, onClick, isLarge, isContinueWatching }) => {
  const isWide = isLarge || isContinueWatching; const themeColor = item.type === 'anime' ? 'purple' : 'blue';
  return (
    <div className={`relative flex-none snap-start cursor-pointer rounded-2xl overflow-hidden bg-[#121212] ${isWide ? 'w-[240px] aspect-video' : 'w-[120px] aspect-[2/3]'} active:scale-95 transition-transform shadow-lg border border-white/5`} onClick={onClick}>
      <img src={isWide ? item.bannerUrl : item.coverUrl} className="w-full h-full object-cover" loading="lazy" onError={(e) => e.target.style.opacity='0'} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
      <div className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-${themeColor}-500/50`}>{item.type === 'anime' ? <Zap className="w-3 h-3 text-purple-400" /> : <FingerHeart className="w-3 h-3 text-blue-400" />}</div>
      <div className="absolute bottom-2 left-2 right-2"><h3 className="text-[11px] font-black text-white truncate">{item.title}</h3></div>
      {isContinueWatching && item.historyData && <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800"><div className={`h-full bg-${themeColor}-500 shadow-[0_0_8px_currentColor]`} style={{ width: `${(item.historyData.progress / item.historyData.duration) * 100}%` }}></div></div>}
    </div>
  );
};

const ContentRow = ({ title, items, onClick, isLarge = false, isContinueWatching = false }) => {
  if (items.length === 0 && !isContinueWatching) {
    return (
      <div className="relative flex flex-col pl-4">
         <h2 className="text-base font-black mb-2 text-white tracking-tight">{title}</h2>
         <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mb-4">Em breve no NekoVerse...</p>
      </div>
    );
  }
  if (items.length === 0) return null;

  return (
    <div className="relative flex flex-col pl-4">
      <h2 className="text-base font-black mb-3 text-white tracking-tight">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pr-4 pb-4 scrollbar-hide snap-x">
        {items.map((item) => <Card key={item.id} item={item} onClick={() => onClick(item)} isLarge={isLarge} isContinueWatching={isContinueWatching} />)}
      </div>
    </div>
  );
};
const HomeView = ({ contents, history, onDetails, onPlay }) => {
  const [heroIdx, setHeroIdx] = useState(0);
  const heroItems = useMemo(() => contents.slice(0, 3), [contents]);
  useEffect(() => { const int = setInterval(() => setHeroIdx(prev => (prev + 1) % (heroItems.length || 1)), 6000); return () => clearInterval(int); }, [heroItems]);

  const animes = contents.filter(c => c.type === 'anime');
  const doramas = contents.filter(c => c.type === 'dorama');
  
  // Categorias Solicitadas
  const animeAdicionadosRecente = [...animes].sort((a,b) => b.createdAt - a.createdAt);
  const doramaAdicionadosRecente = [...doramas].sort((a,b) => b.createdAt - a.createdAt);
  const animeEpsRecentes = [...animes].sort((a,b) => b.updatedAt - a.updatedAt);
  const doramaEpsRecentes = [...doramas].sort((a,b) => b.updatedAt - a.updatedAt);
  const animeOlimpo = [...animes].sort((a,b) => b.rating - a.rating);
  const doramaFebre = [...doramas].sort((a,b) => b.views - a.views);
  
  const continueWatching = Object.entries(history).sort(([, a], [, b]) => b.updatedAt - a.updatedAt).map(([id, data]) => { const c = contents.find(c => c.id === id); return (c && !data.completed) ? { ...c, historyData: data } : null; }).filter(Boolean).slice(0, 10);

  return (
    <div className="pb-8">
      {/* BANNER HERO */}
      {heroItems.length > 0 ? (
        <div className="relative w-full h-[70vh] bg-black overflow-hidden group">
          {heroItems.map((item, idx) => (
            <div key={item.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === heroIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <img src={item.bannerUrl} className="w-full h-full object-cover opacity-80" onError={(e) => e.target.style.opacity='0'} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full px-4 pb-8 flex flex-col items-center text-center">
                <div className={`flex items-center gap-2 mb-3 px-3 py-1 rounded-full backdrop-blur-md border ${item.type === 'anime' ? 'bg-purple-900/30 border-purple-500/50 text-purple-300' : 'bg-blue-900/30 border-blue-500/50 text-blue-300'}`}>
                  {item.type === 'anime' ? <Zap className="w-3 h-3" /> : <FingerHeart className="w-3 h-3" />}<span className="font-black tracking-widest text-[10px] uppercase">NekoVerse Original</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black mb-3 text-white drop-shadow-lg leading-tight animate-in slide-in-from-bottom-5 duration-500">{item.title}</h1>
                <div className="flex gap-3 w-full max-w-xs mx-auto">
                  <button onClick={() => onPlay(item, item.episodes[0])} className={`flex-1 text-white py-3.5 rounded-xl font-black text-sm active:scale-95 transition-transform flex justify-center items-center gap-2 ${item.type === 'anime' ? 'bg-purple-600' : 'bg-blue-600'}`}><Play className="w-5 h-5 fill-white" /> Assistir</button>
                  <button onClick={() => onDetails(item)} className="w-14 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl flex justify-center items-center active:scale-95 transition-transform"><Plus className="w-6 h-6 text-white" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full h-[60vh] bg-gradient-to-b from-[#121212] to-[#050505] flex items-center justify-center border-b border-white/5">
          <div className="text-center text-gray-500"><NekoLogo className="text-4xl opacity-30 mb-4 justify-center"/><p className="text-sm font-bold uppercase tracking-widest">Aguardando novos conteúdos...</p></div>
        </div>
      )}

      {/* TODAS AS LISTAS SOLICITADAS */}
      <div className="mt-8 space-y-8">
        <ContentRow title="Continuar Assistindo" items={continueWatching} onClick={onDetails} isContinueWatching />
        <ContentRow title="Lançamentos: Episódios de Animes" items={animeEpsRecentes} onClick={onDetails} />
        <ContentRow title="Lançamentos: Episódios de Doramas" items={doramaEpsRecentes} onClick={onDetails} />
        <ContentRow title="Adicionados Recentemente: Animes" items={animeAdicionadosRecente} onClick={onDetails} isLarge />
        <ContentRow title="Adicionados Recentemente: Doramas" items={doramaAdicionadosRecente} onClick={onDetails} isLarge />
        <ContentRow title="Olimpo dos Animes" items={animeOlimpo} onClick={onDetails} />
        <ContentRow title="Febre Coreana" items={doramaFebre} onClick={onDetails} />
      </div>
    </div>
  );
};
const SearchView = ({ contents, onDetails }) => {
  const [query, setQuery] = useState('');
  return (
    <div className="pt-24 px-4 min-h-screen">
      <div className="relative mb-6"><SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /><input type="text" placeholder="Busque no NekoVerse..." className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-purple-500 transition-colors" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      <h2 className="text-xl font-black text-white mb-4">{query ? 'Resultados' : 'Explorar'}</h2>
      <div className="grid grid-cols-3 gap-2">
        {contents.filter(c => query === '' || c.title.toLowerCase().includes(query.toLowerCase())).map(item => <Card key={item.id} item={item} onClick={() => onDetails(item)} />)}
        {contents.length === 0 && <p className="col-span-3 text-center text-gray-500 py-10 text-sm">Catálogo Vazio.</p>}
      </div>
    </div>
  );
};

const RandomPicker = ({ contents, onPlay, onDetails }) => {
  const [result, setResult] = useState(null); const [spinning, setSpinning] = useState(false);
  
  const spin = () => { 
    if(contents.length === 0) return;
    setSpinning(true); setResult(null); 
    let c = 0; const int = setInterval(() => { setResult(contents[Math.floor(Math.random() * contents.length)]); c++; if (c > 12) { clearInterval(int); setSpinning(false); } }, 100); 
  };
  useEffect(() => { spin(); }, []);

  if (contents.length === 0) return <div className="pt-32 text-center text-gray-500 min-h-screen"><Dices className="w-12 h-12 mx-auto mb-4 opacity-30" />Aguarde novos conteúdos para usar o sorteio.</div>

  return (
    <div className="pt-24 px-4 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-500">Roleta Mágica</h2>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Sorteio NekoVerse</p>
      <div className={`relative w-full max-w-[280px] aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 ${spinning ? 'scale-95 blur-sm' : 'scale-100 blur-0'}`}>
        {result && (
          <>
            <img src={result.coverUrl} className="w-full h-full object-cover" onError={(e) => e.target.style.opacity='0'} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full">{result.type === 'anime' ? <Zap className="w-5 h-5 text-purple-400" /> : <FingerHeart className="w-5 h-5 text-blue-400" />}</div>
            <div className="absolute bottom-5 w-full px-5 text-center">
              <h3 className="text-2xl font-black text-white mb-4 drop-shadow-md leading-tight">{result.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => onPlay(result, result.episodes[0])} className="flex-1 bg-white text-black py-3 rounded-xl font-black text-sm active:scale-95 transition-transform flex justify-center items-center gap-2"><Play className="w-4 h-4 fill-black"/> Assistir</button>
                <button onClick={() => onDetails(result)} className="w-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center active:scale-95 transition-transform"><Info className="w-5 h-5 text-white"/></button>
              </div>
            </div>
          </>
        )}
      </div>
      <button onClick={spin} disabled={spinning} className="mt-10 px-8 py-4 rounded-2xl bg-[#1a1a1a] border border-white/5 font-black uppercase tracking-widest text-sm active:scale-90 transition-transform flex items-center gap-3"><Shuffle className={`w-5 h-5 ${spinning ? 'animate-spin text-purple-500' : 'text-white'}`} /> Sortear Novamente</button>
    </div>
  );
};
const ProfileScreen = ({ user, onLogout, favorites, contents, history, leaderboard, onDetails, onPlay }) => {
  const [modal, setModal] = useState(null); const [quality, setQuality] = useState('Auto HD');
  const historyItems = useMemo(() => Object.entries(history || {}).sort(([, a], [, b]) => b.updatedAt - a.updatedAt).map(([id, data]) => { const c = contents.find(c => c.id === id); return c ? { ...c, historyData: data } : null; }).filter(Boolean), [history, contents]);

  return (
    <div className="pt-24 px-4 min-h-screen bg-[#050505] pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[300px] bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent blur-[80px] -z-10"></div>
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-black text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] border-4 border-[#050505] mb-3">{user?.email?.charAt(0).toUpperCase()}</div>
        <h2 className="text-xl font-black text-white">NekoVerse VIP</h2><p className="text-xs text-gray-400 mt-1">{user?.email}</p>
        <div onClick={() => setModal('ranking')} className="mt-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 px-4 py-1.5 rounded-full flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"><Flame className="w-4 h-4 text-amber-500 fill-amber-500" /><span className="text-xs font-bold text-amber-400">Ranking Global</span></div>
      </div>

      <div className="mb-8"><h3 className="text-sm font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2"><Heart className="w-4 h-4 text-red-500 fill-red-500" /> Meus Favoritos</h3>{favorites.length > 0 ? (<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">{favorites.map(item => (<div key={item.id} onClick={() => onDetails(item)} className="relative w-24 aspect-[2/3] flex-none snap-start rounded-xl overflow-hidden cursor-pointer shadow-lg active:scale-95 transition-transform border border-white/5"><img src={item.coverUrl} className="w-full h-full object-cover" onError={(e) => e.target.style.opacity='0'} /></div>))}</div>) : <p className="text-gray-500 text-xs bg-[#1a1a1a] p-4 rounded-xl text-center border border-white/5">Nenhum título salvo.</p>}</div>

      <div className="space-y-2">
        <button onClick={() => setModal('history')} className="w-full bg-[#1a1a1a] border border-white/5 text-left p-4 rounded-2xl text-white active:scale-95 transition-all flex justify-between"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><HistoryIcon className="w-4 h-4" /></div><span className="font-bold text-sm">Meu Histórico</span></div><span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded-full">{Object.keys(historyItems).length}</span></button>
        <button onClick={() => setModal('ranking')} className="w-full bg-[#1a1a1a] border border-white/5 text-left p-4 rounded-2xl text-white active:scale-95 transition-all flex justify-between"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400"><Trophy className="w-4 h-4" /></div><span className="font-bold text-sm">Ranking Global</span></div><ChevronRight className="w-4 h-4 text-gray-600" /></button>
        <button onClick={() => setModal('quality')} className="w-full bg-[#1a1a1a] border border-white/5 text-left p-4 rounded-2xl text-white active:scale-95 transition-all flex justify-between"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><MonitorPlay className="w-4 h-4" /></div><span className="font-bold text-sm">Qualidade de Vídeo</span></div><span className="text-xs font-black text-blue-400">{quality}</span></button>
        <button onClick={onLogout} className="w-full mt-6 bg-red-500/10 text-red-500 p-4 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-transform flex justify-center gap-2"><LogOut className="w-4 h-4" /> Desconectar</button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-end justify-center animate-in fade-in duration-200">
          <div className={`bg-[#121212] w-full p-6 rounded-t-3xl animate-in slide-in-from-bottom-full duration-300 pb-safe border-t border-white/10 ${(modal === 'history' || modal === 'ranking') ? 'h-[85vh] flex flex-col' : ''}`}>
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="text-xl font-black text-white flex items-center gap-2">{modal === 'history' ? <><HistoryIcon className="w-6 h-6 text-purple-400"/> Histórico</> : modal === 'ranking' ? <><Trophy className="w-6 h-6 text-amber-400"/> Ranking NekoVerse</> : 'Qualidade'}</h3>
              <button onClick={() => setModal(null)} className="p-2 bg-white/10 rounded-full active:scale-90 transition-transform"><XIcon className="w-5 h-5 text-white" /></button>
            </div>
            
            {modal === 'history' && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                {historyItems.length > 0 ? historyItems.map(item => {
                  const ep = item.episodes.find(e => e.id === item.historyData.episodeId) || item.episodes[0];
                  const progressPct = (item.historyData.progress / item.historyData.duration) * 100;
                  return (
                    <div key={item.id} onClick={() => { setModal(null); onPlay(item, ep); }} className="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded-2xl active:scale-95 transition-transform cursor-pointer border border-white/5">
                      <div className="relative w-32 aspect-video bg-gray-800 rounded-xl overflow-hidden flex-none"><img src={ep?.thumbnail || item.bannerUrl} className="w-full h-full object-cover opacity-80" onError={(e) => e.target.style.opacity='0'}/><div className="absolute inset-0 flex items-center justify-center bg-black/30"><Play className="w-6 h-6 text-white fill-white" /></div><div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-800"><div className="h-full bg-purple-500" style={{ width: `${progressPct}%` }}></div></div></div>
                      <div className="flex-1"><h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4><p className="text-[10px] text-gray-400 mt-1 font-bold">{ep?.title}</p></div>
                    </div>
                  )
                }) : <p className="text-center text-gray-500 text-sm py-10">Você não começou a assistir nada.</p>}
              </div>
            )}

            {modal === 'ranking' && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 mb-6"><p className="text-xs text-amber-200 font-bold text-center">Ganhe 150 NekoCoins por episódio para subir no ranking!</p></div>
                {leaderboard.length > 0 ? leaderboard.slice(0, 10).map((u, index) => (
                  <div key={u.id} className={`flex items-center justify-between p-4 rounded-2xl border ${u.id === user.uid ? 'bg-purple-900/30 border-purple-500/50' : 'bg-[#1a1a1a] border-white/5'}`}>
                    <div className="flex items-center gap-4"><div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${index === 0 ? 'bg-amber-500 text-black' : index === 1 ? 'bg-gray-300 text-black' : index === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-gray-400'}`}>{index === 0 ? <Crown className="w-4 h-4" /> : index + 1}</div><div><h4 className="text-sm font-bold text-white">{u.id === user.uid ? 'Você' : u.displayName || 'Membro Oculto'}</h4></div></div>
                    <div className="text-right"><span className="block text-sm font-black text-amber-400">{u.score || 0}</span></div>
                  </div>
                )) : <div className="text-center text-gray-500 text-sm mt-10">O ranking está sendo calculado...</div>}
              </div>
            )}

            {modal === 'quality' && (
              <div className="space-y-2">
                {['Auto HD', '1080p Premium', '4K Ultra HDR'].map(q => <button key={q} onClick={() => { setQuality(q); setModal(null); }} className={`w-full p-4 rounded-xl font-bold text-sm flex justify-between active:scale-95 transition-transform ${quality === q ? 'bg-blue-600 text-white' : 'bg-[#1a1a1a] text-gray-400 border border-white/5'}`}>{q} {quality === q && <Check className="w-4 h-4" />}</button>)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
const DetailsPage = ({ content, onClose, onPlay, isFavorite, onToggleFavorite, history }) => {
  const epToPlay = history ? content.episodes.find(e => e.id === history.episodeId) || content.episodes[0] : content.episodes[0];
  const themeColor = content.type === 'anime' ? 'purple' : 'blue';
  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto pb-24 animate-in slide-in-from-bottom-full duration-300">
      <div className="relative w-full aspect-video bg-gray-900">
        <img src={content.bannerUrl} className="w-full h-full object-cover" onError={(e) => e.target.style.opacity='0'} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        <button onClick={onClose} className="absolute top-4 left-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md active:scale-90 transition-transform border border-white/10"><XIcon className="w-5 h-5 text-white" /></button>
      </div>
      <div className="px-5 -mt-6 relative z-10">
        <h1 className="text-3xl font-black mb-2 text-white leading-tight">{content.title}</h1>
        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-6"><span className={`text-${themeColor}-400`}>98% Match</span><span className="bg-white/10 px-1.5 rounded text-white">A16</span><span>{content.episodes?.length || 0} Eps</span></div>
        <button onClick={() => onPlay(content, epToPlay)} className={`w-full text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs flex items-center justify-center gap-2 mb-6 bg-${themeColor}-600 active:scale-95 transition-transform shadow-lg`}><Play className="w-4 h-4 fill-white" /> {history && !history.completed ? 'Continuar Assistindo' : 'Assistir Agora'}</button>
        <p className="text-gray-300 text-xs leading-relaxed mb-6">{content.description}</p>
        <div className="flex items-center justify-around mb-6 py-4 border-y border-white/5"><button onClick={onToggleFavorite} className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform">{isFavorite ? <Check className={`w-6 h-6 text-${themeColor}-400 drop-shadow-[0_0_10px_currentColor]`} /> : <Plus className="w-6 h-6 text-gray-400" />}<span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Lista</span></button><button className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"><Star className="w-6 h-6 text-gray-400" /><span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Avaliar</span></button></div>
        <div>
          <h3 className="text-base font-black text-white mb-3">Episódios</h3>
          <div className="space-y-3">
            {content.episodes?.map((ep, index) => (
              <div key={ep.id} onClick={() => onPlay(content, ep)} className="flex items-center gap-4 p-2 rounded-2xl bg-[#1a1a1a] active:scale-95 transition-transform cursor-pointer border border-white/5">
                <div className="relative w-32 aspect-video bg-gray-900 rounded-xl overflow-hidden"><img src={ep.thumbnail || content.bannerUrl} className="w-full h-full object-cover opacity-80" onError={(e) => e.target.style.opacity='0'} /><div className="absolute inset-0 flex items-center justify-center bg-black/20"><Play className="w-6 h-6 text-white fill-white" /></div></div>
                <div className="flex-1"><h4 className="text-xs font-bold text-gray-200">{index + 1}. {ep.title}</h4><span className="text-gray-500 text-[10px] font-bold">{Math.floor(ep.duration / 60)} min</span></div>
              </div>
            ))}
            {(!content.episodes || content.episodes.length === 0) && <p className="text-gray-500 text-xs py-4 text-center">Nenhum episódio cadastrado.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomPlayer = ({ content, episode, onClose, onSaveProgress, initialProgress }) => {
  const videoRef = useRef(null);
  useEffect(() => { if (videoRef.current && initialProgress > 0) videoRef.current.currentTime = initialProgress; }, []);
  const handleTime = () => { if (videoRef.current && Math.floor(videoRef.current.currentTime) % 5 === 0) onSaveProgress(content.id, episode.id, videoRef.current.currentTime, videoRef.current.duration); };
  return (<div className="fixed inset-0 z-[200] bg-black flex items-center justify-center"><video ref={videoRef} src={episode?.videoUrl} className="w-full h-full object-contain" autoPlay controls onTimeUpdate={handleTime} /><button onClick={onClose} className="absolute top-6 left-6 z-50 p-3 bg-black/50 rounded-full active:scale-90 transition-transform border border-white/20"><XIcon className="w-6 h-6 text-white" /></button></div>);
};

const NotificationModal = ({ notifications, onClose }) => (
  <div className="fixed inset-0 z-[200] bg-black/80 flex items-end justify-center animate-in fade-in duration-200">
    <div className="bg-[#121212] w-full p-6 rounded-t-3xl animate-in slide-in-from-bottom-full duration-300 pb-safe border-t border-white/10 h-[75vh] flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0"><h3 className="text-xl font-black text-white flex items-center gap-2"><Bell className="w-6 h-6 text-purple-400"/> Notificações</h3><button onClick={onClose} className="p-2 bg-white/10 rounded-full active:scale-90 transition-transform"><XIcon className="w-5 h-5 text-white" /></button></div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
        {notifications.length > 0 ? notifications.map(notif => (
          <div key={notif.id} className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center shrink-0 border border-white/10"><Zap className="w-5 h-5 text-purple-400" /></div>
            <div><h4 className="font-bold text-white text-sm">{notif.title}</h4><p className="text-xs text-gray-400 mt-1 leading-relaxed">{notif.message}</p><span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-2 block">{new Date(notif.createdAt).toLocaleDateString()}</span></div>
          </div>
        )) : <div className="h-full flex flex-col items-center justify-center text-center pb-10"><MessageSquare className="w-12 h-12 text-gray-700 mb-3" /><p className="text-gray-500 text-sm">Sem notificações no momento.</p></div>}
      </div>
    </div>
  </div>
);
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [contents, setContents] = useState([]);
  const [history, setHistory] = useState({});
  const [favorites, setFavorites] = useState({});
  const [leaderboard, setLeaderboard] = useState([]); 
  const [notifications, setNotifications] = useState([]);
  
  const [view, setView] = useState('login'); 
  const [selectedContent, setSelectedContent] = useState(null);
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [showNotifModal, setShowNotifModal] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((currentUser) => { 
      setUser(currentUser); setLoadingAuth(false); if (currentUser && view === 'login') setView('home'); 
    });
  }, [view]);

  useEffect(() => {
    if (!user) return;
    const unsubC = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('contents').onSnapshot((snap) => setContents(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubH = db.collection('artifacts').doc(appId).collection('users').doc(user.uid).collection('history').onSnapshot((snap) => { const h={}; snap.docs.forEach(d=>{h[d.id]=d.data()}); setHistory(h); });
    const unsubF = db.collection('artifacts').doc(appId).collection('users').doc(user.uid).collection('favorites').onSnapshot((snap) => { const f={}; snap.docs.forEach(d=>{f[d.id]=true}); setFavorites(f); });
    const unsubR = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('leaderboard').onSnapshot((snap) => setLeaderboard(snap.docs.map(d => ({ id: doc.id, ...d.data() })).sort((a,b)=>b.score-a.score)));
    const unsubN = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('notifications').onSnapshot((snap) => setNotifications(snap.docs.map(d => ({ id: doc.id, ...d.data() })).sort((a,b)=>b.createdAt-a.createdAt)));
    return () => { unsubC(); unsubH(); unsubF(); unsubR(); unsubN(); };
  }, [user]);

  const toggleFavorite = async (contentId) => {
    const docRef = db.collection('artifacts').doc(appId).collection('users').doc(user.uid).collection('favorites').doc(contentId);
    if (favorites[contentId]) await docRef.delete(); else await docRef.set({ addedAt: Date.now() });
  };

  const saveProgress = async (contentId, episodeId, progress, duration) => {
    const completed = progress / duration > 0.95;
    await db.collection('artifacts').doc(appId).collection('users').doc(user.uid).collection('history').doc(contentId).set({ episodeId, progress, duration, updatedAt: Date.now(), completed }, { merge: true });
    const userScore = (Object.keys(history).length + (history[contentId] ? 0 : 1)) * 150; 
    await db.collection('artifacts').doc(appId).collection('public').doc('data').collection('leaderboard').doc(user.uid).set({ email: user.email, displayName: user.email.split('@')[0], score: userScore, updatedAt: Date.now() }, { merge: true });
  };

  const openDetails = (content) => { setSelectedContent(content); setView('details'); window.scrollTo(0, 0); };
  const openPlayer = (content, episode) => { setSelectedContent(content); setActiveEpisode(episode); setView('player'); };

  if (showSplash) return <SplashScreen onComplete={() => setShowSplash(false)} />;
  if (loadingAuth) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Loader2 className="w-10 h-10 text-purple-500 animate-spin" /></div>;
  if (!user) return <AuthScreen auth={auth} />;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-[80px] overflow-x-hidden relative">
      {['home', 'search', 'random', 'profile'].includes(view) && (
        <nav className="fixed top-0 w-full z-40 bg-gradient-to-b from-black/90 to-transparent pt-4 pb-6 px-5 flex items-center justify-between">
          <NekoLogo className="text-xl" />
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 pointer-events-auto">
            <Cast className="w-5 h-5 text-white active:scale-75 transition-transform cursor-pointer" />
            <div className="relative cursor-pointer active:scale-90 transition-transform" onClick={() => setShowNotifModal(true)}>
              <Bell className="w-5 h-5 text-white" />
              {notifications.length > 0 && <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-black"></span></span>}
            </div>
          </div>
        </nav>
      )}
  <main className="w-full">
        {view === 'home' && <HomeView contents={contents} history={history} onDetails={openDetails} onPlay={openPlayer} />}
        {view === 'search' && <SearchView contents={contents} onDetails={openDetails} />}
        {view === 'random' && <RandomPicker contents={contents} onPlay={openPlayer} onDetails={openDetails} />}
        {view === 'profile' && <ProfileScreen user={user} onLogout={() => auth.signOut()} history={history} leaderboard={leaderboard} favorites={contents.filter(c => favorites[c.id])} onDetails={openDetails} onPlay={openPlayer} />}
        {view === 'details' && selectedContent && <DetailsPage content={selectedContent} onClose={() => setView('home')} onPlay={openPlayer} isFavorite={favorites[selectedContent.id]} onToggleFavorite={() => toggleFavorite(selectedContent.id)} history={history[selectedContent.id]} />}
        {view === 'player' && activeEpisode && selectedContent && <CustomPlayer content={selectedContent} episode={activeEpisode} onClose={() => setView('details')} onSaveProgress={saveProgress} initialProgress={history[selectedContent.id]?.episodeId === activeEpisode.id ? history[selectedContent.id]?.progress : 0} />}
      </main>

      {['home', 'search', 'random', 'profile'].includes(view) && (
        <nav className="fixed bottom-0 w-full bg-[#121212]/95 backdrop-blur-xl border-t border-white/5 pb-safe z-50">
          <div className="flex justify-around items-center h-[65px] px-2 relative">
            <div className="absolute top-0 h-[2px] w-8 bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-all duration-300" style={{ left: view === 'home' ? '12.5%' : view === 'search' ? '37.5%' : view === 'random' ? '62.5%' : '87.5%', transform: 'translateX(-50%)' }}></div>
            <NavButton icon={HomeIcon} label="Início" active={view === 'home'} onClick={() => setView('home')} />
            <NavButton icon={SearchIcon} label="Busca" active={view === 'search'} onClick={() => setView('search')} />
            <NavButton icon={Dices} label="Sorteio" active={view === 'random'} onClick={() => setView('random')} />
            <NavButton icon={UserIcon} label="Perfil" active={view === 'profile'} onClick={() => setView('profile')} />
          </div>
        </nav>
      )}

      {showNotifModal && <NotificationModal notifications={notifications} onClose={() => setShowNotifModal(false)} />}
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);