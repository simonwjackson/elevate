import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  useFocusable,
  init,
  FocusContext,
  setKeyMap,
} from "@noriginmedia/norigin-spatial-navigation";
import { connectToNodes } from "./rpc";
import { useInputStore } from "./stores/useGamepadStore";
import { createServer } from "./utils/rpc/servers/webSocket";
import { pipe } from "fp-ts/lib/function";
import releases from "./games.json";

// @ts-ignore
setKeyMap({ left: null, up: null, right: null, down: null, enter: null });

init({
  debug: false,
  visualDebug: false,
  shouldFocusDOMNode: true,
});

const nodes = pipe(createServer(), connectToNodes);

function DevButton({ children }) {
  const { mutate, data } = useMutation({
    mutationFn: async () =>
      nodes.fiji.rpcClient
        .request("@elevate/core/releases/scan")
        .then(console.log),
  });

  const { ref, focused } = useFocusable();

  return (
    <div
      ref={ref}
      onClick={() => mutate()}
      style={{
        border: focused ? "10px solid #333" : "10px solid #00000000",
      }}
    >
      {children} {data}
    </div>
  );
}

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const useUserInput = (focused, handleGamepadEvent) => {
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

enum ActionType {
  ACCEPT = "accept",
}

const withActionable = (WrappedComponent) => {
  return ({ onInput, ...props }) => {
    const { ref, focused } = useFocusable();

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

const ReleaseItemBase = ({ item, focused, pressed }) => {
  return (
    <div
      style={{
        fontWeight: focused ? "bold" : "normal",
        fontStyle: pressed ? "oblique" : "normal",
      }}
    >
      {item.name} [{item.platform_code}]
    </div>
  );
};

const ReleaseItemActionable = withActionable(ReleaseItemBase);

const ReleaseItem = ({ item }) => {
  const [pressed, setPressed] = useState(false);

  const handleInput = useCallback(
    (actionEvent) => {
      switch (actionEvent.type) {
        case ActionType.ACCEPT: {
          if (actionEvent.state === "pressed") {
            setPressed(true);
          } else {
            setPressed(false);
            nodes.fiji.rpcClient
              .request("@elevate/core/releases/launch", item.id)
              .then(console.log);
          }
        }
      }
    },
    [item, setPressed],
  );

  return (
    <ReleaseItemActionable
      item={item}
      onInput={handleInput}
      pressed={pressed}
    />
  );
};

const Content = () => {
  const { ref, focusSelf, focusKey } = useFocusable();

  const query = useQuery({
    queryKey: ["@elevate/core/releases/fetch"],
    initialData: [],
    queryFn: async () => {
      return releases;

      const host = "fiji";
      return nodes[host].rpcClient
        .request("@elevate/core/releases/fetch", {
          eager: {
            $where: {
              name: {
                $like: "%%",
              },
            },
          },
        })
        .then((response) => {
          return response.map((release) => {
            return { meta: { host }, release };
          });
        });
    },
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  if (!query?.data) return null;

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        <DevButton method="scan">Scan</DevButton>
        <ul>
          {query.data.map((item) => (
            <li key={item.release.id}>
              <span
                style={{
                  display: "ruby",
                }}
              >
                {item.meta.host}: <ReleaseItem item={item.release} />
              </span>
            </li>
          ))}
        </ul>
      </ContentWrapper>
    </FocusContext.Provider>
  );
};

const AppContainer = styled.div`
  background-color: #221c35;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  *:focus {
      outline: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Content />
    </AppContainer>
  );
}
