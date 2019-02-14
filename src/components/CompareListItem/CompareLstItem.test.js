import React from 'react';
import { shallow } from 'enzyme';
import CompareListItem from './index';

const repository = {
  id: 1,
  owner: {
    avatar_url: 'http://localhost',
    login: 'teste',
  },
  name: 'Teste',
  load: false,
  stargazers_count: 1,
  forks_count: 1,
  open_issues_count: 1,
  lastCommit: '3 days ago',
};

const anonFunction = () => {};

describe('CompareListItem component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <CompareListItem
        repository={repository}
        handleDelete={anonFunction}
        handleRefresh={anonFunction}
      />,
    );

    expect(wrapper.find('header')).toHaveLength(1);
  });
});
