let required = propertyType => {
  return v => (v && v.length > 0) || `You must input a ${propertyType}`
}
let minLength = (propertyType, minLength) => {
  return v =>
    (v && v.length >= minLength) ||
    `${propertyType} must be at least ${minLength} characters`
}
let maxLength = (propertyType, maxLength) => {
  return v =>
    (v && v.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`
}

let emailFormat = () => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
  return v => (v && regex.test(v)) || 'Must be a valid email'
}

let positiveNumber = () => {
  return v => (v && v >= 0) || 'Must be a valid price'
}

let phoneFormat = () => {
  let regex = /(01)[0-9]{9}/
  return v =>
    (v && regex.test(v)) ||
    'Must be a valid Egyptian phone with 11 numeric digits, example: 01234567890'
}

export default {
  required,
  phoneFormat,
  minLength,
  maxLength,
  emailFormat,
  positiveNumber,
  phoneFormat,
}
