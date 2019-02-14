import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
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

  it('should render all items for header', () => {
    const wrapper = shallow(
      <CompareListItem
        repository={repository}
        handleDelete={anonFunction}
        handleRefresh={anonFunction}
      />,
    );

    expect(
      wrapper
        .find('header')
        .shallow()
        .find('img'),
    ).toHaveLength(1);
    expect(
      wrapper
        .find('header')
        .shallow()
        .find('strong'),
    ).toHaveLength(1);
    expect(
      wrapper
        .find('header')
        .shallow()
        .find('small'),
    ).toHaveLength(1);
    expect(
      wrapper
        .find('header')
        .shallow()
        .find('button'),
    ).toHaveLength(1);
  });

  it('should render ul and lis', () => {
    const wrapper = shallow(
      <CompareListItem
        repository={repository}
        handleDelete={anonFunction}
        handleRefresh={anonFunction}
      />,
    );

    expect(wrapper.find('ul')).toHaveLength(1);
    expect(
      wrapper
        .find('ul')
        .shallow()
        .find('li'),
    ).toHaveLength(4);
  });
});
