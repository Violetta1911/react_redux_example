import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <ErrorBoundary fallback={<div>"Ooops..."</div>}>
                <App />
            </ErrorBoundary>
        </PersistGate>
    </Provider>,
);
reportWebVitals();
