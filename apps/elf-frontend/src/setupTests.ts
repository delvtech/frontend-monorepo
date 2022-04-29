// react-testing-library renders your components to document.body, this adds
// jest-dom's custom assertions, see:
// https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import efiLocalStorage from "base/localStorage";

beforeEach(() => {
  efiLocalStorage.clear();
});
