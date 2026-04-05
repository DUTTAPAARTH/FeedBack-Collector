import React, { useState, useEffect, useRef } from 'react';

/**
 * App - FeedbackOS
 * A bold, high-energy Feedback Collector with "Antigravity" aesthetic.
 * Dropped into the React project to serve as the main interface.
 */

const App = () => {
  // --- STATE ---
  const [feedback, setFeedback] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputName, setInputName] = useState('');
  const [activeFilter, setActiveFilter] = useState('Latest');
  const [errorShake, setErrorShake] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [toast, setToast] = useState(null); // { message, type }
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);

  // Use a ref for the confirming delete state to avoid excessive re-renders
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  // --- LOCAL STORAGE ---
  useEffect(() => {
    const saved = localStorage.getItem('feedback_os_data');
    if (saved) {
      try {
        setFeedback(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
  }, []);

  const saveToLocal = (updatedList) => {
    localStorage.setItem('feedback_os_data', JSON.stringify(updatedList));
    setShowSavedIndicator(true);
    setTimeout(() => setShowSavedIndicator(false), 2000);
  };

  // --- ACTIONS ---
  const triggerToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
      return;
    }

    const newEntry = {
      id: Date.now(),
      text: inputText,
      name: inputName.trim() || 'Anonymous',
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      colorIdx: Math.floor(Math.random() * 3) // 0: green, 1: yellow, 2: orange
    };

    const newList = [newEntry, ...feedback];
    setFeedback(newList);
    saveToLocal(newList);
    setInputText('');
    setInputName('');
    triggerToast('Feedback added successfully!', 'green');
  };

  const handleDelete = (id) => {
    const newList = feedback.filter(f => f.id !== id);
    setFeedback(newList);
    saveToLocal(newList);
    triggerToast('Feedback deleted.', 'red');
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
    triggerToast('Feedback updated.', 'orange');
  };

  // --- HELPERS ---
  const getSortedFeedback = () => {
    let sorted = [...feedback];
    if (activeFilter === 'Latest') sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    if (activeFilter === 'Oldest') sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    if (activeFilter === 'Top Liked') sorted.sort((a, b) => b.likes - a.likes);
    if (activeFilter === 'A-Z') sorted.sort((a, b) => a.text.localeCompare(b.text));
    return sorted;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = ['#16C47F', '#FFD65A', '#FF9D23', '#F93827'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // --- RENDERING ---
  const sortedList = getSortedFeedback();

  return (
    <div className="antigravity-root min-h-screen text-white overflow-x-hidden font-body selection:bg-[#16C47F] selection:text-black">
      {/* CSS Styles */}
      <style>{`
        :root {
          --primary-green: #16C47F;
          --warm-yellow: #FFD65A;
          --vivid-orange: #FF9D23;
          --hot-red: #F93827;
          --bg-dark: #0D0D0D;
          --surface-card: #1A1A1A;
          --border-subtle: rgba(255, 255, 255, 0.06);
        }

        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        body {
          background-color: var(--bg-dark);
          margin: 0;
          padding: 0;
        }

        .antigravity-root::before {
          content: "";
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: -1;
          background: 
            radial-gradient(circle at 20% 30%, rgba(22, 196, 127, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255, 214, 90, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 157, 35, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 10% 90%, rgba(249, 56, 39, 0.05) 0%, transparent 40%);
          animation: meshPulse 15s ease infinite;
        }

        @keyframes meshPulse {
          0%, 100% { transform: scale(1) translate(0,0); }
          50% { transform: scale(1.1) translate(2%, 2%); }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb {
          background: var(--primary-green);
          border-radius: 10px;
        }

        .spring-transition {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .title-tilted {
          transform: rotate(-2deg);
        }

        .title-underline {
          height: 3px;
          background: var(--primary-green);
          width: 0;
          animation: underlineIn 1s forwards cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
        }

        @keyframes underlineIn {
          to { width: 100%; }
        }

        .card-lift:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.1);
        }

        .shadow-bloom-0:hover { box-shadow: 0 20px 40px -15px rgba(22, 196, 127, 0.2); }
        .shadow-bloom-1:hover { box-shadow: 0 20px 40px -15px rgba(255, 214, 90, 0.2); }
        .shadow-bloom-2:hover { box-shadow: 0 20px 40px -15px rgba(255, 157, 35, 0.2); }

        .shake-animation {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }

        .staggered-in {
          animation: slideUpFade 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes slideUpFade {
          to { opacity: 1; transform: translateY(0); }
        }

        .pulse-glow:active {
          box-shadow: 0 0 20px var(--primary-green);
          transform: translateY(-1px);
        }

        .float-anim {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .heart-bounce:active {
          transform: scale(1.4);
        }
      `}</style>

      <div className="max-w-[720px] mx-auto px-6 py-12 relative z-10">
        
        {/* HEADER */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <div className="relative inline-block">
              <h1 className="font-display text-5xl font-black title-tilted mb-1 tracking-tighter">
                FeedbackOS
              </h1>
              <div className="title-underline" />
            </div>
            <div className="bg-[#1A1A1A] border border-[var(--border-subtle)] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(255,157,35,0.15)] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[var(--vivid-orange)]" />
              <span className="font-mono text-sm font-bold text-[var(--vivid-orange)]">
                {feedback.length} ITEMS
              </span>
            </div>
          </div>
          <p className="text-gray-500 font-body text-lg italic pl-1">Drop your thoughts. Unfiltered.</p>
        </header>

        {/* FEEDBACK FORM */}
        <section className="mb-10 staggered-in" style={{ animationDelay: '0.1s' }}>
          <form 
            onSubmit={handleAddFeedback}
            className={`bg-[#1A1A1A] rounded-3xl p-6 border border-[var(--border-subtle)] spring-transition ${errorShake ? 'shake-animation border-[var(--hot-red)]' : 'focus-within:border-[var(--primary-green)]'}`}
            style={{ boxShadow: '0 20px 50px -20px rgba(0,0,0,0.5)' }}
          >
            <div className="relative group mb-4">
              <textarea 
                placeholder="What's on your mind?"
                className="w-full bg-transparent border-none outline-none text-xl font-body placeholder:text-gray-600 min-h-[120px] resize-none pr-4"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="absolute bottom-0 right-0 font-mono text-xs text-gray-600 p-2">
                {inputText.length} chars
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5">
              <input 
                type="text" 
                placeholder="Your Name (Optional)"
                className="w-full sm:flex-1 bg-transparent border-b border-white/10 py-2 outline-none font-body focus:border-[var(--primary-green)] transition-colors"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              <button 
                type="submit"
                className="w-full sm:w-auto bg-[var(--primary-green)] text-black px-8 py-3 rounded-xl font-display font-bold uppercase tracking-widest text-sm hover:-translate-y-[3px] spring-transition pulse-glow active:scale-95"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </section>

        {/* SORT & FILTER */}
        <section className="mb-8 overflow-x-auto no-scrollbar scroll-smooth staggered-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-3 min-w-max pb-2">
            {['Latest', 'Top Liked', 'Oldest', 'A-Z'].map((chip, idx) => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`px-6 py-2 rounded-full font-display text-sm font-bold border spring-transition staggered-in
                  ${activeFilter === chip 
                    ? 'bg-[var(--vivid-orange)] border-[var(--vivid-orange)] text-black' 
                    : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* FEEDBACK LIST */}
        <div className="space-y-6">
          {sortedList.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center staggered-in" style={{ animationDelay: '0.5s' }}>
              <div className="float-anim mb-6 text-[var(--warm-yellow)] opacity-50">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.6384 20 9.3528 19.7157 8.19207 19.206L3 21L4.85764 16.6334C3.69315 15.2217 3 13.4357 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl text-gray-500">No feedback yet. Be the first.</h3>
            </div>
          ) : (
            sortedList.map((f, idx) => (
              <div 
                key={f.id}
                className={`bg-[#1A1A1A] rounded-2xl p-6 border border-[var(--border-subtle)] card-lift spring-transition shadow-bloom-${f.id % 3} staggered-in group`}
                style={{ animationDelay: `${0.4 + (idx * 0.1)}s` }}
              >
                {editingId === f.id ? (
                  <div className="space-y-4">
                    <textarea 
                      className="w-full bg-black/30 border border-[var(--primary-green)] rounded-xl p-4 font-body text-white outline-none focus:ring-1 focus:ring-[var(--primary-green)] min-h-[100px] resize-none"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <button 
                        onClick={handleSaveEdit}
                        className="bg-[var(--primary-green)] text-black px-4 py-2 rounded-lg font-display text-xs font-bold uppercase tracking-tighter"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="bg-white/5 text-gray-400 px-4 py-2 rounded-lg font-display text-xs font-bold uppercase tracking-tighter hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-xs text-black"
                          style={{ backgroundColor: getAvatarColor(f.name) }}
                        >
                          {getInitials(f.name)}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm tracking-tight">{f.name}</h4>
                          <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest line-clamp-1">
                            {new Date(f.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEdit(f)}
                          className="p-2 text-gray-500 hover:text-[var(--vivid-orange)] spring-transition"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        </button>
                        
                        {/* DELETE WITH CONFIRMATION */}
                        <div className="relative">
                          <button 
                            onClick={() => {
                              if (confirmingDelete === f.id) {
                                handleDelete(f.id);
                              } else {
                                setConfirmingDelete(f.id);
                                setTimeout(() => setConfirmingDelete(null), 3000);
                              }
                            }}
                            className={`p-2 spring-transition rounded-md ${confirmingDelete === f.id ? 'bg-[var(--hot-red)] text-white' : 'text-gray-500 hover:text-[var(--hot-red)]'}`}
                          >
                            {confirmingDelete === f.id ? (
                              <span className="font-mono text-[9px] font-bold px-1">CONFIRM?</span>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="font-body text-gray-300 leading-relaxed text-lg italic">"{f.text}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(f.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border spring-transition heart-bounce 
                          ${f.isLiked 
                          ? 'bg-[var(--warm-yellow)]/10 border-[var(--warm-yellow)] text-[var(--warm-yellow)]' 
                          : 'border-white/5 text-gray-500 hover:border-white/20'}`}
                      >
                        <svg 
                          width="16" height="16" viewBox="0 0 24 24" 
                          fill={f.isLiked ? 'currentColor' : 'none'} 
                          stroke="currentColor" strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="font-mono text-xs font-bold">{f.likes}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* FOOTER INDICATOR */}
        {showSavedIndicator && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-gray-600 bg-black/80 px-4 py-1 rounded-full border border-white/5 backdrop-blur-md">
            SAVED LOCALLY // SYNCED
          </div>
        )}

        {/* TOAST */}
        {toast && (
          <div 
            className="fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-xl shadow-2xl staggered-in border-l-4 font-body font-bold flex items-center gap-3 backdrop-blur-xl"
            style={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.9)',
              borderColor: `var(--${toast.type === 'green' ? 'primary-green' : toast.type === 'orange' ? 'vivid-orange' : 'hot-red'})`,
              color: 'white'
            }}
          >
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: `var(--${toast.type === 'green' ? 'primary-green' : toast.type === 'orange' ? 'vivid-orange' : 'hot-red'})` }}
            />
            {toast.message}
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ::-moz-selection { background: #16C47F; color: #000; }
        ::selection { background: #16C47F; color: #000; }
      `}</style>
    </div>
  );
};

export default App;
