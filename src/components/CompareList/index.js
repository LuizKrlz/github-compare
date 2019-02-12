import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({
  repositories, handleDelete, handleRefresh, loading,
}) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
          <button type="button" value={repository.id} onClick={handleRefresh}>
            {loading ? <i className="fa fa-refresh fa-pulse" /> : <i className="fa fa-refresh" />}
          </button>
        </header>
        <ul>
          <li>
            {repository.stargazers_count}
            <small> stars</small>
          </li>
          <li>
            {repository.forks_count}
            <small> forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            <small> issues</small>
          </li>
          <li>
            {repository.lastCommit}
            <small> las commit</small>
          </li>
        </ul>
        <button type="button" value={repository.id} onClick={handleDelete}>
          <i className="fa fa-trash" />
        </button>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};
export default CompareList;
