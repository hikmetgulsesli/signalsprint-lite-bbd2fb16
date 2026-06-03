import {
  mergePersistedSignalSprintState,
  SIGNALSPRINT_INITIAL_STATE,
  type SignalSprintGameState,
} from './signalsprint-lite.store';

const STORAGE_KEY = 'signalsprint-lite:v1';

type PersistedSignalSprintState = Pick<SignalSprintGameState, 'highScore' | 'preferences'>;

export type SignalSprintLoadResult = {
  state: SignalSprintGameState;
  recovered: boolean;
  error: string | null;
};

export function loadSignalSprintState(storage: Storage | undefined = getStorage()): SignalSprintLoadResult {
  if (!storage) {
    return {
      state: {
        ...SIGNALSPRINT_INITIAL_STATE,
        storageStatus: 'unavailable',
        lastError: 'Persistent storage is unavailable.',
      },
      recovered: false,
      error: 'Persistent storage is unavailable.',
    };
  }

  try {
    const raw = storage.getItem(STORAGE_KEY);

    if (!raw) {
      return { state: SIGNALSPRINT_INITIAL_STATE, recovered: false, error: null };
    }

    const parsed = JSON.parse(raw) as Partial<PersistedSignalSprintState>;

    return {
      state: mergePersistedSignalSprintState(parsed),
      recovered: false,
      error: null,
    };
  } catch {
    storage.removeItem(STORAGE_KEY);

    return {
      state: {
        ...SIGNALSPRINT_INITIAL_STATE,
        storageStatus: 'recovered',
        lastError: 'Saved SignalSprint data was reset after a recovery check.',
      },
      recovered: true,
      error: 'Saved SignalSprint data was reset after a recovery check.',
    };
  }
}

export function saveSignalSprintState(
  state: SignalSprintGameState,
  storage: Storage | undefined = getStorage(),
): void {
  if (!storage) {
    return;
  }

  const persisted: PersistedSignalSprintState = {
    highScore: state.highScore,
    preferences: state.preferences,
  };

  storage.setItem(STORAGE_KEY, JSON.stringify(persisted));
}

function getStorage(): Storage | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}
