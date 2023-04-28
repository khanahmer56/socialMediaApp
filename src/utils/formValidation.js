export const emailValidation = {
  required: { value: true, message: "Email is required" },

  pattern: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    message: "Invalid email address",
  },
};

export const passwordValidation = {
  required: { value: true, message: "Password is required" },
  minLength: { value: 6, message: "Password must be at least 6 characters" },
};
export const usernameValidation = {
  required: { value: true, message: "Username is required" },
  minLength: { value: 6, message: "Username must be at least 6 characters" },
};
