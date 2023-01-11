import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import InputRegisterByAdmin from '../components/InputRegisterByAdmin';
import UsersTable from '../components/UsersTable';
import { getData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorageServices';
import '../styles/Admin.css';

export default function AdminPage() {
  const [usersList, setUsersList] = useState([]);

  const getUsers = async () => {
    const token = readStorage('token');

    const users = await getData('/users', token);
    setUsersList(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <InputRegisterByAdmin getUsers={ getUsers } />
      <UsersTable usersList={ usersList } getUsers={ getUsers } />
    </div>
  );
}
