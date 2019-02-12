import React from 'react';

import { Container, Repository } from './styles';

const CompareList = () => (
  <Container>
    <Repository>
      <header>
        <img src="https://avatars3.githubusercontent.com/u/69631?v=4" alt="Facebook" />
        <strong>React</strong>
        <small>facebook</small>
      </header>
      <ul>
        <li>
          95,0190
          <small> stars</small>
        </li>
        <li>
          95,0190
          <small> forks</small>
        </li>
        <li>
          95,0190
          <small> issues</small>
        </li>
        <li>
          3 days ago
          <small> las commit</small>
        </li>
      </ul>
    </Repository>
  </Container>
);

export default CompareList;