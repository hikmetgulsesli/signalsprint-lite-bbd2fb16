import type { SignalSprintAction } from '../signalsprint-lite/signalsprint-lite.store';

export type SignalSprintGameplayDispatch = (action: SignalSprintAction) => void;

export function startGameActions(): SignalSprintAction[] {
  return [
    { type: 'navigate', screen: 'gameplay' },
    { type: 'resume' },
  ];
}

export function act_start_game(dispatch: SignalSprintGameplayDispatch): void {
  for (const action of startGameActions()) {
    dispatch(action);
  }
}

export const actStartGame = act_start_game;
export default act_start_game;
