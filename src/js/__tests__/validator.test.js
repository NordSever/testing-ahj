import { 
  detectedPaymentSys, 
  digitsOnly, 
  lengthNumber, 
  isSomePaymentSys, 
  luhnCheck 
} from '../validator'; 

import { russianPayments } from '../array-payment-systems';

describe('Функции валидации номера карты', () => {
  
  describe('detectedPaymentSys', () => {
    test('возвращает ключ платежной системы при совпадении', () => {
      expect(detectedPaymentSys('4111111111111111', russianPayments)).toBe('visa');
      expect(detectedPaymentSys('5555555555554444', russianPayments)).toBe('mastercard');
      expect(detectedPaymentSys('2200111111111111', russianPayments)).toBe('mir');
    });

    test('возвращает undefined при отсутствии совпадения', () => {
      expect(detectedPaymentSys('9111111111111111', russianPayments)).toBeUndefined();
    });

    test('возвращает undefined при пустом массиве платежных систем', () => {
      expect(detectedPaymentSys('4111111111111111', null)).toBeUndefined();
    });
  });

  describe('digitsOnly', () => {
    test('возвращает true для строки только из цифр', () => {
      expect(digitsOnly('1234567890123456')).toBe(true);
    });

    test('возвращает false для строки с нецифровыми символами', () => {
      expect(digitsOnly('1234abc567890123')).toBe(false);
      expect(digitsOnly('1234 5678 9012 3456')).toBe(false);
    });
  });

  describe('lengthNumber', () => {
    test('возвращает true для номера длиннее 12 И короче 20 символов', () => {
      expect(lengthNumber('1234567890123')).toBe(true); // 13 символов
      expect(lengthNumber('1234567890123456789')).toBe(true); // 19 символов
    });

    test('возвращает false для номера короче или равно 12 символов', () => {
      expect(lengthNumber('123456789012')).toBe(false); // 12 символов
      expect(lengthNumber('12345678901')).toBe(false); // 11 символов
    });

    test('возвращает false для номера длиннее или равно 20 символов', () => {
      expect(lengthNumber('12345678901234567890')).toBe(false); // 20 символов
      expect(lengthNumber('123456789012345678901')).toBe(false); // 21 символ
    });
  });

  describe('isSomePaymentSys', () => {
    test('возвращает true когда номер соответствует одной из платежных систем', () => {
      expect(isSomePaymentSys('4111111111111111', russianPayments)).toBe(true);
    });

    test('возвращает false когда номер не соответствует ни одной платежной системе', () => {
      expect(isSomePaymentSys('9111111111111111', russianPayments)).toBe(false);
    });

    test('возвращает undefined при пустом массиве платежных систем', () => {
      expect(isSomePaymentSys('4111111111111111', null)).toBeUndefined();
    });
  });

  describe('luhnCheck', () => {
    test('возвращает true для валидного номера по алгоритму Луна', () => {
      expect(luhnCheck('4111111111111111')).toBe(true);
      expect(luhnCheck('5555555555554444')).toBe(true);
    });

    test('возвращает false для невалидного номера по алгоритму Луна', () => {
      expect(luhnCheck('4111111111111112')).toBe(false);
      expect(luhnCheck('1234567812345678')).toBe(false);
    });
  });
});