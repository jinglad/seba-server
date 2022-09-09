const serverError = (res) => {
  res.status(500).send({msg: "Server Error"});
}

module.exports = serverError;