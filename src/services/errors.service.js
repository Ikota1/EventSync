const errorHandler = (errorCode) => {
    let message = '';

    switch (errorCode.code) {
    case 'auth/email-already-in-use':
        message = 'Email already in use';
        break;
    case 'auth/user-disabled':
        message = 'User disabled';
        break;
    case 'auth/username-already-exists':
        message = 'Username already exists';
        break;
    case 'auth/user-token-expired':
        message = 'User token expired';
        break;
    case 'auth/too-many-requests':
        message = 'Too many requests';
        break;
    case 'auth/operation-not-allowed':
        message = 'Operation not allowed';
        break;
    case 'auth/user-deleted':
        message = 'User deleted';
        break;
    case 'auth/user-not-found':
        message = 'User not found';
        break;
    case 'auth/invalid-email':
        message = 'Invalid email';
        break;
    case 'auth/wrong-password':
        message = 'Wrong password';
        break;
    case 'auth/email-already-exists':
        message = 'Email already exists';
        break;
    default:
        message = `There was an error: "${errorCode.code}: ${errorCode.message}}"`;
        break;
    }

    return message;
};

export default errorHandler;
