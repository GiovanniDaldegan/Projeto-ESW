"use client";

import HeaderApp from "@/components/headers/header-app";
import HeaderProject from "@/components/headers/header-project";
import PanelSprint from "@/components/projeto/backlog/panel-backlog";
import PanelEpic from "@/components/projeto/epic/panel-epic";

// TODO: instanciação de modais on click

export default function Page() {
  return (
    <div>
      <header className="header-page">
        {HeaderApp()}

        {/* TODO: instanciar com nome de projeto */}
        {HeaderProject({
          projectId: 0,
          projectName: "PLACEHOLDER",
          projectDescription: "Descrição placeholder muito top.",
        })}
      </header>

      {PanelEpic({ epicList: [] })}

      {PanelSprint({ backlogList: [] })}
    </div>
  );
}
