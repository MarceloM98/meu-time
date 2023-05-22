import { Container, Table } from "./styles";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Select } from "../../components/Select";
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

  async function getTeam(teamId){
    const response = await api.get(`/squads?team=${teamId}`)
    const team = await response.data.response[0].players
    setTeam(team)
  }
  
  async function getTeamInfo(league, season, teamId) {
    const response = await api.get(`/teams/statistics?league=${league}&team=${teamId}&season=${season}`)
    const teamInfo = await response.data.response
    setInfoTeam(teamInfo)
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
          onChange={(e) => getTeamInfo(leagueId, season, e.target.value)}
        ></Select>
      </div>
      
    </Container>
  );
}
