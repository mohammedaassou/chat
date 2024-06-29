const firebaseErrorMessages = {
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-disabled': 'The user account has been disabled.',
    'auth/user-not-found': 'There is no user corresponding to this email.',
    'auth/wrong-password': 'The password is invalid for the given email.',
    'auth/email-already-in-use': 'The email address is already in use by another account.',
    'auth/weak-password': 'The password is too weak.',
    // Add more error codes and messages as needed
};

export const getErrorMessage = (errorCode) => {
    return firebaseErrorMessages[errorCode] || 'An unknown error occurred. Please try again.';
};
