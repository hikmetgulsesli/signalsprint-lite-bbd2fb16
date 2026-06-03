// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Settings - SignalSprint Lite
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { CircleHelp, Music, Volume2 } from "lucide-react";


export type GameSettingsSignalsprintLiteActionId = "save-changes-1" | "back-to-game-2";

export interface GameSettingsSignalsprintLiteProps {
  actions?: Partial<Record<GameSettingsSignalsprintLiteActionId, () => void>>;

}

export function GameSettingsSignalsprintLite({ actions }: GameSettingsSignalsprintLiteProps) {
  return (
    <>
      {/* Ambient Game Elements behind Modal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
      </div>
      {/* Main Settings Modal (Level 2: The Glass) */}
      <main className="relative z-10 w-full max-w-md bg-surface-container-high/80 backdrop-blur-xl hud-border rounded-lg p-panel-padding shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      {/* Header */}
      <header className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
      <div>
      <h1 className="font-hud-header text-hud-header text-primary tracking-wide">SYSTEM_CONFIG</h1>
      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 uppercase tracking-widest">SignalSprint V1.0</p>
      </div>
      <div className="font-stat-label text-stat-label text-outline bg-surface-container px-2 py-1 rounded">
                      v1.0.4b
                  </div>
      </header>
      <div className="space-y-8">
      {/* Section: Pulse Velocity (Difficulty) */}
      <section className="space-y-3">
      <div className="flex justify-between items-center">
      <h2 className="font-stat-label text-stat-label text-secondary uppercase tracking-wider">Pulse Velocity</h2>
      <span className="font-stat-value text-stat-value text-on-surface" id="velocity-readout">NORMAL</span>
      </div>
      <div className="relative py-2">
      <input className="w-full" id="velocity-slider" max="4" min="1" type="range" defaultValue="2" />
      <div className="flex justify-between font-label-sm text-label-sm text-outline mt-2 px-1">
      <span>SLOW</span>
      <span>NORMAL</span>
      <span>FAST</span>
      <span className="text-secondary">HYPER</span>
      </div>
      </div>
      </section>
      {/* Section: Audio Controls */}
      <section className="grid grid-cols-2 gap-4">
      <div className="bg-surface/50 border border-white/5 p-3 flex items-center justify-between group hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-2">
      <Music className="text-outline group-hover:text-primary transition-colors text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-stat-label text-stat-label text-on-surface">Music</span>
      </div>
      {/* Custom Toggle */}
      <label className="relative inline-flex items-center cursor-pointer">
      <input defaultChecked={true} className="sr-only peer" type="checkbox" defaultValue="" />
      <div className="w-9 h-4 bg-surface-variant peer-focus:outline-none rounded-none border border-white/10 peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-outline after:border-outline after:border after:h-3 after:w-4 after:transition-all peer-checked:bg-primary/20 peer-checked:after:bg-primary peer-checked:after:shadow-[0_0_8px_theme('colors.primary')]"></div>
      </label>
      </div>
      <div className="bg-surface/50 border border-white/5 p-3 flex items-center justify-between group hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-2">
      <Volume2 className="text-outline group-hover:text-primary transition-colors text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-stat-label text-stat-label text-on-surface">SFX</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
      <input defaultChecked={true} className="sr-only peer" type="checkbox" defaultValue="" />
      <div className="w-9 h-4 bg-surface-variant peer-focus:outline-none rounded-none border border-white/10 peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-outline after:border-outline after:border after:h-3 after:w-4 after:transition-all peer-checked:bg-primary/20 peer-checked:after:bg-primary peer-checked:after:shadow-[0_0_8px_theme('colors.primary')]"></div>
      </label>
      </div>
      </section>
      {/* Section: How to Play */}
      <section className="bg-surface-container-highest/50 border-l-2 border-tertiary p-4 space-y-3">
      <h2 className="font-stat-label text-stat-label text-tertiary uppercase tracking-wider flex items-center gap-2">
      <CircleHelp className="text-[16px]" aria-hidden={true} focusable="false" />
                          How to Play
                      </h2>
      <div className="grid grid-cols-2 gap-2 font-label-sm text-label-sm text-on-surface-variant">
      <div className="flex justify-between items-center bg-surface/40 px-2 py-1">
      <span>Switch Lane</span>
      <kbd className="bg-surface-bright text-primary border border-primary/30 px-2 py-0.5 rounded-sm">SPACE</kbd>
      </div>
      <div className="flex justify-between items-center bg-surface/40 px-2 py-1">
      <span>Pause</span>
      <kbd className="bg-surface-bright text-primary border border-primary/30 px-2 py-0.5 rounded-sm">P</kbd>
      </div>
      </div>
      </section>
      </div>
      {/* Action Footer */}
      <footer className="mt-8 flex flex-col gap-3 pt-4 border-t border-white/10">
      <button className="w-full bg-primary/10 border border-primary text-primary font-hud-header text-hud-header py-3 px-4 uppercase tracking-widest hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(47,217,244,0.4)] transition-colors active:scale-[0.98]" type="button" data-action-id="save-changes-1" onClick={actions?.["save-changes-1"]}>
                      Save Changes
                  </button>
      <button className="w-full bg-transparent border border-outline/50 text-outline font-stat-label text-stat-label py-2 px-4 uppercase tracking-widest hover:text-on-surface hover:border-white/50 transition-colors" type="button" data-action-id="back-to-game-2" onClick={actions?.["back-to-game-2"]}>
                      Back to Game
                  </button>
      </footer>
      </main>
      
    </>
  );
}
