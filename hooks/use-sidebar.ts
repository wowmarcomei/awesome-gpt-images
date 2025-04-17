import { create } from 'zustand'

type SidebarStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  toggle: () => void
}

export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}))