const appError = (err, req, res, next) => {
  if (!err.isApiError) {
    console.log('🚀 ~ file: appError.js:3 ~ appError ~ err:', err);
    res.status(500).json({ message: err });
    return;
  }
  res.status(err.statusCode).json({ message: err.message });
};

module.exports = { appError };
