import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
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
import { installSignalSprintLiteBridge, type SignalSprintBridgeActions } from './test/bridge';

const TICK_MS = 220;

export default function App() {
  const initialState = useMemo(() => loadSignalSprintState().state, []);
  const [state, dispatch] = useReducer(signalSprintReducer, initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const dispatchAction = useCallback((action: SignalSprintAction) => {
    dispatch(action);
  }, []);

  const bridgeActions = useMemo<SignalSprintBridgeActions>(
    () => ({
      advance: () => dispatchAction({ type: 'tick' }),
      goToGameplay: () => dispatchAction({ type: 'navigate', screen: 'gameplay' }),
      goToSettings: () => dispatchAction({ type: 'navigate', screen: 'settings' }),
      moveLeft: () => dispatchAction({ type: 'move', direction: -1 }),
      moveRight: () => dispatchAction({ type: 'move', direction: 1 }),
      pause: () => dispatchAction({ type: 'pause' }),
      restart: () => dispatchAction({ type: 'restart' }),
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

  const gameplayActions = useMemo<Partial<Record<GameplaySignalsprintLiteActionId, () => void>>>(
    () => ({
      'pause-1': bridgeActions.pause,
      'settings-2': bridgeActions.goToSettings,
      'race-3': bridgeActions.goToGameplay,
      'garage-4': bridgeActions.goToGameplay,
      'leaderboard-5': bridgeActions.goToGameplay,
      'config-6': bridgeActions.goToSettings,
      'go-live-7': bridgeActions.resume,
      'sprint-8': bridgeActions.sprint,
      'upgrades-9': bridgeActions.goToGameplay,
      'network-10': bridgeActions.goToGameplay,
      'resume-11': bridgeActions.resume,
      'restart-12': bridgeActions.restart,
    }),
    [bridgeActions],
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
    </div>
  );
}
