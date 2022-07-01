import { isStringEmpty } from "./string";

export default function validateField(value, name, length = null) {
  if (isStringEmpty(value)) {
    alert(`O campo ${name} não foi preenchido`);
    return true;
  }
  if (length) {
    if (value.length < length) {
      if (isStringEmpty(value)) {
        alert(`O campo ${name} não foi preenchido`);
        return true;
      } else {
        alert(`O campo ${name} não foi preenchido`);
        return true;
      }
    }
  }
}
