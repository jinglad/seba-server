const serverError = (res) => {
  res.status(500).send({ msg: "Server Error" });
};

// funtion to move file to uploads folder using express fileupload
const moveFile = (file) => {
  return new Promise((resolve, reject) => {
    file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve();
    });
  });
};

const createTransactionId = () => {
  return (
    "_" +
    Math.random().toString(36).substr(2, 9) +
    new Date().getTime().toString(36)
  );
};

module.exports = {
  serverError,
  moveFile,
  createTransactionId,
};
