import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import api from '../../services/api';
import { Form as FormStyle } from './styles';

const Form = ({ refreshList }) => {
  const [error, setError] = useState(false);
  const [input, setInput] = useState('luizkrlz/environment');
  const [loading, setLoading] = useState(false);

  const handleAddRepository = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: repository } = await api.get(`/repos/${input}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      const repositories = JSON.parse(localStorage.getItem('repositories') || []);

      localStorage.setItem('repositories', JSON.stringify([...repositories, repository]));

      refreshList();
    } catch (er) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormStyle withError={error} onSubmit={handleAddRepository}>
      <input
        type="text"
        placeholder="usuário/repositório"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
    </FormStyle>
  );
};

Form.propTypes = {
  refreshList: PropTypes.func.isRequired,
};

export default Form;
