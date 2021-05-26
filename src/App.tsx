import React, { useEffect, useState } from "react";
import "./App.css";

import { api } from "./services/api";

import * as luxon from "luxon";

import { SVGSidebar } from "./component/SVGSideBar";
import { Loading } from "./component/Loading";

import Logo from "./assets/logo.png";

import { Contests } from "./types/contests";
import { ObjectColor } from "./types/objectColor";
import { Lotteries } from "./types/lotteries";

function App() {
  const [selectedCompetition, setSelectedCompetition] = useState({
    fill: "#6befa3",
    contestsId: "2359",
    name: "mega-sena",
  });
  const [contests, setContests] = useState<Contests | null | undefined>(null);
  const [lotteries, setLotteries] = useState<Lotteries[]>([]);
  const [isLoading, setLoading] = useState(true);
  const objectColorChange: Array<ObjectColor> = [
    {
      "0": {
        contestsId: "2359",
        fill: "#6befa3",
        name: "mega-sena",
      },
      "1": {
        contestsId: "5534",
        fill: "#8666ef",
        name: "quina",
      },
      "2": {
        contestsId: "2200",
        fill: "#dd7ac6",
        name: "lotofácil",
      },
      "3": {
        contestsId: "2167",
        fill: "#ffab64",
        name: "lotomania",
      },
      "4": {
        contestsId: "1622",
        fill: "#5aad7d",
        name: "timemania",
      },
      "5": {
        contestsId: "440",
        fill: "#bfaf83",
        name: "dia de sorte",
      },
    },
  ];

  useEffect(() => {
    api
      .get(`/loterias`)
      .then((response) => {
        setLotteries(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api
      .get(`/concursos/${selectedCompetition.contestsId}`)
      .then((response) => {
        setContests(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [selectedCompetition.contestsId]);

  function handlerChangeSelectedCompetition(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = event.target;
    objectColorChange.forEach((object) => {
      setSelectedCompetition(object[value]);
    });
    setContests(null);
    setLoading(true);
    console.log(selectedCompetition);
  }

  return (
    <div className="container">
      <div className="header">
        <SVGSidebar fill={selectedCompetition.fill} height="100vh" />

        <section className="header-menu">
          <select id="competition" onChange={handlerChangeSelectedCompetition}>
            {lotteries.map((lotteries) => (
              <option key={lotteries.id} value={lotteries.id}>
                {isLoading && "Carregando...."}
                {!isLoading && lotteries.nome.toUpperCase()}
              </option>
            ))}
          </select>

          <div className="box">
            <section className="box-title">
              <img src={Logo} alt="Logo MEGASENA" />
              <span>
                {isLoading && "carregando...."}
                {!isLoading && selectedCompetition.name.toUpperCase()}
              </span>
            </section>

            <section className="box-subtitle">
              <p>CONCURSO</p>
              <span>
                {contests?.id} - {isLoading && "carregando...."}
                {!isLoading &&
                  luxon.DateTime.fromISO(
                    contests?.data ? contests.data : ""
                  ).toFormat("dd/MM/yyyy")}
              </span>
            </section>
          </div>
        </section>
      </div>

      <div className="balls" data-testid="balls">
        {!!isLoading && <Loading background={selectedCompetition.fill} />}
        {contests?.numeros.map((contestNumber) => (
          <div key={contestNumber} className="ball">
            {contestNumber}
          </div>
        ))}

        <div className="footer">
          <div>
            <p>
              Este sorteio é meramente ilustrativo e não possui nenhuma ligação
              com a CAIXA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
