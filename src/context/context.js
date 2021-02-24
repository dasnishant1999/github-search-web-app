import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setgithubUser] = useState(mockUser);
  const [repos, setrepos] = useState(mockRepos);
  const [followers, setfollowers] = useState(mockFollowers);

  const [requests, setrequests] = useState(0);
  const [loading, setloading] = useState(false);

  const [error, seterror] = useState({ show: false, msg: "" });

  //todo: converting all above useState to useReducer

  const toggleError = ({ show = false, msg = "" }) => {
    seterror({ show, msg });
  };

  const searchGithubUser = async (user) => {
    toggleError(false, "");
    setloading(true);

    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((err) => console.log(err));

    if (response) {
      setgithubUser(response.data);
      const { login, followers_url } = response.data;

      Promise.allSettled([
        axios.get(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios.get(`${followers_url}`),
      ]).then((results) => {
        const [repos, followers] = results;
        const status = "fulfilled";
        if (repos.status === status) {
          setrepos(repos.value.data);
        }
        if (followers.status === status) {
          setfollowers(followers.value.data);
        }
      });
    } else {
      toggleError({ show: true, msg: "Sorry, no user found!" });
    }
    checkRequests();
    setloading(false);
  };

  const checkRequests = async () => {
    const { data } = await axios.get(`${rootUrl}/rate_limit`);
    let remaining = data.rate.remaining;
    setrequests(remaining);
    // console.log(data, remaining);
    if (remaining === 0) {
      toggleError({ show: true, msg: "Requests limit exceeded" });
    }
  };

  useEffect(() => {
    checkRequests();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser: githubUser,
        repos: repos,
        followers: followers,
        requests: requests,
        error: error,
        searchGithubUser: searchGithubUser,
        loading: loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
