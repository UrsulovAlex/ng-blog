export const VALIDATION_ERROR_MESSAGE = new Map();

VALIDATION_ERROR_MESSAGE.set('login_register', {
  login: {
    required: 'Required login',
    minlength: 'The login length must be greater than or equal to 3',
  },
  password: {
    required: 'Required password',
    minlength: 'The password length must be greater than or equal to 3'
  },
  nickName: {
    required: 'Required password',
    minlength: 'The nickName length must be greater than or equal to 3'
  }
});

VALIDATION_ERROR_MESSAGE.set('post_edit', {
  login: {
    required: 'Required login',
    minlength: 'The login length must be greater than or equal to 3'
  },
  password: {
    required: 'Required password',
    minlength: 'The password length must be greater than or equal to 3'
  },
  nickName: {
    required: 'Required password',
    minlength: 'The nickName length must be greater than or equal to 3'
  }
});