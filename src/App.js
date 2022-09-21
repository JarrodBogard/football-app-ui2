import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./contexts/AppContext";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
