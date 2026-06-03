import {
  createSignalSprintSnapshot,
  SIGNALSPRINT_INITIAL_STATE,
  type SignalSprintGameState,
  type SignalSprintSnapshot,
} from '../features/signalsprint-lite/signalsprint-lite.store';

export const signalSprintLiteFixture: SignalSprintGameState = {
  ...SIGNALSPRINT_INITIAL_STATE,
  highScore: 1200,
  score: 240,
  level: 2,
};

export function createSignalSprintLiteFixtureSnapshot(): SignalSprintSnapshot {
  return createSignalSprintSnapshot(signalSprintLiteFixture);
}
