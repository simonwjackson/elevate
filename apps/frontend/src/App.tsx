import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState, useRef, useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  useFocusable,
  init,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import { buildHosts, createFrontendJsonRpcServer } from "./rpc";
import type Release from "../../../libs/db/models/Release";
import { useGamepadStore } from "./useGamepadStore";

init({
  debug: false,
  visualDebug: false,
  shouldFocusDOMNode: true,
});

// setKeyMap({
//   left: 37,
//   up: 38,
//   right: 39,
//   down: [40],
//   // left: [37, 205, 214, 9001], // or 'ArrowLeft'
//   // up: 9002, // or 'ArrowUp'
//   // right: 9003, // or 'ArrowRight'
//   // down: [9004, 204, 212, 40],
//   // // enter: 9005 // or 'Enter'
//   // // up: [203, 211],
//   // // right: [206, 213],
//   enter: [15, 13, 49],
// });

const rpcServer = createFrontendJsonRpcServer();
const hosts = buildHosts(rpcServer);

function DevButton({ method, children }) {
  const { mutate, data } = useMutation({
    mutationFn: async () => {
      return hosts.fiji.rpcClient.request("scanReleases");
    },
  });

  const { ref, focused } = useFocusable({
    onEnterRelease: mutate,
  });

  return (
    <div
      ref={ref}
      onClick={console.log}
      tabIndex={-1}
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

const useGamepadEvent = (isActive: boolean, handleGamepadEvent: Function) => {
  const { subscribe, unsubscribe } = useGamepadStore();

  useEffect(() => {
    if (isActive) {
      subscribe(handleGamepadEvent);
    } else {
      unsubscribe(handleGamepadEvent);
    }

    // Cleanup on unmount or when isActive changes
    return () => unsubscribe(handleGamepadEvent);
  }, [isActive, handleGamepadEvent, subscribe, unsubscribe]);
};

const ReleaseItem = ({ item }: { item: Release }) => {
  const { ref, focused } = useFocusable();
  const { subscribe, unsubscribe } = useGamepadStore();

  const handleGamepadEvent = (event) => {
    if (focused) {
      if (event.detail.button === 0 && event.detail.pressed)
        console.log({ item, event });
    }
  };

  useEffect(() => {
    if (focused) {
      subscribe(handleGamepadEvent);
    } else {
      unsubscribe(handleGamepadEvent);
    }

    return () => unsubscribe(handleGamepadEvent);
  }, [focused, subscribe, unsubscribe]);

  const handleKeyPress = (event: any) => {
    console.log(event);
  };

  return (
    <div
      ref={ref}
      tabIndex={-1}
      onKeyDown={handleKeyPress}
      onKeyUp={handleKeyPress}
      style={{
        fontWeight: focused ? "bold" : "normal",
      }}
    >
      {item.name} [{item.platform.code}]
    </div>
  );
};

function Content() {
  const { ref, focusSelf, focusKey } = useFocusable();
  const [selectedAsset, setSelectedAsset] = useState(null);

  const query = useQuery({
    queryKey: ["getAllReleases"],
    initialData: [],
    queryFn: async () => {
      return hosts.fiji.rpcClient.request("getAllReleases");
    },
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        <DevButton method="scan">Scan</DevButton>
        <DevButton method="echo">Echo</DevButton>
        <ul>
          {query.data.map((item) => (
            <li key={item.id}>
              <ReleaseItem item={item} />
            </li>
          ))}
        </ul>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}

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
