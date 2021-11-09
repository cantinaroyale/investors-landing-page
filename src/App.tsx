import NetworkHandler from "./components/NetworkHandler";
import ProviderError from "./components/ProviderError";
import { Main } from "./screens";
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <Main />
      <ProviderError />
      <NetworkHandler />
    </div>
  );
}

export default App;
