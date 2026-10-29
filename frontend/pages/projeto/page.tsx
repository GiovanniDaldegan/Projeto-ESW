import HeaderApp from "@/components/headers/header-app";
import HeaderProject from "@/components/headers/header-project";
import PanelSprint from "@/components/projeto/backlog/panel-backlog";
import PanelEpic from "@/components/projeto/epic/panel-epic";
import Head from "next/head";

// TODO: instanciação de modais on click

export default function Page() {
  return (
    <html>
      {projectHead()}

      <body>
        <header>
          {HeaderApp()}

          {/* TODO: instanciar com nome de projeto */}
          {HeaderProject({ projectName: "PLACEHOLDER" })}
        </header>

        {PanelEpic({ epicList: [] })}

        {PanelSprint({ backlogList: [] })}
      </body>
    </html>
  );
}

function projectHead() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      <title>Projeto #1</title>
      <meta name="description" content="Gerencimento do projeto" />
    </Head>
  );
}
