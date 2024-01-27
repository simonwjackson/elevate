import { useInterval } from "usehooks-ts";
import React, { useCallback, useEffect, useState, useRef } from "react";
import initialize from "./init";
import { Provider as RxDbProvider, useRxData } from "rxdb-hooks";
// eslint-disable-next-line import/no-extraneous-dependencies
// import ReactDOMClient from "react-dom/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from "styled-components";
import {
  useFocusable,
  init,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  setKeyMap,
} from "@noriginmedia/norigin-spatial-navigation";
import { ReleaseItem } from "./components/Release";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { createServer } from "./utils/rpc/servers/webSocket";
import { create as createWebSocketClientNode } from "../../../libs/utils/jsonRPC/webSockets/clientNode.ts";

export const frontendJsonRpcServer = createServer();

export const useSettingsStore = create(
  persist(
    (set) => ({
      hostName: null,
      nodes: {},
      setSettings: (obj) => set(obj),
    }),
    {
      name: "settings", // name of the item in the storage (must be unique)
    },
  ),
);

// @ts-ignore
setKeyMap({ left: null, up: null, right: null, down: null, enter: null });

init({
  debug: false,
  visualDebug: false,
  shouldFocusDOMNode: true, // INFO: Needed for RN (i think)
});

const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: "Segoe UI";
  padding-left: 60px;
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

interface ContentRowProps {
  title: string;
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails,
  ) => void;
}

function Collection({
  title: rowTitle,
  onAssetPress,
  onFocus,
  collection,
}: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus,
  });

  const scrollingRef = useRef(null);

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
      console.log("scrolling");
      scrollingRef.current.scrollTo({
        left: x,
        behavior: "smooth",
      });
    },
    [scrollingRef],
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{rowTitle}</ContentRowTitle>
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {collection.map((release) => (
              <ReleaseItem release={release} onFocus={onAssetFocus} />
            ))}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

const useDefaultUser = () => {
  const { result: users } = useRxData(
    "users",
    // a function returning the query to be applied
    (users) => users.getDefaultUser(),
  );

  return users[0] ?? null;
};

function DevButton({ children }) {
  const { ref, focused, focusSelf } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        border: focused ? "10px solid #333" : "10px solid #00000000",
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}

const Pinned = ({ onRowFocus }) => {
  const user = useDefaultUser();

  const { result: pins } = useRxData("releases", (releases) => {
    if (!user) return null;

    return releases.pinnedBy(user, ["yari"]);
  });

  return <Collection collection={pins} title={"Pinned"} onFocus={onRowFocus} />;
};

const Library = ({ onRowFocus }) => {
  const { result: library } = useRxData("releases", (releases) =>
    releases.find(),
  );

  return (
    <Collection collection={library} title={"Library"} onFocus={onRowFocus} />
  );
};

function Content() {
  const { ref } = useFocusable();
  const [selectedAsset, setSelectedAsset] = useState(null);

  const onRowFocus = useCallback(
    ({ y }: { y: number }) => {
      ref.current.scrollTo({
        top: y,
        behavior: "smooth",
      });
    },
    [ref],
  );

  return (
    <ContentWrapper>
      <DevButton method="scan">Scan</DevButton>
      <ScrollingRows ref={ref}>
        <div>
          <Pinned onRowFocus={onRowFocus} />
          <Library onRowFocus={onRowFocus} />
          <Library onRowFocus={onRowFocus} />
          <Library onRowFocus={onRowFocus} />
          <Library onRowFocus={onRowFocus} />
          <Library onRowFocus={onRowFocus} />
          <Library onRowFocus={onRowFocus} />
          <Library onRowFocus={onRowFocus} />
        </div>
      </ScrollingRows>
    </ContentWrapper>
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
  ::-webkit-scrollbar {
    display: none;
  }
`;

export function Providers({ children }) {
  const [db, setDb] = useState();
  const [hostName, set] = useSettingsStore(
    useShallow((state) => [state.hostName, state.setSettings]),
  );

  useEffect(() => {
    // RxDB instantiation can be asynchronous
    initialize().then(setDb);
  }, []);

  // HACK: detect device
  const [count, setCount] = useState<number>(1);
  const delay = 500;

  useInterval(
    () => {
      if (window.isMobileHost) {
        set({
          hostName: "yari",
          nodes: {
            yari: {
              client: null,
            },
          },
        });
      }
      else if (count === 8) {
        set({
          hostName: "fiji",
          nodes: {
            fiji: {
              client: createWebSocketClientNode(
                frontendJsonRpcServer,
                "fiji",
                3000,
              ),
            },
          },
        });
      }

      setCount(count + 1);
    },
    !hostName ? delay : null,
  );

  if (!db) return null;

  return (
    <React.StrictMode>
      <RxDbProvider db={db}>{children}</RxDbProvider>
    </React.StrictMode>
  );
}

export default () => {
  return (
    <Providers>
      <AppContainer>
        <GlobalStyle />
        <Content />
      </AppContainer>
    </Providers>
  );
};
