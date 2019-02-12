import React, { Component } from 'react';
import moment from 'moment';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    loadingPull: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    const { repositories } = this.state;

    let localRepositories = localStorage.getItem('repositories');

    localRepositories = JSON.parse(localRepositories);

    if (localRepositories) {
      this.setState({ repositories: [...repositories, ...localRepositories] });
    }
  }

  handleAddRepository = async (e) => {
    e.preventDefault();
    const { repositories, repositoryInput } = this.state;
    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      localStorage.setItem('repositories', JSON.stringify([...repositories, repository]));

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = (e) => {
    const { repositories } = this.state;

    e.preventDefault();
    const { value } = e.target;
    const newRepositories = repositories.filter(
      item => parseInt(item.id, 10) !== parseInt(value, 10),
    );
    this.setState({ repositories: [...newRepositories] });
    localStorage.setItem('repositories', JSON.stringify(newRepositories));
  };

  handlePull = async (e) => {
    e.preventDefault();
    const { repositories } = this.state;
    const { value } = e.target;

    this.setState({ loadingPull: true });

    const find = repositories.filter(item => parseInt(item.id, 10) === parseInt(value, 10))[0];

    if (!find) {
      this.setState({ loadingPull: false });
      return;
    }

    try {
      const { data: repository } = await api.get(`/repos/${find.full_name}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const newRepositories = repositories.filter(
        item => parseInt(item.id, 10) !== parseInt(value, 10),
      );

      localStorage.setItem('repositories', JSON.stringify([...newRepositories, repository]));

      this.setState({
        repositories: [...newRepositories, repository],
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loadingPull: false });
    }
  };

  render() {
    const {
      loadingPull, loading, repositoryError, repositories, repositoryInput,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
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
