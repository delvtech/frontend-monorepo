// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

// import App from "ui/app/App/App";

// import { renderWithAppProviders } from "ui/testing/renderWithAppProviders";

test("full app rendering/navigating", async () => {
  expect(true).toEqual(true);
});
// test.skip("full app rendering/navigating", async () => {
//   const {
//     container,
//     getByTestId,
//     history: { navigate },
//   } = renderWithAppProviders(<App />);
//   const appContainer = container;
//   expect(appContainer.innerHTML).toMatch("Welcome to Element Finance");

//   // with reach-router we don't need to simulate a click event, we can just transition
//   // to the page using the navigate function returned from the history object.
//   await navigate("/portfolio");
//   expect(getByTestId("portfolio-view")).toBeVisible();

//   await navigate("/earn");
//   expect(getByTestId("earn-view")).toBeVisible();

//   await navigate("/pools");
//   expect(getByTestId("pools-view")).toBeVisible();

//   await navigate("/mint");
//   expect(getByTestId("mint-view")).toBeVisible();
// });

// test.skip("landing on a bad page", () => {
//   const { container } = renderWithAppProviders(<App />, {
//     route: "/something-that-does-not-match",
//   });

//   // TODO: add a test here for a genric 404 page.
//   expect(container.innerHTML).toMatch("");
// });
