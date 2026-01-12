"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ref, push, onValue, remove, serverTimestamp } from "firebase/database";
import { realtimeDb } from "@/lib/firebase"; // Make sure path is correct
import { IconX, IconMessage, IconSend, IconUser, IconTrash } from "./Icons";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const welcomeMsg = { id: 'welcome', text: "Hello! I'm the Colours AI assistant. How can I help you today?", sender: 'bot', timestamp: Date.now() };
  const [messages, setMessages] = useState([welcomeMsg]);
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState('ai'); 
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!realtimeDb) return;
    const chatsRef = ref(realtimeDb, 'support_chats');
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        loadedMessages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        setMessages([welcomeMsg, ...loadedMessages]);
        if (loadedMessages.length > 0) { setMode('human'); }
      } else {
        setMessages([welcomeMsg]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (mode === 'ai') {
        const userMsg = { id: Date.now(), text: inputText, sender: 'user', timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Thanks for reaching out! To speak with a real person for a quote or project details, click the 'Connect to Human' button below.", sender: 'bot', timestamp: Date.now() }]);
        }, 1000);
    } else if (mode === 'human') {
      if (realtimeDb) {
        try {
          const chatsRef = ref(realtimeDb, 'support_chats');
          await push(chatsRef, { text: inputText, sender: "user", timestamp: serverTimestamp() });
          setInputText("");
        } catch (error) { console.error("Error sending message:", error); }
      }
    }
  };

  const handleReset = async () => {
      if(confirm("Are you sure you want to clear the chat history?")) {
          if (realtimeDb) {
              const chatsRef = ref(realtimeDb, 'support_chats');
              await remove(chatsRef); 
              setMessages([welcomeMsg]); 
              setMode('ai'); 
          }
      }
  };

  const switchToHuman = () => {
    setMode('human');
    setMessages(prev => [...prev, { id: Date.now(), text: "You are now connected to our live support queue. A representative will be with you shortly.", sender: 'bot' }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col" style={{ maxHeight: '500px' }}>
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#D4F93C] animate-pulse" /><span className="font-bold tracking-wide">{mode === 'ai' ? 'AI Assistant' : 'Live Support'}</span></div>
              <div className="flex items-center gap-2"><button onClick={handleReset} className="hover:text-red-500 transition-colors" title="Clear Chat"><IconTrash size={16} /></button><button onClick={() => setIsOpen(false)} className="hover:text-[#D4F93C]"><IconX size={18} /></button></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-80">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return ( <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] p-3 rounded-2xl text-sm ${isUser ? 'bg-[#D4F93C] text-black rounded-tr-none font-medium' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>{msg.text}</div></div> );
              })}
              <div ref={messagesEndRef} />
            </div>
            {mode === 'ai' && ( <div className="px-4 py-2 bg-gray-50 border-t border-gray-100"><button onClick={switchToHuman} className="w-full py-2 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"><IconUser size={14} /> Connect to Human</button></div> )}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2"><input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type a message..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#D4F93C] text-black" /><button type="submit" className="p-2 bg-black text-white rounded-full hover:bg-[#D4F93C] hover:text-black transition-colors"><IconSend size={16} /></button></form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-black text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#D4F93C] hover:text-black transition-colors border-2 border-white/20">{isOpen ? <IconX size={24} /> : <IconMessage size={24} />}</motion.button>
    </div>
  );
};
export default ChatWidget;