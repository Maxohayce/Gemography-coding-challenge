// Module imports
import axios from "axios";
import { Component } from "react";
import Repo from "./Repo/repo";

/**
 * GithubRepos component
 * @component
 * @constructor
 *
 * @return {object} - The UI DOM object
 *
 * @example
 * return <GithubRepos />
 */
class GithubRepos extends Component {
  state = {
    info: {
      repos: [],
      incomplete_results: null,
      total_count: 0,
    },
    isLoaded: null,
    error: null,
    responseMessage: "",
  };

  fetchRepos = (url) =>
    axios
      .get(url)
      .then(({ data, statusText }) => {
        console.log(data);
        this.setState(({ info }) => ({
          info: {
            repos: [...info?.repos, ...data?.items],
            incomplete_results: data?.incomplete_results,
            total_count: data?.total_count,
          },
          isLoaded: true,
          error: false,
          responseMessage: statusText,
        }));
      })
      .catch(({ response }) =>
        this.setState({
          info: {
            repos: response?.data?.items,
            incomplete_results: response?.data?.incomplete_results,
            total_count: response?.data?.total_count,
          },
          isLoaded: false,
          error: true,
          responseMessage: response?.data?.message,
        })
      );

  componentDidMount = () =>
    this.fetchRepos(
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`
    );

  renderRepos = (isLoaded) =>
    isLoaded ? (
      <ul>
        {this.state.info?.repos.map((item, i) => (
          <Repo key={`repo-${i}`} {...item} />
        ))}
      </ul>
    ) : (
      <p>{this.state.responseMessage}</p>
    );

  render = () =>
    this.state.isLoaded === null ? (
      <p>Loading....</p>
    ) : (
      this.renderRepos(this.state.isLoaded)
    );
}

export default GithubRepos;
