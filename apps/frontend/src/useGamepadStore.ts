import { create } from "zustand";
import { GamepadListener } from "gamepad.js";
import { navigateByDirection } from "@noriginmedia/norigin-spatial-navigation";
import EventEmitter from "events";

declare class GamepadEventHandler extends EventEmitter {
  static optionResolver: OptionResolver;

  private index: number;
  private gamepad: Gamepad;
  private options: { axis: OptionConfig; button: OptionConfig };
  private axes: number[];
  private buttons: number[];

  constructor(index: number, gamepad: Gamepad, config?: ConfigOptions);

  private static resolveOptions(config: Partial<ConfigOptions>): {
    axis: OptionConfig;
    button: OptionConfig;
  };

  private initAxes(): void;
  private initButtons(): void;
  public update(gamepad: Gamepad): void;
  private updateAxis(): void;
  private updateButtons(): void;
  private setAxisValue(index: number, value: number): void;
  private setButtonValue(index: number, value: number): void;
  private resolveAxisValue(index: number): number;
  private resolveButtonValue(index: number): number;
}

// Additional type definitions for config objects
interface ConfigOptions {
  analog?: boolean;
  deadZone?: number;
  precision?: number;
  axis?: Partial<ConfigOptions>;
  button?: Partial<ConfigOptions>;
}

interface OptionConfig {
  analog: boolean;
  deadZone: number;
  precision: number;
}

// Assuming OptionResolver has a similar structure
declare class OptionResolver {
  setDefaults(defaults: Partial<ConfigOptions>): this;
  setTypes(types: Partial<ConfigOptions>): this;
  setValidators(validators: Record<string, (value: any) => any>): this;
  resolve(config: Partial<ConfigOptions>): OptionConfig;
}

declare class GamepadListener extends EventEmitter {
  private options: { analog: boolean };
  private handlers: (GamepadEventHandler | null)[];
  private loop: any;

  constructor(options?: any);

  public start(): void;
  public stop(): void;
  private update(): void;
  private discover(gamepad: Gamepad | null, index: number): void;
  private registerHandler(index: number, gamepad: Gamepad): void;
  private removeGamepad(index: number): void;
  private onAxis(event: GamepadEvent): void;
  private onButton(event: GamepadEvent): void;
}

// Assuming a structure for GamepadEvent used in the onAxis and onButton methods
interface GamepadEvent {
  detail: {
    gamepad: Gamepad;
    index: number;
    axis?: number;
    button?: number;
    value?: number;
  };
}

interface GamepadStore {
  subscribers: Set<GamepadEventHandler>;
  subscribe: (handler: GamepadEventHandler) => void;
  unsubscribe: (handler: GamepadEventHandler) => void;
  handleGamepadEvent: (event: any) => void;
}

export const useGamepadStore = create<GamepadStore>((set, get) => ({
  subscribers: new Set<GamepadEventHandler>(),

  subscribe: (handler: GamepadEventHandler) => {
    const { subscribers } = get();
    set({ subscribers: new Set(subscribers).add(handler) });
  },

  unsubscribe: (handler: GamepadEventHandler) => {
    const { subscribers } = get();
    subscribers.delete(handler);
    set({ subscribers: new Set(subscribers) });
  },

  handleGamepadEvent: (event: any) => {
    // Adjust the event type here as well
    get().subscribers.forEach((handler) => handler(event));
  },
}));

const listener: GamepadListener = new GamepadListener({ analog: false });

listener.on("gamepad:connected", console.log);
listener.on("gamepad:disconnected", console.log);

listener.on("gamepad:button", (event) => {
  useGamepadStore.getState().handleGamepadEvent(event);
});

const ifNegative = (value: number, onTrue: string, onFalse: string) =>
  value < 0 ? onTrue : onFalse;

const getDirectionFromAxisValue = (
  axis: number,
  value: number,
): string | null => {
  if (value === 0) return null;

  switch (axis) {
    case 5:
    case 1:
      return ifNegative(value, "up", "down");
    case 4:
    case 0:
      return ifNegative(value, "left", "right");
    default:
      return null;
  }
};

listener.on("gamepad:axis", (axisEvent) => {
  const direction = getDirectionFromAxisValue(
    axisEvent.detail.axis,
    axisEvent.detail.value,
  );

  if (direction) navigateByDirection(direction);
});

if (!window.hasGamepadListener) {
  listener.start();
  window.hasGamepadListener = true;
}
