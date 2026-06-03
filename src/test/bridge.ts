import type { SignalSprintSnapshot } from '../features/signalsprint-lite/signalsprint-lite.store';

export type SignalSprintBridgeActions = {
  advance: () => void;
  goToGameplay: () => void;
  goToSettings: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  pause: () => void;
  restart: () => void;
  resume: () => void;
  sprint: () => void;
  stopSprint: () => void;
};

export type SignalSprintTestBridge = {
  getState: () => SignalSprintSnapshot;
  actions: SignalSprintBridgeActions;
};

declare global {
  interface Window {
    app?: SignalSprintTestBridge;
  }
}

export function installSignalSprintLiteBridge(
  getState: () => SignalSprintSnapshot,
  actions: SignalSprintBridgeActions,
): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  window.app = { getState, actions };

  return () => {
    if (window.app?.getState === getState) {
      delete window.app;
    }
  };
}
