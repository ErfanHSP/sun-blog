function normalizePhone(phone) {
  if (!phone) return null;

  // حذف فاصله، خط تیره، پرانتز و کاراکترهای اضافی
  phone = phone.replace(/[\s\-()]/g, '');

  // اگر با 0098 شروع شد → تبدیل به +98
  if (phone.startsWith('0098')) {
    phone = phone.replace(/^0098/, '+98');
  }

  // اگر با 0 شروع شد → تبدیل به +98
  else if (phone.startsWith('0')) {
    phone = phone.replace(/^0/, '+98');
  }

  // اگر با 98 شروع شد ولی بدون + بود → اضافه کردن +
  else if (phone.startsWith('98')) {
    phone = '+' + phone;
  }

  // اگر با +98 شروع نشد → اضافه کردن +98
  else if (!phone.startsWith('+98')) {
    phone = '+98' + phone;
  }

  return phone;
}

module.exports = normalizePhone