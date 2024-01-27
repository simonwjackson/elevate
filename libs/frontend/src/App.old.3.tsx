import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
import { ReleaseItem } from "./components/Release";

// @ts-ignore
setKeyMap({ left: null, up: null, right: null, down: null, enter: null });

init({
  debug: false,
  visualDebug: false,
  shouldFocusDOMNode: true,
});

export const nodes = pipe(createServer(), connectToNodes);

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
