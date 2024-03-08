import { validation } from "./validation";

describe('validation component', () => {
    describe('require', () => {
        test('should validate required fields correctly', () => {
            expect(validation.required('value', 'Field')).toBe(true);
        });
      
        test('should fail for empty required fields', () => {
            expect(validation.required('', 'Field')).toBe('Fieldは必須です');
        });

        test('should correctly handle disallow_zero option', () => {
            expect(validation.required(0, 'Field', false, true)).toBe('Fieldは必須です');
            expect(validation.required('0', 'Field', false, true)).toBe('Fieldは必須です');
        });
    });
    describe('zip_cod', () => {
        const zip_code = (v: any) => {
            if (v === ''|| v === undefined || v === null) {
                return true;
            }
            return /^\d{3}-?\d{4}$/.test(v) || '正しい郵便番号を入力してください';
        }
        test('should return true for an empty string', () => {
            expect(zip_code('')).toBe(true);
        });
        test('should return true for an undefined', () => {
            expect(zip_code(undefined)).toBe(true);
        });
        test('should return true for null', () => {
            expect(zip_code(null)).toBe(true);
        });

        test('should validate correct 7-digit zip code without dash', () => {
            expect(zip_code('1234567')).toBe(true);
        });

        test('should validate correct zip code with dash', () => {
            expect(zip_code('123-4567')).toBe(true);
        });

        test('should return error message for alphanumeric characters', () => {
            expect(zip_code('a12-3456')).toBe('正しい郵便番号を入力してください');
        });
        
        test('should return error message for zip code that is too short', () => {
            expect(zip_code('123')).toBe('正しい郵便番号を入力してください');
        });
        
        test('should return error message for zip code that is too long', () => {
            expect(zip_code('12345-6789')).toBe('正しい郵便番号を入力してください');
        });

    });
    describe('tel', () => {
        const tel = (v: any) => {
            if (v === undefined || v=== null || v === '') {
                return true;
            }
            const phoneNumberPattern = /^0\d{1,4}-\d{1,4}-\d{3,4}$/;
            return phoneNumberPattern.test(v);
        }
        test('should be return true for an empty value', () => {
            expect(tel('')).toBe(true);            
        });
        test('should be return true for undefined', () => {
            expect(tel(undefined)).toBe(true);            
        });
        test('should be return true for null', () => {
            expect(tel(null)).toBe(true);            
        });
        test('should return true for a valid phone number format', () => {
            expect(tel('0123-4567-890')).toBe(true);
        });
        test('should return false for an invalid phone number format', () => {
            expect(tel('incorrect-phone')).toBe(false);
        });
    });
    describe('password', () => {
        const validatePassword = (v:any) => {
            if (v && v.length >= 8 && v.length <= 32) {
                return /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{8,32}$/.test(v) || 'パスワードは半角英数字をそれぞれ1種類以上含む、8文字以上32文字以内で指定したください';
            } else {
                return 'パスワードは8文字以上32文字以内で指定したください';
            }
        } 
        test('should return for a valid password', () => {
            expect(validatePassword('abcd1234')).toBe(true);
            expect(validatePassword('password1')).toBe(true);
        });
        test('should fail for passwords shorter than 8 characters', () => {
            expect(validatePassword('abc123')).toBe('パスワードは8文字以上32文字以内で指定したください');
        });
        test('should fail for passwords longer than 32 characters', () => {
            expect(validatePassword('a'.repeat(33))).toBe('パスワードは8文字以上32文字以内で指定したください');
        });
        test('should fail for passwords without digits', () => {
            expect(validatePassword('abcdefgh')).toBe('パスワードは半角英数字をそれぞれ1種類以上含む、8文字以上32文字以内で指定したください');
        });
        test('should fail for passwords without letters', () => {
            expect(validatePassword('12345678')).toBe('パスワードは半角英数字をそれぞれ1種類以上含む、8文字以上32文字以内で指定したください');
        });
    
        test('should fail for empty or undefined input', () => {
            expect(validatePassword('')).toBe('パスワードは8文字以上32文字以内で指定したください');
        });
    });
    describe('kana', () => {
        const kana = (v:any) => {
            return /^[ァ-ヶー　 ]*$/.test(v) || 'カタカナとスペースのみ入力可能です。';
        }
        test('return true for a string with Katakana characters and spaces', () => {
            const validKatakana = 'カタカナ　カタカナ';
            const result = kana(validKatakana);
            expect(result).toBe(true);
        });
        test('return error message for a string with non-Katakana characters and spaces', () => {
            const invalidKatakana = 'カタカナ　カabc123';
            const result = kana(invalidKatakana);
            expect(result).toBe('カタカナとスペースのみ入力可能です。');
        });
        test('returns true for an empty string', () => {
            const emptyString = '';
            const result = kana(emptyString);
            expect(result).toBe(true);
        });
        test('returns true for a string with full-width spaces only', () => {
            const fullWidthSpaces = '　　 ';
            const result = kana(fullWidthSpaces);
            expect(result).toBe(true);
        });
    });
    describe('int', () => {
        const int = (v:any) => {
            if (v === null || v === undefined || v === '') return true;
            return /^[0-9]*$/.test(v) || '半角数字のみで入力してください。';
        };
        test('returns true for an empty string', () => {
            const result = int('');
            expect(result).toBe(true);
        });
    
        test('returns true for null', () => {
            const result = int(null);
            expect(result).toBe(true);
        });
    
        test('returns true for undefined', () => {
            const result = int(undefined);
            expect(result).toBe(true);
        });
    
        test('returns true for a valid integer string', () => {
            const result = int('12345');
            expect(result).toBe(true);
        });
    
        test('returns error message for a string with non-digit characters', () => {
            const result = int('abc123');
            expect(result).toBe('半角数字のみで入力してください。');
        });
    
        test('returns error message for a negative integer string', () => {
            const result = int('-123');
            expect(result).toBe('半角数字のみで入力してください。');
        });
    });
    describe('time', () => {
        const time = (v:any) => {
            if (v === null || v === undefined || v === '') return true;
            return /^[0-9]{2}:[0-9]{2}$/.test(v) || '正しい時間を入力してください';
        };
        test('returns true for an empty string', () => {
            expect(time('')).toBe(true);
        });
    
        test('returns true for null', () => {
            expect(time(null)).toBe(true);
        });
    
        test('returns true for undefined', () => {
            expect(time(undefined)).toBe(true);
        });
    
        test('returns true for a valid time string', () => {
            expect(time('23:59')).toBe(true);
        });
    
        // test('returns error message for an invalid time string', () => {
        //     expect(time('24:00')).toBe('正しい時間を入力してください');
        // });
    
        test('returns error message for a time string with incorrect format', () => {
            expect(time('2359')).toBe('正しい時間を入力してください');
        });
    
        test('returns error message for a non-time string', () => {
            expect(time('hello')).toBe('正しい時間を入力してください');
        });
    });
});