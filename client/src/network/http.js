export default class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url, options) {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });

    // const data = await response.json()을 안하고 try catch문으로 또 만든 이유
    // body가 없는 response에 json을 호출하면 에러를 발생시킬 수 있기 때문에 try catch문으로 잡는다.
    let data = await response.json();
    try {
      data = await response.json();
    } catch (error) {
      // 실제 에러는 아니기 때문에 그냥 에러만 호출
      console.log(error);
    }
    // 브라우저 fetch api는 status가 200이 아닌 경우도 promise이기 때문에
    // 데이터가 올 수 있기 때문에

    if (response.status > 299 || response.status < 200) {
      const message =
        data && data.message ? data.message : 'something wnet Wrong!';
      const error = new Error(message);
      if (response.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
      throw error;
    }
    return data;
  }
}
