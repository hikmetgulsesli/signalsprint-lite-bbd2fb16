import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  GameplaySignalsprintLite,
  GameSettingsSignalsprintLite,
  type GameSettingsSignalsprintLiteActionId,
  type GameplaySignalsprintLiteActionId,
} from './screens';
import { loadSignalSprintState, saveSignalSprintState } from './features/signalsprint-lite/signalsprint-lite.repo';
import {
  createSignalSprintSnapshot,
  signalSprintReducer,
  type SignalSprintAction,
} from './features/signalsprint-lite/signalsprint-lite.store';
import { act_pause_game } from './features/surf-gameplay/act_pause_game';
import { act_restart_game } from './features/surf-gameplay/act_restart_game';
import { act_start_game } from './features/surf-gameplay/act_start_game';
import { installSignalSprintLiteBridge, type SignalSprintBridgeActions } from './test/bridge';

const TICK_MS = 220;

export default function App() {
  const initialState = useMemo(() => loadSignalSprintState().state, []);
  const [state, dispatch] = useReducer(signalSprintReducer, initialState);
  const [actionFeedback, setActionFeedback] = useState({ label: 'READY', count: 0 });
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const dispatchAction = useCallback((action: SignalSprintAction) => {
    dispatch(action);
  }, []);

  const runWithFeedback = useCallback(
    (label: string, action: () => void) => {
      action();
      setActionFeedback((current) => ({ label, count: current.count + 1 }));
    },
    [],
  );

  const bridgeActions = useMemo<SignalSprintBridgeActions>(
    () => ({
      advance: () => dispatchAction({ type: 'tick' }),
      goToGameplay: () => dispatchAction({ type: 'navigate', screen: 'gameplay' }),
      goToSettings: () => dispatchAction({ type: 'navigate', screen: 'settings' }),
      moveLeft: () => dispatchAction({ type: 'move', direction: -1 }),
      moveRight: () => dispatchAction({ type: 'move', direction: 1 }),
      pause: () => act_pause_game(dispatchAction),
      restart: () => act_restart_game(dispatchAction),
      resume: () => dispatchAction({ type: 'resume' }),
      sprint: () => dispatchAction({ type: 'sprint' }),
      stopSprint: () => dispatchAction({ type: 'stopSprint' }),
    }),
    [dispatchAction],
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      dispatchAction({ type: 'tick' });
    }, TICK_MS);

    return () => window.clearInterval(intervalId);
  }, [dispatchAction]);

  useEffect(() => {
    saveSignalSprintState(state);
  }, [state.highScore, state.preferences]);

  useEffect(
    () =>
      installSignalSprintLiteBridge(
        () => createSignalSprintSnapshot(stateRef.current),
        bridgeActions,
      ),
    [bridgeActions],
  );

  useEffect(() => {
    const shouldIgnoreKeyEvent = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return true;
      }

      return stateRef.current.activeScreen !== 'gameplay';
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreKeyEvent(event)) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          dispatchAction({ type: 'move', direction: -1 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          dispatchAction({ type: 'move', direction: 1 });
          break;
        case ' ':
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          dispatchAction({ type: 'sprint' });
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          dispatchAction({ type: stateRef.current.paused ? 'resume' : 'pause' });
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          dispatchAction({ type: 'restart' });
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (shouldIgnoreKeyEvent(event)) {
        return;
      }

      if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
        event.preventDefault();
        dispatchAction({ type: 'stopSprint' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [dispatchAction]);

  const gameplayActions = useMemo<Partial<Record<GameplaySignalsprintLiteActionId, () => void>>>(
    () => ({
      'pause-1': bridgeActions.pause,
      'settings-2': bridgeActions.goToSettings,
      'race-3': () => runWithFeedback('RACE READY', () => act_start_game(dispatchAction)),
      'garage-4': () => runWithFeedback('GARAGE QUEUED', bridgeActions.goToGameplay),
      'leaderboard-5': () => runWithFeedback('LEADERBOARD QUEUED', bridgeActions.goToGameplay),
      'config-6': bridgeActions.goToSettings,
      'go-live-7': () => runWithFeedback('SIGNAL LIVE', () => act_start_game(dispatchAction)),
      'sprint-8': () => runWithFeedback('SPRINT FIRED', bridgeActions.sprint),
      'upgrades-9': () => runWithFeedback('UPGRADES QUEUED', bridgeActions.goToGameplay),
      'network-10': () => runWithFeedback('NETWORK QUEUED', bridgeActions.goToGameplay),
      'resume-11': bridgeActions.resume,
      'restart-12': bridgeActions.restart,
    }),
    [bridgeActions, dispatchAction, runWithFeedback],
  );

  const settingsActions = useMemo<Partial<Record<GameSettingsSignalsprintLiteActionId, () => void>>>(
    () => ({
      'save-changes-1': bridgeActions.goToGameplay,
      'back-to-game-2': bridgeActions.goToGameplay,
    }),
    [bridgeActions],
  );

  return (
    <div data-setfarm-root="signalsprint-lite" data-testid="setfarm-app-root">
      {state.activeScreen === 'settings' ? (
        <GameSettingsSignalsprintLite actions={settingsActions} />
      ) : (
        <GameplaySignalsprintLite
          actions={gameplayActions}
          runtime={createSignalSprintSnapshot(state).runtime}
        />
      )}
      {state.lastError ? (
        <div className="sr-only" role="status" aria-live="polite">
          {state.lastError}
        </div>
      ) : null}
      <div
        className="fixed right-4 bottom-24 z-[60] rounded border border-primary/30 bg-surface/85 px-3 py-2 font-label-sm text-label-sm text-primary shadow-[0_0_15px_rgba(47,217,244,0.25)] md:bottom-4"
        role="status"
        aria-live="polite"
        data-testid="gameplay-action-feedback"
      >
        {actionFeedback.label} #{actionFeedback.count}
      </div>
    </div>
  );
}
