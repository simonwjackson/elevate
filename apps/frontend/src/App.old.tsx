import { useEffect } from "react";
import "./App.css";

import {
  init,
  setKeyMap,
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";

init({
  debug: true,
  // visualDebug: true,
});

// setKeyMap({
//   left: [205, 214],
//   up: [203, 211],
//   right: [206, 213],
//   down: [204, 212],
//   enter: [195],
// });

setKeyMap({
  left: 37, // or 'ArrowLeft'
  up: 38, // or 'ArrowUp'
  right: 39, // or 'ArrowRight'
  down: 40, // or 'ArrowDown'
  enter: 13, // or 'Enter'
});

function Button() {
  const { ref, focused } = useFocusable();

  return (
    <div
      ref={ref}
      style={{
        outline: focused ? "10px solid white" : "",
      }}
    >
      Press me
    </div>
  );
}

function ContentList() {
  const { ref, focusKey, focusSelf } = useFocusable();

  // Focusing self will focus the Popup, which will pass the focus down to the first Child (ButtonPrimary)
  // Alternatively you can manually focus any other component by its 'focusKey'
  useEffect(() => {
    focusSelf();
    // setFocus("BUTTON_PRIMARY");
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        <Button focusKey={"BUTTON_PRIMARY"} />
        <Button focusKey={"BUTTON_PRIMARY_2"} />
        <Button focusKey={"BUTTON_PRIMARY_3"} />
      </div>
    </FocusContext.Provider>
  );
}

function App() {
  return <ContentList />;
}

export default App;
