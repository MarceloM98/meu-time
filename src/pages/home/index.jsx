import { useState, useEffect } from "react";

import { Container } from "./styles";
import { Header } from "../../components/Header";
import { Select } from "../../components/Select";
import { Card } from "../../components/Card";
import { Table } from "../../components/Table";

import Chart from "chart.js/auto";

import { api } from "../../services/api";

export function Home() {
  const [countryList, setCountryList] = useState();
  const [leagueList, setLeagueList] = useState();
  const [seasonList, setSeasonList] = useState();
  const [teamsList, setTeamList] = useState();
  const [team, setTeam] = useState();
  const [infoTeam, setInfoTeam] = useState();
  const [lineup, setLineup] = useState();

  const [leagueId, setLeagueId] = useState();
  const [season, setSeason] = useState();

  const [disabledLiga, setDisabledLiga] = useState(true);
  const [disabledTemporada, setDisabledTemporada] = useState(true);
  const [disabledTime, setDisabledTime] = useState(true);
  const [chart, setChart] = useState();

  async function getCountries() {
    const localCountries = localStorage.getItem("@meuTime:countries");
    if (!localCountries) {
      try {
        const response = await api.get("/countries");

        const countries = await response.data.response;
        localStorage.setItem("@meuTime:countries", JSON.stringify(countries));

        return setCountryList(countries);
      } catch {
        alert("ocorreu um erro na requisição!");
      }
    }

    setCountryList(JSON.parse(localCountries));
  }

  async function getLeagues(country) {
    if (leagueList) {
      setDisabledLiga(true);
      setDisabledTemporada(true);
      setDisabledTime(true);
    }
    try {
      const leagueList = [];
      const response = await api.get(`/leagues?country=${country}`);
      const responseBody = await response.data.response;
      responseBody.forEach((league) => {
        const obj = {
          id: league.league.id,
          name: league.league.name,
        };
        leagueList.push(obj);
      });
      setLeagueList(leagueList);
      setDisabledLiga(false);
    } catch {
      alert("ocorreu um erro na requisição!");
    }
  }

  async function getSeasons(league) {
    try {
      const seasons = [];
      const response = await api.get(`/leagues?id=${league}`);
      const responseBody = await response.data.response[0].seasons;
      responseBody.forEach((season) => {
        const obj = {
          name: season.year,
        };
        seasons.push(obj);
      });
      setLeagueId(league);
      setSeasonList(seasons);
      setDisabledTemporada(false);
    } catch {
      alert("ocorreu um erro na requisição!");
    }
  }

  async function getTeams(league, season) {
    try {
      const teams = [];
      const response = await api.get(
        `/teams?league=${league}&season=${season}`
      );
      const responseBody = await response.data.response;
      responseBody.forEach((team) => {
        const obj = {
          id: team.team.id,
          name: team.team.name,
        };
        teams.push(obj);
      });
      setTeamList(teams);
      setSeason(season);
      setDisabledTime(false);
    } catch {
      alert("ocorreu um erro na requisição!");
    }
  }

  async function getTeam(teamId, season) {
    try {
      const team = [];
      const response = await api.get(
        `/players?season=${season}&team=${teamId}`
      );
      const responseTeam = await response.data.response;
      responseTeam.forEach((playerInfo) => {
        const { player } = playerInfo;
        team.push(player);
      });
      setTeam(team);
    } catch {
      alert("ocorreu um erro na requisição!");
    }
  }

  async function getTeamInfo(league, season, teamId) {
    try {
      const response = await api.get(
        `/teams/statistics?league=${league}&team=${teamId}&season=${season}`
      );
      const teamInfo = await response.data.response;
      setInfoTeam(teamInfo);
      setLineup(teamInfo.lineups[0]);
      const { labels, goals } = dataHandler(teamInfo.goals.for.minute);
      plotChart(labels, goals);
      document.querySelector(".hidden")?.classList.remove("hidden");
    } catch {
      alert("ocorreu um erro na requisição!");
    }
  }

  function dataHandler(data) {
    const labels = [];
    const goals = [];
    for (const [key, value] of Object.entries(data)) {
      labels.push(key);
      goals.push(value.total);
    }
    return { labels, goals };
  }

  async function plotChart(labels, data) {
    if (chart) {
      chart.destroy();
    }
    setChart(
      new Chart(document.getElementById("acquisitions"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Gols por minuto",
              data: data,
              backgroundColor: "#ff9100c7",
              borderColor: "#000",
              border: "2px",
            },
          ],
        },
        options: {
          plugins: {
            customCanvasBackgroundColor: {
              color: "#3E3B47",
            },
          },
        },
        plugins: [plugin],
      })
    );
  }

  const plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  useEffect(() => {
    async function asyncFunction() {
      await getCountries();
    }
    asyncFunction();
  }, []);

  return (
    <Container>
      <Header />
      <div id="filtro">
        <Select
          title={"País"}
          disabled={false}
          info={countryList}
          onChange={(e) => getLeagues(e.target.value)}
        ></Select>
        <Select
          title={"Liga"}
          disabled={disabledLiga}
          info={leagueList}
          onChange={(e) => getSeasons(e.target.value)}
        ></Select>
        <Select
          title={"Temporada"}
          disabled={disabledTemporada}
          info={seasonList}
          onChange={(e) => getTeams(leagueId, e.target.value)}
        ></Select>
        <Select
          title={"Time"}
          disabled={disabledTime}
          info={teamsList}
          onChange={(e) => {
            getTeamInfo(leagueId, season, e.target.value);
            getTeam(e.target.value, season);
          }}
        ></Select>
      </div>

      <main>
        {team ? (
          <div className="team-wrapper">
            <h1>Escalação</h1>
            <div className="team-card-wrapper">
              {team.map((player, index) => {
                return (
                  <div key={index}>
                    <Card
                      photo={player.photo}
                      name={player.name}
                      age={player.age}
                      nationality={player.nationality}
                    ></Card>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div id="layout-default">
            <h1>Escolha um time</h1>
            <h2 id="sub-title-default">
              Escalação e estatísticas de todos os times!
            </h2>
          </div>
        )}
        {infoTeam ? (
          <>
            <div id="title-Estatisticas">
              <h1>Estatísticas</h1>
            </div>
            {lineup?.formation ? (
              <div id="info-card">
                <h2>A formação mais utilizada em {season} foi:</h2>
                <h3>{lineup.formation}</h3>
                <p>usada em: {lineup.played} jogos</p>
              </div>
            ) : null}
            <div className="table-wrapper">
              <Table info={infoTeam.fixtures} />
            </div>
          </>
        ) : null}
        <div className="canvas-div hidden">
          <canvas id="acquisitions"></canvas>
        </div>
      </main>
    </Container>
  );
}
