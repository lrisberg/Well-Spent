function unauthorized(res) {
  res.setHeader("Content-Type", "plain/text");
  res.status(401);
  res.send('Unauthorized!')
}

function notFound(res) {
  res.setHeader("Content-Type", "plain/text");
  res.status(404);
  res.send("Not found!");
}

module.exports = {
  unauthorized,
  notFound
};
