const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_KEY || 'its a secret SHHHHHH!';

function checkAuth(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        res.setHeader("Content-Type", "text/plain");
        res.status(401);
        res.send('Unauthorized');
      }
      else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.setHeader("Content-Type", "text/plain");
    res.status(401);
    res.send('Unauthorized');
  }
}

module.exports = {
  checkAuth
};
