import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Session } from '@/types';

interface SessionState {
  sessions: Session[];
  selectedSession: Session | null;
  filters: {
    status: string;
    search: string;
  };
  setSessions: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  updateSession: (id: string, session: Partial<Session>) => void;
  deleteSession: (id: string) => void;
  setSelectedSession: (session: Session | null) => void;
  setFilters: (filters: Partial<SessionState['filters']>) => void;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    (set) => ({
      sessions: [],
      selectedSession: null,
      filters: {
        status: 'all',
        search: '',
      },
      setSessions: (sessions) => set({ sessions }),
      addSession: (session) =>
        set((state) => ({ sessions: [session, ...state.sessions] })),
      updateSession: (id, updatedSession) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id ? { ...session, ...updatedSession } : session
          ),
        })),
      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
        })),
      setSelectedSession: (session) => set({ selectedSession: session }),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
    }),
    { name: 'session-store' }
  )
);