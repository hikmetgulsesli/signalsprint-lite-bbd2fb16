import {
  advanceRuntime,
  createInitialRuntime,
  moveLane,
  runtimeFromState,
  type SignalSprintRuntimeView,
} from '../../game/game-runtime';

export type SignalSprintScreen = 'gameplay' | 'settings';
export type StorageStatus = 'ready' | 'recovered' | 'unavailable';

export type SignalSprintPreferences = {
  difficulty: 'rookie' | 'pro' | 'elite';
  sound: boolean;
};

export type SignalSprintGameState = {
  activeScreen: SignalSprintScreen;
  score: number;
  highScore: number;
  level: number;
  paused: boolean;
  gameOver: boolean;
  sprinting: boolean;
  storageStatus: StorageStatus;
  lastError: string | null;
  preferences: SignalSprintPreferences;
  runtime: SignalSprintRuntimeView;
};

export type SignalSprintAction =
  | { type: 'tick' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'restart' }
  | { type: 'sprint' }
  | { type: 'stopSprint' }
  | { type: 'move'; direction: -1 | 1 }
  | { type: 'navigate'; screen: SignalSprintScreen }
  | { type: 'setStorageStatus'; status: StorageStatus; error?: string | null };

export type SignalSprintSnapshot = SignalSprintGameState & {
  runtime: SignalSprintRuntimeView;
  actions: string[];
};

export const SIGNALSPRINT_ACTIONS = [
  'pause',
  'resume',
  'restart',
  'sprint',
  'stopSprint',
  'moveLeft',
  'moveRight',
  'goToGameplay',
  'goToSettings',
  'advance',
] as const;

export const SIGNALSPRINT_INITIAL_STATE: SignalSprintGameState = {
  activeScreen: 'gameplay',
  score: 0,
  highScore: 0,
  level: 1,
  paused: false,
  gameOver: false,
  sprinting: false,
  storageStatus: 'ready',
  lastError: null,
  preferences: {
    difficulty: 'rookie',
    sound: true,
  },
  runtime: createInitialRuntime(),
};

export function signalSprintReducer(
  state: SignalSprintGameState,
  action: SignalSprintAction,
): SignalSprintGameState {
  switch (action.type) {
    case 'tick': {
      const runtime = advanceRuntime(state.runtime, state.sprinting);
      const score = runtime.score;

      return {
        ...state,
        score,
        highScore: Math.max(state.highScore, score),
        level: Math.max(1, Math.floor(score / 250) + 1),
        runtime,
      };
    }
    case 'pause':
      return {
        ...state,
        paused: true,
        sprinting: false,
        runtime: { ...state.runtime, paused: true },
      };
    case 'resume':
      return {
        ...state,
        paused: false,
        runtime: { ...state.runtime, paused: false },
      };
    case 'restart':
      return {
        ...SIGNALSPRINT_INITIAL_STATE,
        highScore: state.highScore,
        storageStatus: state.storageStatus,
        preferences: state.preferences,
      };
    case 'sprint':
      return state.paused ? state : { ...state, sprinting: true };
    case 'stopSprint':
      return { ...state, sprinting: false };
    case 'move':
      return {
        ...state,
        runtime: moveLane(state.runtime, action.direction),
      };
    case 'navigate':
      return {
        ...state,
        activeScreen: action.screen,
      };
    case 'setStorageStatus':
      return {
        ...state,
        storageStatus: action.status,
        lastError: action.error ?? null,
      };
    default:
      return state;
  }
}

export function createSignalSprintSnapshot(state: SignalSprintGameState): SignalSprintSnapshot {
  return {
    ...state,
    runtime: runtimeFromState(state),
    actions: [...SIGNALSPRINT_ACTIONS],
  };
}

export function mergePersistedSignalSprintState(
  persisted: Partial<Pick<SignalSprintGameState, 'highScore' | 'preferences'>>,
): SignalSprintGameState {
  return {
    ...SIGNALSPRINT_INITIAL_STATE,
    highScore: Number.isFinite(persisted.highScore) ? Number(persisted.highScore) : 0,
    preferences: {
      ...SIGNALSPRINT_INITIAL_STATE.preferences,
      ...(persisted.preferences ?? {}),
    },
  };
}
