import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import CompareListItem from '../CompareListItem';

const CompareList = ({
  repositories, handleDelete, handleRefresh, load,
}) => (
  <Container>
    {repositories.map(repository => (
      <CompareListItem
        handleDelete={handleDelete}
        handleRefresh={handleRefresh}
        load={load}
        key={repository.id}
        repository={repository}
      />
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
  load: PropTypes.bool.isRequired,
};

export default CompareList;
