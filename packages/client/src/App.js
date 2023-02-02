import logo from "./logo.svg";
import "./App.css";
import Tablar from "./common/components/ui/tablar/Tablar";
import { useBoolean } from "rhook-ts";
function App() {
  return (
    <div className="App">
      <Tablar />
    </div>
  );
}

export default App;
