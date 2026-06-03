import type { SignalSprintAction } from '../signalsprint-lite/signalsprint-lite.store';
import type { SignalSprintGameplayDispatch } from './act_start_game';

export function pauseGameAction(): SignalSprintAction {
  return { type: 'pause' };
}

export function act_pause_game(dispatch: SignalSprintGameplayDispatch): void {
  dispatch(pauseGameAction());
}

export const actPauseGame = act_pause_game;
export default act_pause_game;
