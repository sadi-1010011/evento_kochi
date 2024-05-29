import validator from "validator";

const validateEmail = (email: string): boolean => {
    return validator.isEmail(email);
}

const validatePassword = (password: string): boolean => {
    console.log(password)
    return password.length >= 8
}

console.log(validateEmail('farhanfarhan832@gmail.com'))

console.log(validatePassword('123456'))