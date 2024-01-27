import { useEffect, useState } from "react";
import { Provider as RxDbProvider, useRxCollection } from "rxdb-hooks";
import initialize from "./init";
import { useRxData } from "rxdb-hooks";
import classNames from "classnames";
import { create } from "zustand";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { addRxPlugin } from "rxdb";
import { useShallow } from "zustand/react/shallow";
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
import { ReleaseItem } from "./components/Release";

addRxPlugin(RxDBUpdatePlugin);

// @ts-ignore
setKeyMap({ left: null, up: null, right: null, down: null, enter: null });

init({
  debug: false,
  visualDebug: false,
  shouldFocusDOMNode: true, // INFO: Needed for RN (i think)
});

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

interface GlobalState {
  // user: any | null;
  // setUser: (user: any) => void;
  hosts: Record<
    string,
    {
      online: boolean;
    }
  >;
  setHostOnline: (host: string, online: boolean) => void;
  getHostsOnline: () => string[];
}

const useGlobalStore = create<GlobalState>()(
  devtools(
    // persist(
    (set, get) => ({
      // user: null,
      // setUser: (user: any) => set({ user }),
      getHostsOnline: () =>
        Object.entries(get().hosts)
          .filter(([, obj]) => obj.online)
          .map(([host]) => host),

      setHostOnline: (host, online) =>
        set(
          produce((state) => {
            state.hosts[host].online = online;
          }),
        ),

      hosts: {
        yari: { online: true },
      },
    }),
    {
      name: "global-storage",
    },
    // ),
  ),
);

const Pinned = ({ user }) => {
  const [online] = useGlobalStore(
    useShallow((state) => [state.getHostsOnline()]),
  );

  const { result: pins, isFetching } = useRxData("releases", (releases) =>
    releases.pinnedBy(user, online),
  );

  // console.log(user.update, user.atomicUpdate)

  if (isFetching) {
    return "aloading releases...";
  }

  return (
    <>
      <h1>Pinned</h1>
      {pins.map((release) => (
        <div
          key={release.id}
          className="release"
          onClick={(e) => {
            e.stopPropagation();

            if (e.shiftKey) {
              console.log(user.pins.releases);
              user.update({
                $set: {
                  "pins.releases": user.pins.releases.filter(
                    (item) => item !== release.id,
                  ),
                },
              });
            }
          }}
        >
          <img
            alt={release.name}
            width={200}
            src={release?.media?.grids?.[0]}
          />
        </div>
      ))}
    </>
  );
};

// function Release({ name, available, grid }) {
//   return (
//     <div
//       className={classNames({
//         release: true,
//         unavailable: !available,
//       })}
//     >
//       <img alt={name} width={200} src={grid} />
//     </div>
//   );
// }

const sortOnline = (library, online) => {
  let onlineItems = [];
  let offlineItems = [];

  library.forEach((item) => {
    // Check if the item is online
    const isOnline = item.resources.some((resource) =>
      online.includes(resource.host),
    );

    if (isOnline) {
      onlineItems.push(item);
    } else {
      offlineItems.push(item);
    }
  });

  return [onlineItems, offlineItems];
};

const Library = ({ user }) => {
  const online = useGlobalStore((state) => state.getHostsOnline());
  const { result: library, isFetching } = useRxData("releases", (releases) =>
    releases.find(),
  );

  if (isFetching) {
    return "aloading releases...";
  }

  const [libOnline, libOffline] = sortOnline(library, online);

  return (
    <>
      <h1>Library</h1>
      <div className="release">
        {libOnline.map((release, idx) => (
          // <div
          //   key={idx}
          //   onClick={(e) => {
          //     if (e.shiftKey) {
          //       user.update({
          //         $set: {
          //           "pins.releases": [
          //             ...new Set([...user.pins.releases, release.id]),
          //           ],
          //         },
          //       });
          //     }
          //   }}
          // >
          // </div>
          <ReleaseItem
            release={release}
            // image={release?.media?.grids?.[0]}
            // pressed={false}
            // focused={false}
          />
        ))}
        {libOffline.map((release, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              if (e.shiftKey) {
                user.update({
                  $set: {
                    "pins.releases": [
                      ...new Set([...user.pins.releases, release.id]),
                    ],
                  },
                });
              }
            }}
          >
            <ReleaseItem release={release} />
          </div>
        ))}
      </div>
    </>
  );
};

const useDefaultUser = () => {
  const { result: users } = useRxData(
    "users",
    // a function returning the query to be applied
    (users) => users.getDefaultUser(),
  );

  return users[0] ?? null;
};

const Asdf = () => {
    const { ref, focused } = useFocusable();

    return (
      <div style={{ color: focused ? 'green' : ''}}>hi</div>
    )
}

const UserContainer = () => {
  const user = useDefaultUser();

  if (!user) {
    return "loading user...";
  }

  return (
    <>
      {/* <Pinned user={user} /> */}
      <Asdf />
      {/* <Asdf />
      <Asdf />
      <Asdf />
      <Asdf />
      <Asdf />
      <Asdf /> */}
      <Library user={user} />
    </>
  );
};

export const DevBox = () => {
  const hosts = useGlobalStore((state) => state.hosts);
  const setHostOnline = useGlobalStore((state) => state.setHostOnline);

  return Object.entries(hosts).map(([host, obj]) => {
    return (
      <div key={host}>
        {host}:
        <input
          type="checkbox"
          checked={obj.online}
          onChange={(e) => {
            setHostOnline(host, e.target.checked);
          }}
        />
        <br />
      </div>
    );
  });
};

function sortByOnline(online: string[]) {
  return (a, b) => {
    // Check if any resource of item 'a' is online
    const aIsOnline = a.resources.some((resource) =>
      online.includes(resource.host),
    );
    // Check if any resource of item 'b' is online
    const bIsOnline = b.resources.some((resource) =>
      online.includes(resource.host),
    );

    // Sort such that online items come before offline items
    if (aIsOnline && !bIsOnline) {
      return -1;
    } else if (!aIsOnline && bIsOnline) {
      return 1;
    } else {
      return 0;
    }
  };
}

const GlobalStyle = createGlobalStyle`
  *:focus {
      outline: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const AppContainer = styled.div`
  background-color: #221c35;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default function App({ children }) {
  const { ref, focusSelf, focusKey } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <Providers>
      <AppContainer>
        <FocusContext.Provider value={focusKey}>
          <ContentWrapper>
            <div className="App">
              <GlobalStyle />
              <DevBox />
              <UserContainer />
            </div>
          </ContentWrapper>
        </FocusContext.Provider>
      </AppContainer>
    </Providers>
  );
}

function Providers({ children }) {
  const [db, setDb] = useState();

  useEffect(() => {
    // RxDB instantiation can be asynchronous
    initialize().then(setDb);
  }, []);

  return <RxDbProvider db={db}>{children}</RxDbProvider>;
}
