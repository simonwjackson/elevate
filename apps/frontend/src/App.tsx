import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
  Children,
} from "react";
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

interface Pipe {
  <A>(value: A): A;
  <A, B>(value: A, fn1: (input: A) => B): B;
  <A, B, C>(value: A, fn1: (input: A) => B, fn2: (input: B) => C): C;
  <A, B, C, D>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D,
  ): D;
  <A, B, C, D, E>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D,
    fn4: (input: D) => E,
  ): E;
  // ... and so on
}

const pipe: Pipe = (value: any, ...fns: Function[]): unknown => {
  return fns.reduce((acc, fn) => fn(acc), value);
};

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

const useGamepad = (focused, handleGamepadEvent) => {
  const { subscribe, unsubscribe } = useGamepadStore();

  useEffect(() => {
    if (focused) {
      subscribe(handleGamepadEvent);
    } else {
      unsubscribe(handleGamepadEvent);
    }

    return () => unsubscribe(handleGamepadEvent);
  }, [focused, subscribe, unsubscribe]);
};

// const Actionable = ({ onInput, children }) => {
//   const { ref, focused } = useFocusable();
//
//   useGamepad(focused, onInput);
//
//   const handleKeyPress = (event: any) => {
//     console.log(event);
//   };
//
//   return (
//     <div
//       style={{ display: "inherit" }}
//       ref={ref}
//       tabIndex={-1}
//       onKeyDown={handleKeyPress}
//       onKeyUp={handleKeyPress}
//     >
//       {children(focused)}
//     </div>
//   );
// };
//
// const ReleaseItem = ({ item }: { item: Release }) => {
//   const handleInput = (event) => {
//     if (event.detail.button === 0 && event.detail.pressed) {
//       console.log({ item, event });
//     }
//   };
//
//   return (
//     <Actionable onInput={handleInput}>
//       {(focused) => (
//         <div
//           style={{
//             fontWeight: focused ? "bold" : "normal",
//           }}
//         >
//           {item.name} [{item.platform.code}]
//         </div>
//       )}
//     </Actionable>
//   );
// };

// interface WithInputProps {
//   onInput?: (event: React.KeyboardEvent | GamepadEvent) => void;
//   focused?: boolean;
// }
//
// type WrappedComponentType = React.ComponentType<WithInputProps>;

enum ActionType {
  ACCEPT = "accept",
}
const withActionable = (WrappedComponent) => {
  return ({ onInput, ...props }) => {
    const { ref, focused } = useFocusable();

    const handleGamepadInput = (event) => {
      const buttonToAction = ["accept"];

      onInput({
        type: buttonToAction[event.detail.button],
        state: event.detail.pressed ? "pressed" : "released",
      });
    };

    const handleKeyPress = (event) => {
      onInput(event);
    };

    useGamepad(focused, handleGamepadInput);

    return (
      <div
        style={{ display: "inherit" }}
        ref={ref}
        tabIndex={-1}
        onKeyDown={handleKeyPress}
        onKeyUp={handleKeyPress}
      >
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
      {item.name} [{item.platform.code}]
    </div>
  );
};

const ReleaseItemActionable = pipe(ReleaseItemBase, withActionable);

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
            console.log({ item, actionEvent });
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
