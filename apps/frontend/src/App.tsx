/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React, { useCallback, useEffect, useState, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
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

init({
  debug: false,
  visualDebug: false,
});

const host = "reactNative";

const sendMessage = (msg: any) => {
  const str = JSON.stringify(msg);

  if (host === "reactNative") {
    // @ts-ignore
    window.ReactNativeWebView.postMessage(str);
  }
};

const rows = shuffle([
  {
    title: "Recent",
  },
]);

const assets = [
  {
    title: "moonlight",
    media: {
      wide: "https://cdn2.steamgriddb.com/thumb/8a8f67cacf3e3d2d63614f515a2079b8.jpg",
    },
  },
  {
    title: "tetris",
    id: "😊🎉🍎🚀🌈",
    media: {
      wide: "https://cdn2.steamgriddb.com/thumb/27c9b75bf3a30d742ab67f61da2c5706.jpg",
      tall: "https://cdn2.steamgriddb.com/thumb/da2f5c70767a018829cb65f26d72fb8b.jpg",
      square:
        "https://cdn2.steamgriddb.com/thumb/036036d598e3d81b103ce8b3c6786dfb.jpg",
    },
  },
  {
    title: "warioLand4",
    id: "🐶🌻🍕🎈🌙",
    media: {
      wide: "https://cdn2.steamgriddb.com/thumb/7921d5adb66fcddedfb157f74030bb24.jpg",
    },
  },
  {
    title: "deadCells",
    media: {
      wide: "https://cdn.cloudflare.steamstatic.com/steam/apps/588650/header.jpg?t=1678188017",
    },
  },
  {
    title: "dungreed",
    media: {
      wide: "https://cdn.cloudflare.steamstatic.com/steam/apps/753420/header.jpg?t=1653456557",
      tall: "https://cdn2.steamgriddb.com/thumb/89aa482117c71b16333fa548ee5f0b86.jpg",
      square: null,
    },
  },
  {
    title: "scourgeBringer",
    media: {
      wide: "https://cdn.cloudflare.steamstatic.com/steam/apps/1037020/header.jpg?t=1687186493",
      wallpaper:
        "https://xxboxnews.blob.core.windows.net/prod/sites/2/2020/02/scourgebringer_keyart.jpg",
    },
  },
];

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
  onAssetPress,
  onFocus,
}: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus,
  });

  const scrollingRef = useRef(null);

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
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
            {assets.map(({ media, title, id, color }) => (
              <Asset
                media={media}
                key={title}
                title={title}
                color={color}
                onEnterPress={() =>
                  // onAssetPress()
                  sendMessage({
                    type: "launch",
                    payload: {
                      id,
                    },
                  })
                }
                onFocus={onAssetFocus}
              />
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
          />
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
    <React.StrictMode>
      <AppContainer>
        <GlobalStyle />
        {/* <Menu focusKey="MENU" /> */}
        <Content />
      </AppContainer>
    </React.StrictMode>
  );
}

// const root = ReactDOMClient.createRoot(document.querySelector("#root"));
// root.render(<App />);
