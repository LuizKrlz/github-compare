import React, { Component } from 'react';
import moment from 'moment';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import { Container } from './styles';

import CompareList from '../../components/CompareList';
import Form from '../../components/Form';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const repositories = JSON.parse(localStorage.getItem('repositories') || []);

    this.setState({ repositories });
  };

  handleDelete = (id) => {
    const { repositories } = this.state;

    const newRepositories = repositories.filter(item => item.id !== id);
    localStorage.setItem('repositories', JSON.stringify(newRepositories));
    this.getList();
  };

  handlePull = async (e) => {
    e.preventDefault();
    const { repositories, loadingPull } = this.state;
    const { value } = e.target;

    if (loadingPull) return;

    let index = null;
    this.setState({ loadingPull: true });
    let find = repositories.filter(item => parseInt(item.id, 10) === parseInt(value, 10))[0];
    index = repositories.findIndex(item => parseInt(item.id, 10) === parseInt(value, 10));

    if (!find) {
      this.setState({ loadingPull: false });
      return;
    }

    try {
      const repository = await this.search(find.full_name);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      repositories[index] = repository;

      localStorage.setItem('repositories', JSON.stringify([...repositories]));

      this.setState({
        repositories: [...repositories],
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loadingPull: false });
      find = null;
    }
  };

  render() {
    const {
      loadingPull, loading, repositoryError, repositories, repositoryInput,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form refreshList={() => this.getList()} />
        <CompareList
          loading={loadingPull}
          handleRefresh={this.handlePull}
          handleDelete={this.handleDelete}
          repositories={repositories}
        />
      </Container>
    );
  }
}
