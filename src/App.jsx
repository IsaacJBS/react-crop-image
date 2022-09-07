import "./App.css";

import Filter from "./components/ModalFIlter/Filter";

import nowLogo from "./assets/now-logo.png";

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <img
          className="header-logo"
          src={nowLogo}
          alt="Now escrito em branco, com a letra O colorida como a bandeira LGBTQIA+"
        />
      </header>
      <main className="main">
        <h2>Gere a sua foto de perfil com o NOW 🤘</h2>
        <div className="container-filter">
          <Filter buttonLabel="Clique aqui" />
          <p>para enviar sua foto</p>
        </div>
      </main>
      <section className="how-to-use">
        <h2>Como utilizar?</h2>
        <ul>
          <li>Envie sua foto com o botão acima.</li>
          <li>Salve a foto.</li>
          <li>Compartilhe como foto de perfil em suas redes sociais!</li>
        </ul>
      </section>
    </div>
  );
}
