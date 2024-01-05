import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import shuffle from "lodash/shuffle";
import {
  useFocusable,
  init,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
} from "@noriginmedia/norigin-spatial-navigation";
import { buildHosts, createFrontendJsonRpcServer } from "./rpc";

init({
  debug: false,
  visualDebug: false,
});

const rpcServer = createFrontendJsonRpcServer();
const hosts = buildHosts(rpcServer);

// HACK:
const device = "yari";

// setInterval(
//   () =>
//     hosts.yari.rpcClient
//       .request("echo", { message: "from frontend to host" })
//       .then(JSON.stringify)
//       .then(alert),
//   5000,
// );

// .then(JSON.stringify)
// NOTE: We need socket.io now
// setTimeout(() => {
//   hosts.fiji.rpcClient.request("scanReleases").then(console.log);
//   // hosts.fiji.rpcClient.request("echo", { message: "hi" }).then(console.log);
// }, 5000);

const rows = shuffle([
  {
    title: "Recent",
  },
]);

interface MenuItemBoxProps {
  focused: boolean;
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
  width: 171px;
  height: 51px;
  background-color: #b056ed;
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "6px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 37px;
`;

function MenuItem() {
  const { ref, focused } = useFocusable();

  return <MenuItemBox ref={ref} focused={focused} />;
}

interface MenuWrapperProps {
  hasFocusedChild: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  flex: 1;
  max-width: 246px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ hasFocusedChild }) =>
    hasFocusedChild ? "#4e4181" : "#362C56"};
  padding-top: 37px;
`;

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
      style={{
        border: focused ? "10px solid #333" : "10px solid #00000000",
      }}
    >
      {children} {data}
    </div>
  );
}

interface MenuProps {
  focusKey: string;
}

function Menu({ focusKey: focusKeyParam }: MenuProps) {
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey,
    // setFocus, -- to set focus manually to some focusKey
    // navigateByDirection, -- to manually navigate by direction
    // pause, -- to pause all navigation events
    // resume, -- to resume all navigation events
    // updateAllLayouts, -- to force update all layouts when needed
    // getCurrentFocusKey -- to get the current focus key
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: null,
    onEnterPress: () => {},
    onEnterRelease: () => {},
    onArrowPress: () => true,
    onFocus: () => {},
    onBlur: () => {},
    extraProps: { foo: "bar" },
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </MenuWrapper>
    </FocusContext.Provider>
  );
}

const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;

interface AssetBoxProps {
  focused: boolean;
  color: string;
}

const AssetBox = styled.div<AssetBoxProps>`
  width: 225px;
  height: 127px;
  background-color: ${({ color }) => color};
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "6px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;
`;

const AssetTitle = styled.div`
  color: white;
  margin-top: 10px;
  font-family: "Segoe UI";
  font-size: 24px;
  font-weight: 400;
`;

interface AssetProps {
  media: {
    wide: string;
    tall: string;
    square: string;
  };
  title: string;
  color: string;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails,
  ) => void;
}

function Asset({ media, title, color, onEnterPress, onFocus }: AssetProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      color,
    },
  });

  return (
    <AssetWrapper ref={ref}>
      <AssetBox color={"#714ADD"} focused={focused}>
        <img
          src={media.wide}
          style={{ width: "100%", objectFit: "cover", height: "100%" }}
        />
      </AssetBox>
      {/* <AssetTitle>{title}</AssetTitle> */}
    </AssetWrapper>
  );
}

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

function ContentRow({
  title: rowTitle,
  // onAssetPress,
  onFocus,
}: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus,
  });

  const scrollingRef = useRef(null);

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
      // @ts-ignore
      scrollingRef.current.scrollTo({
        left: x,
        behavior: "smooth",
      });
    },
    [scrollingRef],
  );

  const onSelect = async (asset: any) => {
    // HACK: Dont assume single host
    const hostName = asset.hosts[0] as string;

    // HACK:
    return Promise.resolve()
      .then(() => {
        if (device === "yari" && hostName === "zao") {
          return hosts[hostName].rpcClient.request("resolution/set", {
            x: 1024,
            y: 768,
          });
        }

        return Promise.resolve("next");
      })
      .then(() => {
        return hosts["zao"].rpcClient.request("launch", {
          id: asset.id,
        });
      })
      .then(console.log);
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{rowTitle}</ContentRowTitle>
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {assets.map((asset) => (
              <div key={asset.title} onClick={() => onSelect(asset)}>
                <Asset
                  media={asset.media}
                  title={asset.title}
                  color={asset.color}
                  onEnterPress={
                    () => onSelect(asset)
                    // onAssetPress()
                    // sendMessage({
                    //   topic: "launch",
                    //   payload: {
                    //     id,
                    //   },
                    // })
                  }
                  onFocus={onAssetFocus}
                />
              </div>
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

const ContentTitle = styled.div`
  color: white;
  font-size: 48px;
  font-weight: 600;
  font-family: "Segoe UI";
  text-align: center;
  margin-top: 52px;
  margin-bottom: 37px;
`;

const SelectedItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedItemBox = styled.div`
  height: 50vh;
  width: 100%;
  background-color: ${({ color }) => color};
  margin-bottom: 37px;
`;

const SelectedItemTitle = styled.div`
  position: absolute;
  bottom: 75px;
  left: 100px;
  color: white;
  font-size: 27px;
  font-weight: 400;
  font-family: "Segoe UI";
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

function Content() {
  const { ref, focusSelf, focusKey } = useFocusable();
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    focusSelf();
    // alternatively
    // setFocus('BUTTON_PRIMARY');
  }, [focusSelf]);

  const onAssetPress = useCallback((asset: AssetProps) => {
    setSelectedAsset(asset);
  }, []);

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
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        {/* <ContentTitle>Norigin Spatial Navigation</ContentTitle> */}
        <SelectedItemWrapper>
          <SelectedItemBox
            color={selectedAsset ? selectedAsset.color : "#565b6b"}
          >
            <DevButton method="scan">Scan</DevButton>
            <DevButton method="echo">Echo</DevButton>
          </SelectedItemBox>
          {/* <SelectedItemTitle>
            {selectedAsset
              ? selectedAsset.title
              : 'Press "Enter" to select an asset'}
          </SelectedItemTitle> */}
        </SelectedItemWrapper>
        <ScrollingRows ref={ref}>
          <div>
            {rows.map(({ title }) => (
              <ContentRow
                key={title}
                title={title}
                onAssetPress={onAssetPress}
                onFocus={onRowFocus}
              />
            ))}
          </div>
        </ScrollingRows>
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
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function App() {
  return (
    // <React.StrictMode>
    <AppContainer>
      <GlobalStyle />
      {/* <Menu focusKey="MENU" /> */}
      <Content />
    </AppContainer>
    // </React.StrictMode>
  );
}

// const root = ReactDOMClient.createRoot(document.querySelector("#root"));
// root.render(<App />);
