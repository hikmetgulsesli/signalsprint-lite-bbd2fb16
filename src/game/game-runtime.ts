import type { SignalSprintGameState } from '../features/signalsprint-lite/signalsprint-lite.store';

const LANES = 3;
const TRACK_LENGTH = 100;

export type RuntimeEntity = {
  lane: number;
  position: number;
};

export type SignalSprintRuntimeView = {
  player: RuntimeEntity;
  obstacles: RuntimeEntity[];
  shards: RuntimeEntity[];
  score: number;
  energy: number;
  lives: number;
  paused: boolean;
};

export function createInitialRuntime(): SignalSprintRuntimeView {
  return {
    player: { lane: 1, position: 8 },
    obstacles: [
      { lane: 0, position: 74 },
      { lane: 2, position: 48 },
    ],
    shards: [
      { lane: 1, position: 60 },
      { lane: 0, position: 36 },
    ],
    score: 0,
    energy: 88,
    lives: 3,
    paused: false,
  };
}

export function advanceRuntime(
  runtime: SignalSprintRuntimeView,
  sprinting: boolean,
): SignalSprintRuntimeView {
  if (runtime.paused || runtime.lives <= 0) {
    return runtime;
  }

  const speed = sprinting && runtime.energy > 8 ? 9 : 5;
  const energy = Math.max(0, Math.min(100, runtime.energy + (sprinting ? -7 : 2)));
  const score = runtime.score + speed;
  const playerPosition = Math.min(TRACK_LENGTH, runtime.player.position + speed);

  return {
    ...runtime,
    score,
    energy,
    player: {
      ...runtime.player,
      position: playerPosition >= TRACK_LENGTH ? 8 : playerPosition,
    },
    obstacles: runtime.obstacles.map((obstacle, index) =>
      advanceEntity(obstacle, speed * 0.7, index * 23),
    ),
    shards: runtime.shards.map((shard, index) => advanceEntity(shard, speed * 0.9, index * 31)),
  };
}

export function moveLane(runtime: SignalSprintRuntimeView, direction: -1 | 1): SignalSprintRuntimeView {
  return {
    ...runtime,
    player: {
      ...runtime.player,
      lane: Math.max(0, Math.min(LANES - 1, runtime.player.lane + direction)),
    },
  };
}

export function runtimeFromState(state: SignalSprintGameState): SignalSprintRuntimeView {
  return {
    ...state.runtime,
    score: state.score,
    paused: state.paused,
  };
}

function advanceEntity(entity: RuntimeEntity, speed: number, offset: number): RuntimeEntity {
  const nextPosition = entity.position - speed;

  if (nextPosition >= 0) {
    return { ...entity, position: nextPosition };
  }

  return {
    lane: (entity.lane + 1 + offset) % LANES,
    position: TRACK_LENGTH + Math.abs(nextPosition),
  };
}
