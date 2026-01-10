/* HOOK PARA CRUD DE API */
import { useState } from 'react';
import fetchData from '@api/fetchConfig';
import axios from '@api/axiosConfig';
import cleanData from '@utils/cleanData';

const useCrudApi = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // READ (TODOS o UNO)
  const read = async (id = null) => {
    setMessage(null);

    try {
      const url = id ? `${baseUrl}/${id}` : baseUrl;
      return await fetchData(url);
    } catch (err) {
      setMessage(err.message || 'Error al obtener datos');
      throw err;
    }
  };

  // CREATE
  const create = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      const payload = cleanData(data);
      const res = await axios.post(baseUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage(res.data?.message || null);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al crear';
      setMessage(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const update = async (id, data) => {
    setLoading(true);
    setMessage(null);

    try {
      const payload = cleanData(data);
      const res = await axios.put(`${baseUrl}/${id}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage(res.data?.message || null);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al actualizar';
      setMessage(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const remove = async (id) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.delete(`${baseUrl}/${id}`);
      setMessage(res.data?.message || null);
      return res.data;
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error al eliminar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    // estado
    loading,
    message,

    // acciones
    read,
    create,
    update,
    remove,
  };
};

export default useCrudApi;