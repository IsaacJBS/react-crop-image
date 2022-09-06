import "./App.css";

import Filter from "./components/ModalFIlter/Filter";

export default function App() {
  return (
    <div className="App">
      <main className="main">
        <Filter buttonLabel="Adicionar filtro" />
      </main>
    </div>
  );
}
