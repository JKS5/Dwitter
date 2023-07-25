// abcd1234:$2b$12$gv6vAwUcsXCRCwuNo3V9ou6igSzEYCe4PTSvc76c/P1i0A7gp0.di
let users = [
  {
    id: '1',
    username: 'username1',
    password: '$2b$12$gv6vAwUcsXCRCwuNo3V9ou6igSzEYCe4PTSvc76c/P1i0A7gp0.di',
    name: 'bob',
    email: 'bob@gmail.com',
    url: '',
  },
  {
    id: 'uuid2',
    username: 'username2',
    password: 'password2',
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
