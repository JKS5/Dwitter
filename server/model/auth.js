// abcd1234:$2b$12$gv6vAwUcsXCRCwuNo3V9ou6igSzEYCe4PTSvc76c/P1i0A7gp0.di
let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$12$gv6vAwUcsXCRCwuNo3V9ou6igSzEYCe4PTSvc76c/P1i0A7gp0.di',
    name: 'bob',
    email: 'bob@gmail.com',
    url: '',
  },
  {
    id: '2',
    username: 'username2',
    password: 'password2',
    name: 'name2',
    email: 'example2@email.com',
    url: '',
  },
  {
    id: '3',
    username: 'username3',
    password: 'password23',
    name: 'name2',
    email: 'example2@email.com',
    url: '',
  },
  {
    id: '4',
    username: 'username4',
    password: 'password24',
    name: 'name2',
    email: 'example2@email.com',
    url: '',
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
