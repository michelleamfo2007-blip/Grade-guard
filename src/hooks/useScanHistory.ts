import { useState, useEffect } from 'react';

export interface ScanLog {
  id: string;
  timestamp: string;
  materialLabel: string;
  useLabel: string;
  pass: boolean;
  message: string;
}

const STORAGE_KEY = 'grade_guard_scan_history';

export function useScanHistory() {
  const [history, setHistory] = useState<ScanLog[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load scan history:", e);
    }
  }, []);

  const addLog = (logData: Omit<ScanLog, 'id' | 'timestamp'>) => {
    const newLog: ScanLog = {
      ...logData,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    
    setHistory((prev) => {
      const updated = [newLog, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addLog, clearHistory };
}
