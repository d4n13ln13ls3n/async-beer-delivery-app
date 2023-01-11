import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'react-bootstrap';
import { readStorage } from '../services/localStorageServices';
import { deleteData } from '../services/endPointRequest';
import '../styles/Admin.css';

export default function UsersTable({ usersList, getUsers }) {
  const deleteUser = async (userId) => {
    const token = readStorage('token');
    await deleteData(`/users/${userId}`, token);
    getUsers();
  };

  return (
    <Container>
      <h4>Lista de usuários</h4>
      <div className="shadow-sm p-3 mb-5 bg-body rounded border border-2">
        {usersList.length ? (
          <Table className="tableContainer">
            <thead>
              <tr>
                <th>Item</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Tipo</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(({ id, name, email, role }, index) => (
                <tr key={ id }>
                  <td
                    className="numberTable rounded-start"
                    data-testid={
                      `admin_manage__element-user-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    className="descriptionTable"
                    data-testid={ `admin_manage__element-user-table-name-${index}` }
                  >
                    {name}
                  </td>
                  <td
                    className="emailPerson"
                    data-testid={ `admin_manage__element-user-table-email-${index}` }
                  >
                    {email}
                  </td>
                  <td
                    className="typePerson"
                    data-testid={ `admin_manage__element-user-table-role-${index}` }
                  >
                    {role === 'customer' ? 'Cliente' : 'P. Vendedora'}
                  </td>
                  <td className="deletePerson rounded-end">
                    <button
                      className="btnDelete"
                      type="button"
                      onClick={ () => deleteUser(id) }
                      data-testid={ `admin_manage__element-user-table-remove-${index}` }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          'Nenhum usuário cadastrado!'
        )}
      </div>
    </Container>
  );
}

UsersTable.propTypes = {
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getUsers: PropTypes.func.isRequired,
};
