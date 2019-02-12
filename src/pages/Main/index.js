import React, { Component } from 'react';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    const { repositories, repositoryInput } = this.state;

    try {
      const response = await api.get(`/repos/${repositoryInput}`);
      this.setState({
        repositoryInput: '',
        repositories: [...repositories, response.data],
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { repositories, repositoryInput } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Ok</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
