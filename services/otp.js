// SERVICES/otp.js
const axios = require('axios');
const configs = require("./../configs/configs")

async function loginToFarazSms() {
    try {
        const response = await axios.post(`${configs.sms.base_url}/api/acl/auth/login`, {
            username: "u09059427581",
            password: "Faraz@1933611364285673"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const token = response.data?.data?.token
        if (!token) throw new Error("Token not found!")
        return token
    } catch (error) {
        console.error("❌ FarazSms Login failure: ", error.response?.data || error.message)
        throw error
    }
}


/**
 * ارسال OTP به شماره موبایل
 * @param {string} phoneNumber - شماره موبایل گیرنده
 * @param {string} otpCode - کد تایید
 */

async function sendOtpCode(phoneNumber, otpCode, token) {
  console.log('✅ OTP code:', otpCode);
  try {
    const response = await axios.post(`${configs.sms.base_url}/api/acl/auth/send_sms_otp`, {
      recipient: phoneNumber,
      otp_code: otpCode,
      token
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error sending OTP:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = {sendOtpCode, loginToFarazSms};
