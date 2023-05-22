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

  const [leagueId, setLeagueId] = useState();
  const [season, setSeason] = useState();

  const [disabledLiga, setDisabledLiga] = useState(true);
  const [disabledTemporada, setDisabledTemporada] = useState(true);
  const [disabledTime, setDisabledTime] = useState(true);

  async function getCountries() {
    const localCountries = localStorage.getItem("@meuTime:countries");
    if (!localCountries) {
      const response = await api.get("/countries");

      const countries = await response.data.response;
      localStorage.setItem("@meuTime:countries", JSON.stringify(countries));

      return setCountryList(countries);
    }

    setCountryList(JSON.parse(localCountries));
  }

  async function getLeagues(country) {
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
  }

  async function getSeasons(league) {
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
  }

  async function getTeams(league, season) {
    const teams = [];
    const response = await api.get(`/teams?league=${league}&season=${season}`);
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
  }

  async function getTeam(teamId, season) {
    const team = [];
    const response = await api.get(`/players?season=${season}&team=${teamId}`);
    const responseTeam = await response.data.response;
    responseTeam.forEach((playerInfo) => {
      const { player } = playerInfo;
      team.push(player);
    });
    console.log(team);
    setTeam(team);
  }

  async function getTeamInfo(league, season, teamId) {
    const response = await api.get(
      `/teams/statistics?league=${league}&team=${teamId}&season=${season}`
    );
    const teamInfo = await response.data.response;
    setInfoTeam(teamInfo);
    setLineup(teamInfo.lineups[0]);
    const { labels, goals } = dataHandler(teamInfo.goals.for.minute);
    plotChart(labels, goals);
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
    new Chart(document.getElementById("acquisitions"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Gols por minuto",
            data: data,
          },
        ],
      },
    });
  }


  useEffect(() => {
    async function teste() {
      await getCountries();
    }
    teste();
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
            <div id="info-card">
              <h2>A formação mais utilizada em {season} foi:</h2>
              <h3>{lineup.formation}</h3>
              <p>usada em: {lineup.played} jogos</p>
            </div>
            <div className="table-wrapper">
              <Table info={infoTeam.fixtures} />
            </div>
            <div>
              <canvas id="acquisitions"></canvas>
            </div>
          </>
        ) : null}
      </main>
    </Container>
  );
}
