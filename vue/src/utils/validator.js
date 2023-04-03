const passwordReg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/; //must contain number and letter length 6-20
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//const PASSWORD_REQUIREMENT_TEXT="Password length must between 6 and 20 , must contain both number and character"
function validatePassword(password) {
  return passwordReg.test(password);
} 

function validateEmail(email) {
  return emailReg.test(email);
}

let validator = {
  validatePassword: validatePassword,
  validateEmail: validateEmail,
};

export default validator;
