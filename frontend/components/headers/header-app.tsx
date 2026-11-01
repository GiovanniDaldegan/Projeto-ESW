import { redirect, RedirectType } from 'next/navigation';

export default function HeaderApp() {
  return (
    <div className="header-app">
      <p className="title-app">Compreendendo o Ponto</p>

      <div id="button-group-profile">
        <button id="button-profile">Perfil</button>
        <button
          id="button-logoff"
          onClick={() => {
            localStorage.removeItem("usuario");
            localStorage.removeItem("projeto");
            redirect("/", RedirectType.replace);
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
