import React from 'react';
import { shallow } from 'enzyme';
import CompareList from './index';

const repositories = [
  {
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
  },
];

const anonFunction = jest.fn();

describe('CompareList component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <CompareList
        repositories={repositories}
        handleDelete={anonFunction}
        handleRefresh={anonFunction}
        load
      />,
    );
    expect(wrapper.find('CompareListItem')).toHaveLength(1);
  });
});
