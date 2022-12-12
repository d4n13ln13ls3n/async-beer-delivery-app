import React from 'react';
import PropTypes from 'prop-types';

export default function UsersTable({ usersList }) {
  return (
    <div>
      <h4>Lista de usuários</h4>
      <table>
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
          {usersList.length
            && usersList.map(({ id, name, email, role }, index) => (
              <tr key={ id }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  {name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  {email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  {role === 'customer' ? 'Cliente' : 'P.Vendedora'}
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

UsersTable.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  })).isRequired,
};
