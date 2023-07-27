// ! localStorage에 저장은 보안상 안좋지만 임시

const TOKEN = 'token';

export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    // localStorage.clear();
    localStorage.removeItem(TOKEN);
  }
}
