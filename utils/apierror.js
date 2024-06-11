// @desc    this class is responsible about operation errors (errors that i can predict)
class apierror extends Error {
    constructor(message, statuscode) {
      super(message);
      this.statuscode = statuscode;
      this.status = `${statuscode}`.startsWith(4) ? 'fail' : 'error';
      this.isoperational = true;
    }
  }
  
  module.exports = apierror;
  