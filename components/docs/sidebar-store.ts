"use client"

import { useSyncExternalStore } from "react"

let mobileOpen = false
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

export function setMobileOpen(v: boolean) {
  if (mobileOpen === v) return
  mobileOpen = v
  emit()
}

export function toggleMobileOpen() {
  mobileOpen = !mobileOpen
  emit()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function useMobileOpen() {
  return useSyncExternalStore(
    subscribe,
    () => mobileOpen,
    () => false
  )
}
