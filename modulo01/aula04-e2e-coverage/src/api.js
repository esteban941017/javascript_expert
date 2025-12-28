const http = require('http');
const DEFAULT_USER = {
  username: 'Esteban',
  password: '123',
};
const { once } = require('events');

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page\n');

    return response.end();
  },
  // curl -X POST --data '{"username": "Esteban", "password": "123"}' -i localhost:3000/login
  '/login:post': async (request, response) => {
    const user = JSON.parse(await once(request, 'data'));
    const toLower = (text) => text.toLowerCase();

    if (toLower(user.username) !== toLower(DEFAULT_USER.username) || user.password !== DEFAULT_USER.password) {
      response.writeHead(401);
      response.end('Login failed!\n');

      return;
    }

    return response.end('Successfully logged in\n');
  },
  default(request, response) {
    response.writeHead(404);

    return response.end('Not found\n');
  },
};

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  return chosen(request, response);
}

const app = http.createServer(handler).listen(3000, () => console.log('Running at 3000'));

module.exports = app;
