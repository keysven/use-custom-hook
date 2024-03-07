export const validation = {
    required: (v: any, label: string, no_message = false, disallow_zero = false) => {
        if (disallow_zero) {
            if (v === '0' || v === 0) {
                if (no_message) {
                    return '';
                }
                return label + 'は必須です';
            }
        }
        if (no_message) {
            return !!v || '';
        }
        return !!v || label + 'は必須です';
    },
    zip_code: (v: any) => {
        if (v === undefined || v === null || v === '') {
            return true;
        }
        return /^\d{3}-?\d{4}$/.test(v) || '正しい郵便番号を入力してください';
    },
    tel: (v: any) => {
        if (v === undefined || v === null || v === '') {
            return true;
        }
        return /^0\d{1,4}-\d{1,4}-\d{3,4}$/.test(v) || '正しい電話番号を入力してください。';
    },
    kana: (v: string) => {
        return /^[ァ-ヶー　 ]*$/.test(v) || 'カタカナとスペースのみ入力可能です。'
    },
    password: (v: any) => {
        if (v && v.length >= 8 && v.length <= 32) {
            return /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{8,32}$/.test(v) || 'パスワードは半角英数字をそれぞれ1種類以上含む、8文字以上32文字以内で指定したください'
        } else {
            return 'パスワードは8文字以上32文字以内で指定したください'
        }
    },
    int: (v: any) => {
        if (v === null || v === undefined || v === '') return true;
        return !/[^[0-9]]*$/.test(v) || '半角数字のみで入力してください。'
    },
    time: (v: any) => {
        if (v === null || v === undefined || v === '') return true;
        return /^[0-9]{2}:[0-9]{2}$/.test(v) || '正しい時間を入力してください';
    }
};
