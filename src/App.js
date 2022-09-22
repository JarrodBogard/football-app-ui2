import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import AppContextProvider from "./contexts/AppContext";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Navigation />
        <Router />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
