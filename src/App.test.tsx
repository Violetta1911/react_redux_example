import { act } from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

test("renders page with comments", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
    });

    const title = await screen.findByText("Comments App");
    expect(title).toBeInTheDocument();
});
