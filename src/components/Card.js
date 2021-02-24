import React, { useContext } from "react";
import { GithubContext } from "../context/context";
import styled from "styled-components";
import { MdBusiness, MdLocationOn, MdLink } from "react-icons/md";
const Card = () => {
  const { githubUser } = useContext(GithubContext);
  const {
    avatar_url,
    html_url,
    name,
    login,
    company,
    blog,
    bio,
    location,
  } = githubUser;

  return (
    <section className="section">
      <Wrapper>
        <header>
          <img src={avatar_url} alt={name} />
          <div>
            <h4>{name}</h4>
            <p>{login}</p>
          </div>
          <a href={html_url}>Follow</a>
        </header>
        <p className="bio">{bio}</p>
        <div className="links">
          <p>
            <MdBusiness></MdBusiness>
            {company}
          </p>
          <p>
            <MdLocationOn></MdLocationOn>
            {location}
          </p>
          <a href={`https://${blog}`}>
            <MdLink></MdLink>
            {blog}
          </a>
        </div>
      </Wrapper>
    </section>
  );
};
const Wrapper = styled.article`
  background: var(--clr-top);
  padding: 1.5rem 2rem;
  border-radius: var(--radius);
  position: relative;
  // &::before {
  //   content: "user";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   transform: translateY(-100%);
  //   background: var(--clr-top);
  //   color: var(--clr-grey-5);
  //   border-top-right-radius: var(--radius);
  //   border-top-left-radius: var(--radius);
  //   text-transform: capitalize;
  //   padding: 0.5rem 1rem 0 1rem;
  //   letter-spacing: var(--spacing);
  //   font-size: 1rem;
  // }
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-top);
      }
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .links {
    p,
    a {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
`;
export default Card;
