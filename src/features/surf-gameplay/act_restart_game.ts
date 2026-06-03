import type { SignalSprintAction } from '../signalsprint-lite/signalsprint-lite.store';
import type { SignalSprintGameplayDispatch } from './act_start_game';

export function restartGameAction(): SignalSprintAction {
  return { type: 'restart' };
}

export function act_restart_game(dispatch: SignalSprintGameplayDispatch): void {
  dispatch(restartGameAction());
}

export const actRestartGame = act_restart_game;
export default act_restart_game;
