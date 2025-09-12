// SERVICES/otp.js
const axios = require('axios');
const configs = require("./../configs/configs")
// it's only for sellers
// async function loginToFarazSms() {
//     try {
//         const response = await axios.post(`${configs.sms.base_url}/api/acl/auth/login`, {
//             username: "u09059427581",
//             password: "Faraz@1933611364285673"
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         // console.log("login response: ", response.data);
        
//         const token = response.data?.data?.token
//         if (!token) throw new Error("Token not found!")
//         return token
//     } catch (error) {
//         console.error("❌ FarazSms Login failure: ", error.response?.data || error.message)
//         throw error
//     }
// }

/**
 * ارسال OTP به شماره موبایل
 * @param {string} phoneNumber - شماره موبایل گیرنده
 * @param {string} otpCode - کد تایید
 */

async function sendOtpCode(phoneNumber, otpCode) {
  try {
    console.log("otp code: ", otpCode)
    const response = await axios.post(`${configs.sms.base_url}/api/send`,
      {
        "sending_type": "pattern",
        "from_number": "+983000505",
        "code": "t7xjppqq3qnqlel",
        "recipients": [
          phoneNumber
        ],
        "params": {
          "otp_code": otpCode
        }
      }
      ,
      {
      headers: {
        'Authorization': `${configs.sms.api_key}`,
        'Content-Type': 'application/json'
      }
    });
    

    return response.data;
  } catch (error) {
    console.error('❌ Error sending OTP:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = {sendOtpCode};
