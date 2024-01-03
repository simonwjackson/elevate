import { create } from "zustand";
import { GamepadListener } from "gamepad.js";
import { navigateByDirection } from "@noriginmedia/norigin-spatial-navigation";

export const useInputStore = create()((set, get) => ({
  subscribers: new Set(),

  subscribe: (handler) => {
    const { subscribers } = get();
    set({ subscribers: new Set(subscribers).add(handler) });
  },

  unsubscribe: (handler) => {
    const { subscribers } = get();
    subscribers.delete(handler);
    set({ subscribers: new Set(subscribers) });
  },

  handleGamepadEvent: (event: any) => {
    get().subscribers.forEach((handler) => handler(event));
  },

  handleKeyboardEvent: (event: any) => {
    get().subscribers.forEach((handler) => handler(event));
  },
}));

const listener: GamepadListener = new GamepadListener({ analog: false });

listener.on("gamepad:connected", console.log);
listener.on("gamepad:disconnected", console.log);

listener.on("gamepad:button", (event) => {
  useInputStore.getState().handleGamepadEvent(event);
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

function handleKeyboardEvent(event: KeyboardEvent): void {
  if (event.repeat) return;

  const keyToAction = {
    ArrowDown: "down",
    ArrowUp: "up",
    ArrowLeft: "left",
    ArrowRight: "right",
    j: "down",
    k: "up",
    h: "left",
    l: "right",
  };

  if (keyToAction[event.key]) {
    if (event.type === "keydown") {
      navigateByDirection(keyToAction[event.key]);
    }
  } else {
    useInputStore.getState().handleGamepadEvent(event);
  }
}

if (!window.hasKeyboardListener) {
  window.addEventListener("keydown", handleKeyboardEvent);
  window.addEventListener("keyup", handleKeyboardEvent);
  window.hasKeyboardListener = true;
}
