// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Gameplay - SignalSprint Lite
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Bolt, Car, ChevronDown, Gauge, Network, Pause, Play, RefreshCw, Settings, Trophy, User, Wrench, Zap } from "lucide-react";


export type GameplaySignalsprintLiteActionId = "pause-1" | "settings-2" | "race-3" | "garage-4" | "leaderboard-5" | "config-6" | "go-live-7" | "sprint-8" | "upgrades-9" | "network-10" | "resume-11" | "restart-12";

export interface GameplaySignalsprintLiteProps {
  actions?: Partial<Record<GameplaySignalsprintLiteActionId, () => void>>;
  runtime?: { player?: { lane?: number; position?: number }; obstacles?: Array<{ lane?: number; position?: number }>; shards?: Array<{ lane?: number; position?: number }>; score?: number; energy?: number; lives?: number; paused?: boolean };

}

function clampRuntimePercent(value: number | undefined, fallback: number) {
  return Math.max(0, Math.min(100, Number.isFinite(value) ? Number(value) : fallback));
}

export function GameplaySignalsprintLite({ actions, runtime }: GameplaySignalsprintLiteProps) {
  const score = runtime?.score ?? 0;
  const scoreText = new Intl.NumberFormat('en-US').format(score);
  const energy = clampRuntimePercent(runtime?.energy, 85);
  const lives = Math.max(0, runtime?.lives ?? 3);
  const level = Math.max(1, Math.floor(score / 250) + 1);
  const isPaused = runtime?.paused ?? true;

  return (
    <>
      {/* TopAppBar Component (from JSON) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-hud-gutter h-16 bg-surface-container/30 backdrop-blur-xl border-b border-white/10 shadow-[0_0_15px_rgba(47,217,244,0.3)]">
      <div className="font-display-lg text-display-lg font-black text-primary italic tracking-tighter hidden md:block">SIGNAL_SPRINT_LITE_V1.0</div>
      <div className="font-display-lg-mobile text-display-lg-mobile font-black text-primary italic tracking-tighter md:hidden">SIGNAL_SPRINT</div>
      <div className="flex items-center gap-4">
      <button className="text-outline hover:bg-primary/20 hover:text-primary transition-colors duration-300 active:scale-95 p-2 rounded-full flex items-center justify-center" type="button" aria-label="Pause" data-action-id="pause-1" onClick={actions?.["pause-1"]}>
      <Pause aria-hidden={true} focusable="false" />
      </button>
      <button className="text-outline hover:bg-primary/20 hover:text-primary transition-colors duration-300 active:scale-95 p-2 rounded-full flex items-center justify-center" type="button" aria-label="Settings" data-action-id="settings-2" onClick={actions?.["settings-2"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* SideNavBar Component (from JSON) - Hidden on Mobile */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col p-panel-padding bg-surface/80 backdrop-blur-md border-r border-white/20 h-screen w-64 pt-20 hidden md:flex">
      <div className="mb-8 flex flex-col gap-2">
      <div className="w-16 h-16 rounded-full bg-surface-container-high border border-primary flex items-center justify-center overflow-hidden mb-2">
      <User className="text-primary text-3xl" aria-hidden={true} focusable="false" />
      </div>
      <div className="font-hud-header text-hud-header text-primary">OPERATOR_01</div>
      <div className="font-label-sm text-label-sm text-outline tracking-widest">RANK: ELITE</div>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
      <button className="flex items-center gap-4 p-3 font-label-sm text-label-sm uppercase tracking-widest bg-secondary-container text-on-secondary-container border-l-4 border-secondary hover:text-primary transition-colors active:translate-x-1 duration-150" type="button" data-action-id="race-3" onClick={actions?.["race-3"]}>
      <Gauge  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
              Race
            </button>
      <button className="flex items-center gap-4 p-3 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary transition-colors active:translate-x-1 duration-150" type="button" data-action-id="garage-4" onClick={actions?.["garage-4"]}>
      <Car aria-hidden={true} focusable="false" />
              Garage
            </button>
      <button className="flex items-center gap-4 p-3 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary transition-colors active:translate-x-1 duration-150" type="button" data-action-id="leaderboard-5" onClick={actions?.["leaderboard-5"]}>
      <Trophy aria-hidden={true} focusable="false" />
              Leaderboard
            </button>
      <button className="flex items-center gap-4 p-3 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary transition-colors active:translate-x-1 duration-150" type="button" data-action-id="config-6" onClick={actions?.["config-6"]}>
      <Settings aria-hidden={true} focusable="false" />
              Config
            </button>
      </nav>
      <button className="mt-auto w-full py-3 bg-primary text-on-primary font-hud-header text-hud-header hover:bg-primary-container transition-colors glow-primary" type="button" data-action-id="go-live-7" onClick={actions?.["go-live-7"]}>
            GO_LIVE
          </button>
      </aside>
      {/* BottomNavBar Component (from JSON) - Visible only on Mobile */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface-container-lowest/40 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] rounded-t-xl md:hidden">
      <button className="flex flex-col items-center justify-center bg-primary/20 text-primary rounded-xl p-2 drop-shadow-[0_0_5px_rgba(47,217,244,0.6)] font-label-sm text-label-sm active:scale-90 duration-200" type="button" data-action-id="sprint-8" onClick={actions?.["sprint-8"]}>
      <Bolt  style={{fontVariationSettings: "'FILL' 1"}} className="mb-1" aria-hidden={true} focusable="false" />
            Sprint
          </button>
      <button className="flex flex-col items-center justify-center text-outline p-2 hover:text-primary-container font-label-sm text-label-sm active:scale-90 duration-200" type="button" data-action-id="upgrades-9" onClick={actions?.["upgrades-9"]}>
      <Wrench className="mb-1" aria-hidden={true} focusable="false" />
            Upgrades
          </button>
      <button className="flex flex-col items-center justify-center text-outline p-2 hover:text-primary-container font-label-sm text-label-sm active:scale-90 duration-200" type="button" data-action-id="network-10" onClick={actions?.["network-10"]}>
      <Network className="mb-1" aria-hidden={true} focusable="false" />
            Network
          </button>
      </nav>
      {/* Main Playfield Area */}
      <main className="flex-1 relative flex items-center justify-center pt-16 md:pl-64 pb-20 md:pb-0 overflow-hidden">
      {/* HUD Elements Overlay */}
      <div className="absolute top-20 left-4 md:left-72 right-4 flex justify-between items-start pointer-events-none z-10">
      {/* Score & Multiplier */}
      <div className="glass-panel p-panel-padding rounded border-l-4 border-l-secondary flex flex-col gap-1 w-48">
      <div className="flex justify-between items-center">
      <span className="font-stat-label text-stat-label text-outline tracking-wider">SCORE</span>
      <span className="font-label-sm text-label-sm text-outline-variant">LIVES {lives}</span>
      </div>
      <div className="font-stat-value text-stat-value text-primary glow-text-primary">{scoreText}</div>
      <div className="text-tertiary font-stat-label text-stat-label mt-1 flex items-center gap-1">
      <Zap className="text-sm" aria-hidden={true} focusable="false" />
                x{Math.max(1, level)} MULTIPLIER
              </div>
      </div>
      {/* Level & Energy */}
      <div className="glass-panel p-panel-padding rounded flex flex-col gap-3 w-64 items-end">
      <div className="flex justify-between items-center w-full">
      <span className="font-stat-label text-stat-label text-outline tracking-wider">LEVEL {level}</span>
      <span className="font-stat-label text-stat-label text-primary">{energy > 60 ? 'OVERDRIVE READY' : 'RECHARGING'}</span>
      </div>
      {/* Energy Bar */}
      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden border border-white/10">
      <div className="h-full bg-secondary w-[85%] glow-secondary relative" style={{ width: `${energy}%` }}>
      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      </div>
      </div>
      </div>
      </div>
      {/* The Grid Playfield */}
      <div className="relative w-full max-w-2xl h-[716px] border border-primary/20 rounded-lg overflow-hidden bg-surface-container-lowest/50 backdrop-blur-sm flex flex-col items-center justify-end pb-12 perspective-[1000px]">
      {/* Central Target Area */}
      <div className="absolute bottom-16 w-full h-12 border-y-2 border-primary/50 flex justify-center gap-8 items-center bg-primary/5">
      <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center glow-primary bg-surface/50">
      <ChevronDown className="text-primary text-3xl" aria-hidden={true} focusable="false" />
      </div>
      <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center glow-primary bg-surface/50">
      <ChevronDown className="text-primary text-3xl" aria-hidden={true} focusable="false" />
      </div>
      <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center glow-primary bg-surface/50">
      <ChevronDown className="text-primary text-3xl" aria-hidden={true} focusable="false" />
      </div>
      </div>
      {/* Incoming Pulses (Visual Mockup) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex gap-8">
      <div className="w-12 h-12 bg-secondary rounded-full blur-[2px] opacity-80 glow-secondary transform -translate-x-24"></div>
      <div className="w-12 h-12 bg-tertiary rounded-full blur-[2px] opacity-80 glow-tertiary transform translate-y-12"></div>
      <div className="w-12 h-12 bg-primary rounded-full blur-[2px] opacity-80 glow-primary transform translate-x-24 translate-y-24"></div>
      </div>
      {/* Visual Feedback Tags */}
      <div className="absolute top-1/2 left-1/4 font-stat-value text-stat-value text-tertiary animate-bounce glow-text-primary">{score > 0 ? 'COMBO!' : 'READY'}</div>
      <div className="absolute top-2/3 right-1/4 font-stat-value text-stat-value text-error opacity-70">{lives < 3 ? 'MISS' : ''}</div>
      {/* Controls Overlay (When Paused/Not Running) */}
      {isPaused ? (
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-md flex flex-col items-center justify-center gap-6 z-20">
      <h2 className="font-display-lg text-display-lg text-primary glow-text-primary tracking-tighter italic">SYSTEM PAUSED</h2>
      <div className="flex flex-col gap-4 w-64">
      <button className="w-full py-4 border border-primary bg-primary/10 text-primary font-hud-header text-hud-header hover:bg-primary/20 hover:glow-primary transition-colors duration-300 rounded uppercase flex items-center justify-center gap-2" type="button" data-action-id="resume-11" onClick={actions?.["resume-11"]}>
      <Play aria-hidden={true} focusable="false" />
                  RESUME
                </button>
      <button className="w-full py-4 border border-outline text-outline font-hud-header text-hud-header hover:bg-surface-variant hover:text-on-surface-variant transition-colors duration-300 rounded uppercase flex items-center justify-center gap-2" type="button" data-action-id="restart-12" onClick={actions?.["restart-12"]}>
      <RefreshCw aria-hidden={true} focusable="false" />
                  RESTART
                </button>
      </div>
      <p className="font-label-sm text-label-sm text-outline-variant mt-4">PRESS [ESC] TO RESUME</p>
      </div>
      ) : null}
      </div>
      </main>
    </>
  );
}
