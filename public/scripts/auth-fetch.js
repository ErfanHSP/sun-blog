    let requestOtpForm = document.getElementById("request-otp-form")
    let verifyOtpForm = document.getElementById("verify-otp-form")
    let phoneInput = document.getElementById("phone")
    let otpInput = document.getElementById("otp")
    let errorBox = document.getElementsByClassName("error-box")
    let successBox = document.getElementsByClassName("success-box")
    
  requestOtpForm.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("/auth/request-otp", {
    method: "POST",
    headers: {
        "Content-Type": "application/json" // ✅ lowercase
    },
    body: JSON.stringify({
        phone: phoneInput.value
    })
    })
    .then(async (res) => {
    const data = await res.json()
    if (!data.success) {
        // ❌ response status is 400, 401, etc.
        console.error("Server error:", data.message || "Unknown error")
        errorBox[0].style.display = 'block'
        successBox[0].style.display = 'none'
        
        errorBox[0].innerHTML = `${data.message} resending code after ${data.remainingTime} seconds.` || "Something went wrong."
        
    } else if (data.success) {
        successBox[0].style.display = 'block'
        errorBox[0].style.display = 'none'
        successBox[0].innerHTML = data.message || "otp code successfully sent."
    }
    })
    .catch((err) => {
      console.error("Network error:", err)
      alert("Network error. Please try again.")
    })
    verifyOtpForm.style.display = "flex"
    requestOtpForm.style.display = "none"
  })

  verifyOtpForm.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("/auth/verify-otp", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        otp: otpInput.value,
        phone: phoneInput.value
    })
    })
    .then(async (res) => {
    const data = await res.json()
    if (!data.success) {
        // ❌ response status is 400, 401, etc.
        console.error("Server error:", data.message || "Unknown error")
        errorBox[0].style.display = 'block'
        successBox[0].style.display = 'none'
        
        errorBox[0].innerHTML = `${data.message}` || "Something went wrong."
        
    } else if (data.success) {
        successBox[0].style.display = 'block'
        errorBox[0].style.display = 'none'
        successBox[0].innerHTML = data.message
    }
    })
    .catch((err) => {
      console.error("Network error:", err)
      alert("Network error. Please try again.")
    })
  })