import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { GithubContext } from "../context/context";

const Search = () => {
  const { requests, error, searchGithubUser, loading } = useContext(
    GithubContext
  );
  const [user, setuser] = useState("");

  const handleChange = (e) => {
    setuser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      searchGithubUser(user);
      // setuser('');
    }
  };

  return (
    <section className="section">
      <Wrapper className="section-center">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <MdSearch style={{ "margin-left": "0.8rem" }}></MdSearch>
            <input
              value={user}
              type="text"
              placeholder="Enter Gitub User"
              onChange={handleChange}
            />
            {requests > 0 && !loading && (
              <button className="btn">Search</button>
            )}
          </div>
        </form>
        <h3>Requests : {requests}/60</h3>
        {/* <h2>as</h2> */}
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }

  .form-control {
    background: var(--clr-search-background);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 2rem;
    padding: 0.5rem;
    input {
      background: var(--clr-search-background);
      border-color: transparent;
      outline-color: var(--clr-background);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    input:focus {
      outline: none;
    }
    button {
      border-radius: --radius;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-top);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;
const ErrorWrapper = styled.article`
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 90vw;
  // transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
