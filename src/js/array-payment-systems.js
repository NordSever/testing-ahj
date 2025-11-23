import visaImg from '../images/visa.png';
import mastercardImg from '../images/mastercard.png';
import mirImg from '../images/mir.png';

export const russianPayments = [
  {key: 'visa', src: visaImg, regExp: /^4/},
  {key: 'mir', src: mirImg, regExp: /^220[0-4]/},
  {key: 'mastercard', src: mastercardImg, regExp: /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/},

];