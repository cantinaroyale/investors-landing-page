import ProviderError from "./components/ProviderError";
import { Main } from "./screens";
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <Main />
      <ProviderError />
    </div>
  );
}

export default App;
