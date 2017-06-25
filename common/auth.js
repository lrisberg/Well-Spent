const jwt = require('jsonwebtoken');
const responses = require('./responses.js');

const SECRET = process.env.JWT_KEY || 'its a secret SHHHHHH!';

function checkAuth(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        responses.unauthorized(res);
      }
      else {
        req.user = decoded;
        next();
      }
    });
  } else {
    responses.unauthorized(res);
  }
}

module.exports = {
  checkAuth
}
