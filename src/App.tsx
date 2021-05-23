import React, { useEffect, useState } from "react";
import "./App.css";

import { api } from "./services/api";

import * as luxon from "luxon";

import { SVGSidebar } from "./component/SVGSideBar";
import { Loading } from "./component/Loading";

import Logo from "./assets/logo.png";

import { Contests } from "./types/contests";
import { ObjectColor } from "./types/objectColor";

function App() {
  const [selectedCompetition, setSelectedCompetition] = useState({
    fill: "#6befa3",
    contestsId: "2359",
  });
  const [contests, setContests] = useState<Contests | null | undefined>(null);
  const [isLoading, setLoading] = useState(true);
  const objectColorChange: Array<ObjectColor> = [
    {
      "2359": {
        contestsId: "2359",
        fill: "#6befa3",
      },
      "5534": {
        contestsId: "5534",
        fill: "#8666ef",
      },
      "2200": {
        contestsId: "2200",
        fill: "#dd7ac6",
      },
      "2167": {
        contestsId: "2167",
        fill: "#ffab64",
      },
      "1622": {
        contestsId: "1622",
        fill: "#5aad7d",
      },
      "440": {
        contestsId: "440",
        fill: "#bfaf83",
      },
    },
  ];

  useEffect(() => {}, [contests]);

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
  }

  return (
    <div className="container">
      <div className="header">
        <SVGSidebar fill={selectedCompetition.fill} height="100vh" />

        <section className="header-menu">
          <select id="competition" onChange={handlerChangeSelectedCompetition}>
            <option value="2359">MEGA-SENA</option>
            <option value="5534">QUINA</option>
            <option value="2200">LOTOFACIL</option>
            <option value="2167">LOTOMANIA</option>
            <option value="1622">TIMEMANIA</option>
            <option value="440">DIA DE SORTE</option>
          </select>

          <div className="box">
            <section className="box-title">
              <img src={Logo} alt="Logo megasena" />
              <span>MEGA-SENA</span>
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
