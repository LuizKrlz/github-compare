import React, { Component } from 'react';
import moment from 'moment';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import { Container } from './styles';

import CompareList from '../../components/CompareList';
import Form from '../../components/Form';

export default class Main extends Component {
  state = {
    load: false,
    repositories: [],
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const data = localStorage.getItem('repositories');

    const repositories = data ? JSON.parse(data) : [];

    this.setState({ repositories });
  };

  handleDelete = (id) => {
    const { repositories } = this.state;

    const newRepositories = repositories.filter(item => item.id !== id);
    localStorage.setItem('repositories', JSON.stringify(newRepositories));
    this.getList();
  };

  handlePull = async (repository) => {
    const { repositories } = this.state;

    this.setState({
      repositories: repositories.map(item => ({
        ...item,
        load: item.id === repository.id,
      })),
    });

    try {
      const { data: newRepository } = await api.get(`/repos/${repository.full_name}`);
      newRepository.lastCommit = moment(newRepository.pushed_at).fromNow();

      const find = repositories.filter(item => item.id !== repository.id);
      localStorage.setItem('repositories', JSON.stringify([...find, newRepository]));

      this.setState({
        repositories: [...find, newRepository],
      });
    } catch (error) {
      console.log(error);
      this.setState({ load: false });
    } finally {
      console.log('foi');
      this.setState({ load: false });
    }
  };

  render() {
    const { loadingPull, repositories, load } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form refreshList={() => this.getList()} />
        <CompareList
          loading={loadingPull}
          handleRefresh={this.handlePull}
          handleDelete={this.handleDelete}
          repositories={repositories}
          load={load}
        />
      </Container>
    );
  }
}
