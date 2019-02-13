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

  search = async (searh) => {
    const { data: repository } = await api.get(`/repos/${searh}`);
    return repository;
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    const { repositories, repositoryInput } = this.state;
    this.setState({ loading: true });

    try {
      const repository = await this.search(repositoryInput);

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
