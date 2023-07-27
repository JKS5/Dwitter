export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, password, name, email, url) {
    //fetch로 서버에 보내고 서버에서 username과 token을 받아서 Client에 return 해 주는 Bussiness Logic
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, name, email, url }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      Headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
