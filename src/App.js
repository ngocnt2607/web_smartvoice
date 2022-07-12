import "./App.css";

import Router from "./routes/Router";
import { BaseProvider } from "./context/baseContext";

function App() {
  return (
    <BaseProvider>
      <Router />
    </BaseProvider>
  );
}

export default App;
