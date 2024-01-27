import { useCallback, useEffect, useState } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import classNames from "classnames";
import { useInputStore } from "../stores/useGamepadStore";
import { connectToNodes } from "../rpc";
import { createServer } from "../utils/rpc/servers/webSocket";
import { pipe } from "fp-ts/lib/function";

const nodes = pipe(createServer(), connectToNodes);

enum ActionType {
  ACCEPT = "accept",
}

export const useUserInput = (focused, handleGamepadEvent) => {
  const { subscribe, unsubscribe } = useInputStore();

  useEffect(() => {
    if (focused) {
      subscribe(handleGamepadEvent);
    } else {
      unsubscribe(handleGamepadEvent);
    }

    return () => unsubscribe(handleGamepadEvent);
  }, [focused, subscribe, unsubscribe]);
};

const withActionable = (WrappedComponent) => {
  return ({ onInput, onFocus, ...props }) => {
    const { ref, focused } = useFocusable({ onFocus });

    const handleGamepadInput = (event) => {
      const buttonToActionIndex = ["accept"];
      const keyToAction = {
        Space: ActionType.ACCEPT,
        Enter: ActionType.ACCEPT,
      };

      if (event.code) {
        onInput({
          type: keyToAction[event.code],
          state: event.type === "keydown" ? "pressed" : "released",
        });
      } else {
        onInput({
          type: buttonToActionIndex[event.detail.button],
          state: event.detail.pressed ? "pressed" : "released",
        });
      }
    };

    useUserInput(focused, handleGamepadInput);

    return (
      <div ref={ref} style={{ display: "inherit" }}>
        <WrappedComponent {...props} onInput={onInput} focused={focused} />
      </div>
    );
  };
};

export const ReleaseItemBase = ({ image, name, focused, pressed }) => {
  return (
    <div
      className={classNames({
        release: true,
        // unavailable: !available,
      })}
      style={{
        paddingRight: '1rem',
        color: pressed ? 'green' : focused ? 'red': '',
        border: pressed ? '2px solid green' : focused ? '2px solid white': '',
        width: '15rem'
      }}
    >
      {/* <img alt={name} width={200} src="http://placehold.it/200x300" style={{ */}
      <img alt={name} width={200} src={image} style={{
        height: 'auto',
        maxWidth: '100%',
        objectFit: 'contain'
      }} />
    </div>
  );
};

const ReleaseItemActionable = withActionable(ReleaseItemBase);

export const ReleaseItem = ({ release, onFocus }) => {
  const [pressed, setPressed] = useState(false);
  // TODO: Get nodes from zustand

  const handleInput = useCallback(
    (actionEvent) => {
      switch (actionEvent.type) {
        case ActionType.ACCEPT: {
          if (actionEvent.state === "pressed") {
            setPressed(true);
          } else {
            setPressed(false);
            // release.resources.filter(resource => resource.host === "yari")[0].location
            nodes.yari.rpcClient
              .request("@elevate/core/releases/launch", release)
          }
        }
      }
    },
    [release, setPressed],
  );

  return (
    <ReleaseItemActionable
      image={release?.media?.grids?.[0]}
      name={release?.name}
      onInput={handleInput}
      onFocus={onFocus}
      pressed={pressed}
    />
  );
};
