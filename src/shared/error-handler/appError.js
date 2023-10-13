const appError = (err, req, res, next) => {
  console.error({ message: err.message, error: err });
  if (!err.isApiError) {
    res.status(500).json({
      error: {
        message: 'Internal Server Error'
      }
    });
    return;
  }
  res.status(err.statusCode).json({
    error: {
      message: err.message
    }
  });
};

module.exports = { appError };
