import "./App.css";
import CardList from "./CardList";
import { cardListMock } from "./Data";

function App() {
  return (
    <div className="App">
      <CardList cards={cardListMock} />
    </div>
  );
}

export default App;
