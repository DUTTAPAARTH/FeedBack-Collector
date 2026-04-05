import React, { useState, useEffect } from 'react';

/**
 * App - FeedbackOS (Gen Z Edition)
 * A "Dopamine-Hit" UI using a "Neo-Brutalist Antigravity" aesthetic.
 * Built for vibes, dopamine, and fr fr feedback.
 */

const App = () => {
  // --- STATE ---
  const [feedback, setFeedback] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputName, setInputName] = useState('');
  const [activeFilter, setActiveFilter] = useState('latest ✦');
  const [errorShake, setErrorShake] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [toasts, setToasts] = useState([]); // List of { id, message, type }
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  // --- LOCAL STORAGE ---
  useEffect(() => {
    const saved = localStorage.getItem('feedback_gen_z_data');
    if (saved) {
      try {
        setFeedback(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
  }, []);

  const saveToLocal = (updatedList) => {
    localStorage.setItem('feedback_gen_z_data', JSON.stringify(updatedList));
    setShowSavedIndicator(true);
    setTimeout(() => setShowSavedIndicator(false), 2000);
  };

  // --- ACTIONS ---
  const triggerToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 4000); // 4 seconds total
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
      triggerToast('bestie... the box is empty 💀', 'red');
      return;
    }

    const newEntry = {
      id: Date.now(),
      text: inputText,
      name: inputName.trim() || 'mysterious bestie',
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      color: [`#16C47F`, `#FFD65A`, `#FF9D23`][Math.floor(Math.random() * 3)]
    };

    const newList = [newEntry, ...feedback];
    setFeedback(newList);
    saveToLocal(newList);
    setInputText('');
    setInputName('');
    triggerToast('feedback sent!! ty fr 🙏', 'green');
  };

  const handleDelete = (id) => {
    const newList = feedback.filter(f => f.id !== id);
    setFeedback(newList);
    saveToLocal(newList);
    triggerToast('gone. poof. deleted. 👋', 'red');
    setConfirmingDelete(null);
  };

  const handleLike = (id) => {
    const newList = feedback.map(f => {
      if (f.id === id) {
        return {
          ...f,
          isLiked: !f.isLiked,
          likes: f.isLiked ? f.likes - 1 : f.likes + 1
        };
      }
      return f;
    });
    setFeedback(newList);
    saveToLocal(newList);
  };

  const startEdit = (f) => {
    setEditingId(f.id);
    setEditText(f.text);
  };

  const handleSaveEdit = () => {
    const newList = feedback.map(f => {
      if (f.id === editingId) {
        return { ...f, text: editText };
      }
      return f;
    });
    setFeedback(newList);
    saveToLocal(newList);
    setEditingId(null);
    triggerToast('feedback evolved. ✨', 'orange');
  };

  // --- HELPERS ---
  const getSortedFeedback = () => {
    let sorted = [...feedback];
    if (activeFilter === 'latest ✦') sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    if (activeFilter === 'oldest') sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    if (activeFilter === 'top liked') sorted.sort((a, b) => b.likes - a.likes);
    if (activeFilter === 'a–z') sorted.sort((a, b) => a.text.localeCompare(b.text));
    return sorted;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getAvatarColor = (name) => {
    const palette = ['#16C47F', '#FFD65A', '#FF9D23', '#F93827'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return palette[Math.abs(hash) % palette.length];
  };

  // --- RENDERING ---
  const sortedList = getSortedFeedback();

  return (
    <div className="gen-z-root min-h-screen text-[#111111] overflow-x-hidden font-body selection:bg-[#FFD65A] selection:text-black">
      {/* GLOBAL STYLES */}
      <style>{`
        :root {
          --primary-green: #16C47F;
          --warm-yellow: #FFD65A;
          --vivid-orange: #FF9D23;
          --hot-red: #F93827;
          --bg-wash: #F7F7F5;
          --border: #111111;
        }

        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }

        body {
          background-color: var(--bg-wash);
          margin: 0;
          padding: 0;
        }

        /* Dot Grid Background */
        .gen-z-root {
          background-image: radial-gradient(var(--border) 1px, transparent 1px);
          background-size: 24px 24px;
          background-attachment: fixed;
          background-position: center;
        }
        .gen-z-root::after {
          content: "";
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background-color: var(--bg-wash);
          opacity: 0.95;
          z-index: -1;
        }

        /* Neo-Brutalist Shadows */
        .neo-shadow {
          box-shadow: 4px 4px 0px var(--border);
        }

        .neo-shadow-hover:hover {
          box-shadow: 7px 7px 0px var(--border);
          transform: translate(-3px, -3px);
        }

        .neo-shadow-active:active {
          box-shadow: 1px 1px 0px var(--border);
          transform: translate(3px, 3px);
        }

        /* Animations */
        .spring-ease {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .staggered-in {
          animation: slideUpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes slideUpPop {
          to { opacity: 1; transform: translateY(0); }
        }

        .shake-it {
          animation: brutalShake 0.4s ease-in-out both;
        }

        @keyframes brutalShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px) rotate(-1deg); }
          75% { transform: translateX(4px) rotate(1deg); }
        }

        .float-bubble {
          animation: floatY 3s ease-in-out infinite;
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .pulse-once {
          animation: greenFlash 0.5s ease-out;
        }

        @keyframes greenFlash {
          0% { background-color: var(--primary-green); }
        }

        .bounce-heart {
          animation: heartBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes heartBounce {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        @keyframes floatSticker {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb {
          background: var(--primary-green);
          border: 2px solid var(--border);
          border-radius: 10px;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* SIDE DECORATIONS (Desktop Only) */}
      <div className="hidden min-[900px]:block">
        {/* LEFT SIDE STICKERS (1-5) */}
        <div className="fixed left-6 top-0 h-full w-[260px] pointer-events-none z-0">
          <div className="relative h-full">
            
            {/* 1. Baburao */}
            <div className="absolute top-[8%] left-2 pointer-events-auto hover:scale-110 hover:-rotate-[10deg] spring-ease" style={{ animation: 'floatSticker 3.5s ease-in-out infinite' }}>
              <div className="bg-[#FFD65A] border-2 border-black neo-shadow p-3 -rotate-[6deg] max-w-[200px]">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none text-black">Baburao Style 👓</div>
                <div className="font-mono text-[9px] font-bold text-black border-t border-black pt-1">Assignment nahi kiya… ye Baburao ka style hai</div>
              </div>
            </div>

            {/* 2. Raju Crying */}
            <div className="absolute top-[28%] left-8 pointer-events-auto hover:scale-110 hover:rotate-[8deg] spring-ease" style={{ animation: 'floatSticker 4s ease-in-out infinite 0.2s' }}>
              <div className="bg-white border-2 border-black neo-shadow p-3 rotate-[5deg] max-w-[190px]">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none text-black">Utha le re baba 😭</div>
                <div className="font-mono text-[9px] font-bold text-black border-t border-black pt-1">Exam kal hai… syllabus aadha bhi nahi</div>
              </div>
            </div>

            {/* 5. Mogambo */}
            <div className="absolute top-[48%] left-4 pointer-events-auto hover:scale-110 hover:-rotate-[6deg] spring-ease" style={{ animation: 'floatSticker 4.5s ease-in-out infinite 0.4s' }}>
              <div className="bg-[#16C47F] border-2 border-black neo-shadow p-3 -rotate-[4deg] max-w-[200px]">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none text-black">Mogambo Khush ✦</div>
                <div className="font-mono text-[9px] font-bold text-black border-t border-black pt-1 whitespace-pre-wrap">Attendance mil gayi bina class jaaye</div>
              </div>
            </div>

            {/* 6. Circuit */}
            <div className="absolute top-[68%] left-10 pointer-events-auto hover:scale-110 hover:rotate-[10deg] spring-ease" style={{ animation: 'floatSticker 5s ease-in-out infinite 0.6s' }}>
              <div className="bg-[#F93827] border-2 border-black neo-shadow p-3 rotate-[6deg] max-w-[180px] text-white">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none">Bole toh… 🔌</div>
                <div className="font-mono text-[9px] font-bold border-t border-white/30 pt-1">Bole toh coding samajh nahi aa rahi</div>
              </div>
            </div>

            {/* 7. Teja */}
            <div className="absolute top-[88%] left-2 pointer-events-auto hover:scale-110 hover:-rotate-[8deg] spring-ease" style={{ animation: 'floatSticker 3.8s ease-in-out infinite 0.8s' }}>
              <div className="bg-[#FF9D23] border-2 border-black neo-shadow p-3 -rotate-[4deg] max-w-[190px]">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none text-black">Main hoon Teja 🥊</div>
                <div className="font-mono text-[9px] font-bold text-black border-t border-black pt-1">Jab banda bina knowledge ke expert bane</div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE STICKERS (6-10) */}
        <div className="fixed right-6 top-0 h-full w-[260px] pointer-events-none z-0">
          <div className="relative h-full">
            
            {/* 3. Akshay (Control Uday) */}
            <div className="absolute top-[12%] right-4 pointer-events-auto hover:scale-110 hover:rotate-[12deg] spring-ease" style={{ animation: 'floatSticker 3.7s ease-in-out infinite 0.1s' }}>
              <div className="bg-[#FFD65A] border-2 border-black neo-shadow p-3 rotate-[8deg] max-w-[200px]">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none text-black">Control Uday 🧘</div>
                <div className="font-mono text-[9px] font-bold text-black border-t border-black pt-1">Jab dost overreact kare</div>
              </div>
            </div>

            {/* 4. Rancho (All is well) */}
            <div className="absolute top-[32%] right-10 pointer-events-auto hover:scale-110 hover:-rotate-[12deg] spring-ease" style={{ animation: 'floatSticker 4.2s ease-in-out infinite 0.3s' }}>
              <div className="bg-[#16C47F] border-2 border-black neo-shadow p-3 -rotate-[6deg] max-w-[190px]">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none text-black">All is well 🤲</div>
                <div className="font-mono text-[9px] font-bold text-black border-t border-black pt-1">Internal marks ke baad fake confidence</div>
              </div>
            </div>

            {/* 8. SRK (Picture Abhi Baaki Hai) */}
            <div className="absolute top-[52%] right-4 pointer-events-auto hover:scale-110 hover:rotate-[8deg] spring-ease" style={{ animation: 'floatSticker 4.6s ease-in-out infinite 0.5s' }}>
              <div className="bg-white border-2 border-black neo-shadow p-3 rotate-[3deg] max-w-[200px]">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none text-black">Picture Abhi Baaki Hai 🎞️</div>
                <div className="font-mono text-[9px] font-bold text-black border-t border-black pt-1">Mid sem khatam… end sem abhi baaki hai</div>
              </div>
            </div>

            {/* 9. Salman (Commitment) */}
            <div className="absolute top-[72%] right-12 pointer-events-auto hover:scale-110 hover:-rotate-[15deg] spring-ease" style={{ animation: 'floatSticker 5.2s ease-in-out infinite 0.7s' }}>
              <div className="bg-[#FF9D23] border-2 border-black neo-shadow p-3 -rotate-[7deg] max-w-[180px]">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none text-black">Commitment 😭</div>
                <div className="font-mono text-[9px] font-bold text-black border-t border-black pt-1">Gym join kiya hai… ab jaana padega</div>
              </div>
            </div>

            {/* 10. Vijay Raaz (Kauwa Biryani) */}
            <div className="absolute top-[90%] right-2 pointer-events-auto hover:scale-110 hover:rotate-[15deg] spring-ease" style={{ animation: 'floatSticker 4s ease-in-out infinite 0.9s' }}>
              <div className="bg-[#F93827] border-2 border-black neo-shadow p-3 rotate-[10deg] max-w-[200px] text-white">
                <div className="font-display text-xs font-black uppercase mb-1 leading-none">Kauwa Biryani 🍛</div>
                <div className="font-mono text-[9px] font-bold border-t border-white/30 pt-1">Swiggy order: biryani… reality: kuch aur 😭</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6 py-12 relative z-10">
        
        {/* HEADER */}
        <header className="mb-14 relative">
          <div className="relative inline-block z-10">
            <h1 className="font-display text-7xl font-black title-tilted mb-4 tracking-tighter -rotate-[3deg]">
              FeedbackOS
              <svg className="absolute -bottom-2 -left-2 w-[110%] h-8 -z-10" viewBox="0 0 250 30" fill="none">
                <path d="M5 25C50 5 100 25 150 5C200 25 240 10 245 15" stroke="#16C47F" strokeWidth="6" strokeLinecap="round" className="squiggle-anim" />
              </svg>
            </h1>
            
            {/* Sticker Badge */}
            <div className="absolute -top-6 -right-16 bg-[var(--warm-yellow)] border-2 border-black neo-shadow px-3 py-1 rotate-6 font-display text-xs font-black uppercase tracking-tight">
              ✦ no cap
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 flex-wrap gap-4">
            <p className="font-mono text-sm text-gray-500 italic">say it. we're listening (probably)</p>
            <div className="bg-[var(--vivid-orange)] border-2 border-black neo-shadow px-5 py-2 font-mono text-xs font-bold rotate-[2deg]">
              {feedback.length} responses
            </div>
          </div>
        </header>

        {/* FEEDBACK FORM */}
        <section className="mb-14 staggered-in" style={{ animationDelay: '0.1s' }}>
          <form 
            onSubmit={handleAddFeedback}
            className={`bg-white border-2 border-black neo-shadow p-8 spring-ease ${errorShake ? 'shake-it border-[var(--hot-red)]' : ''}`}
          >
            <div className="relative mb-6">
              <textarea 
                placeholder="drop the honest truth bestie 👇"
                className="w-full bg-transparent border-none outline-none text-2xl font-body font-normal placeholder:text-gray-300 min-h-[140px] resize-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="absolute bottom-0 right-0 font-mono text-xs text-gray-400">
                {inputText.length} chars
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t-2 border-black/5">
              <input 
                type="text" 
                placeholder="ur name (or stay mysterious)"
                className="w-full sm:flex-1 bg-transparent border-b-2 border-black/10 py-3 outline-none font-body font-semibold text-lg focus:border-[var(--primary-green)] transition-all"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              <button 
                type="submit"
                className="w-full sm:w-auto bg-[var(--primary-green)] border-2 border-black px-10 py-4 neo-shadow-hover neo-shadow-active font-display font-black uppercase tracking-wider text-lg hover:bg-[#19E092] spring-ease"
              >
                Send it ➔
              </button>
            </div>
            
            {showSavedIndicator && (
              <div className="mt-4 font-mono text-[10px] text-gray-400 text-center animate-fade-in-out">
                saved locally ✦
              </div>
            )}
          </form>
        </section>

        {/* SORT & FILTER BAR */}
        <section className="mb-10 flex items-center gap-4 staggered-in" style={{ animationDelay: '0.2s' }}>
          <span className="font-mono text-xs text-gray-400 whitespace-nowrap">sort by →</span>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-2">
            {['latest ✦', 'top liked', 'oldest', 'a–z'].map((chip, idx) => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`px-5 py-2 whitespace-nowrap spring-ease border-2 border-black font-display text-sm font-black uppercase cursor-pointer 
                  ${activeFilter === chip 
                    ? 'bg-[var(--warm-yellow)] neo-shadow -translate-x-[2px] -translate-y-[2px]' 
                    : 'bg-white hover:-translate-y-1 hover:-translate-x-1 hover:neo-shadow active:translate-x-0 active:translate-y-0 active:shadow-none'}`}
                style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* FEEDBACK LIST */}
        <div className="space-y-8 pb-20">
          {sortedList.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center staggered-in" style={{ animationDelay: '0.4s' }}>
              <div className="float-bubble text-8xl mb-8 relative">
                💬 
                <div className="absolute -top-4 -right-4 text-4xl">✨</div>
                {/* CTA Arrow */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-[var(--primary-green)]">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                </div>
              </div>
              <h3 className="font-display text-4xl font-black mb-2">so quiet in here...</h3>
              <p className="font-body text-gray-500 text-lg">be the first one to say something</p>
            </div>
          ) : (
            sortedList.map((f, idx) => (
              <div 
                key={f.id}
                className={`bg-white border-2 border-black p-8 neo-shadow staggered-in group spring-ease hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_#111111] ${editingId === f.id ? 'border-[var(--vivid-orange)] shadow-[8px_8px_0px_var(--vivid-orange)]' : ''}`}
                style={{ animationDelay: `${0.3 + (idx * 0.08)}s` }}
              >
                {editingId === f.id ? (
                  <div className="space-y-6">
                    <textarea 
                      className="w-full bg-[#111111]/5 border-2 border-[var(--vivid-orange)] p-5 font-body text-xl font-medium outline-none focus:ring-4 focus:ring-[var(--vivid-orange)]/10 min-h-[120px] resize-none"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-4">
                      <button 
                        onClick={handleSaveEdit}
                        className="bg-[var(--primary-green)] border-2 border-black px-6 py-3 neo-shadow-hover neo-shadow-active font-display font-black uppercase text-sm tracking-tight"
                      >
                        Save ✓
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="bg-white border-2 border-black px-6 py-3 neo-shadow-hover neo-shadow-active font-display font-black uppercase text-sm tracking-tight"
                      >
                        nvm
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-14 h-14 rounded-full border-2 border-black neo-shadow flex items-center justify-center font-display font-black text-lg text-black"
                          style={{ backgroundColor: getAvatarColor(f.name) }}
                        >
                          {getInitials(f.name)}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-xl tracking-tight leading-none mb-1">{f.name}</h4>
                          <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {new Date(f.timestamp).toLocaleDateString()} | {new Date(f.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => startEdit(f)}
                          className="p-3 bg-white border-2 border-black neo-shadow-hover spring-ease hover:bg-[var(--warm-yellow)] hover:rotate-12"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        
                        <div className="relative group/del">
                          <button 
                            onClick={() => {
                              if (confirmingDelete === f.id) {
                                handleDelete(f.id);
                              } else {
                                setConfirmingDelete(f.id);
                                setTimeout(() => setConfirmingDelete(null), 3000);
                              }
                            }}
                            className={`p-3 border-2 border-black neo-shadow-hover spring-ease ${confirmingDelete === f.id ? 'bg-[var(--hot-red)] text-white scale-110' : 'bg-white hover:bg-[var(--hot-red)] hover:text-white'}`}
                          >
                             {confirmingDelete === f.id ? (
                               <span className="font-display text-xs font-black px-1">FR?</span>
                             ) : (
                               <svg className={`${confirmingDelete === f.id ? '' : 'group-hover/del:animate-bounce'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                             )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-10">
                      <p className="font-body text-[#111111] font-medium text-2xl leading-[1.4] tracking-tight">
                        {f.text}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <button 
                        onClick={() => handleLike(f.id)}
                        className={`flex items-center gap-3 px-6 py-3 border-2 border-black neo-shadow-hover spring-ease
                          ${f.isLiked ? 'bg-[var(--warm-yellow)]' : 'bg-white'}`}
                      >
                        <svg 
                          className={`spring-ease ${f.isLiked ? 'bounce-heart' : ''}`}
                          width="24" height="24" viewBox="0 0 24 24" 
                          fill={f.isLiked ? '#111111' : 'none'} 
                          stroke="#111111" strokeWidth="3"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="font-mono text-lg font-black">{f.likes}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* TOAST STACK */}
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 items-end pointer-events-none">
          {toasts.map((t) => (
            <div 
              key={t.id}
              className="pointer-events-auto px-6 py-4 border-2 border-black neo-shadow staggered-in font-display font-black uppercase text-sm tracking-wide flex items-center gap-3 animate-slide-in-right"
              style={{ 
                backgroundColor: t.type === 'green' ? 'var(--primary-green)' : t.type === 'orange' ? 'var(--vivid-orange)' : 'var(--hot-red)',
                color: 'white'
              }}
            >
               {t.message}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%) rotate(5deg); opacity: 0; }
          to { transform: translateX(0) rotate(0deg); opacity: 1; }
        }
        @keyframes fade-in-out {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-fade-in-out { animation: fade-in-out 2s forwards; }
      `}</style>
    </div>
  );
};

export default App;
