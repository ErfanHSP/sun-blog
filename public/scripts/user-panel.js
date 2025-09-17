// تغییر بین بخش‌های اصلی
const menuItems = document.querySelectorAll(".sidebar-menu li");
const panelSections = document.querySelectorAll(".panel-section");
const accountForm = document.getElementById("account-form");
let errorBox = document.getElementsByClassName("error-box")
let successBox = document.getElementsByClassName("success-box")
let submitFormAccountBtn = document.getElementById("formAccountBtn")

document.addEventListener("DOMContentLoaded", () => {
    fetch("/me/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(async (res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        if (data.tokenError) {
            
        }
        if (!data.success) {
            console.error("Server error:", data.message || "Unknown error");
        } else if (data.success) {
            if (data.user) {
                document.getElementById('username').value = data.user.username;
                document.getElementById('phone').value = data.user.phone
                document.getElementById('fullname').value = data.user.fullname;
                document.getElementById("settings-h3").innerHTML = data.user.fullname ? data.user.fullname + " Welcome to SunBlog☀️" : "Welcome to SunBlog☀️"
                document.getElementById("bio").value = data.user.bio
            }
        }
    })
    .catch((err) => {
        console.error("Network error:", err);
        alert("Network error. Please try again.");
    });
});

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        // حذف کلاس active از همه موارد منو
        menuItems.forEach(i => i.classList.remove("active"));
        
        // افزودن کلاس active به مورد انتخاب شده
        item.classList.add("active");
        
        // مخفی کردن همه بخش‌ها
        panelSections.forEach(section => {
            section.classList.remove("active");
        });
        
        // نمایش بخش انتخاب شده
        const sectionId = `${item.dataset.section}-section`;
        document.getElementById(sectionId).classList.add("active");
    });
});

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // غیرفعال کردن همه دکمه‌ها
        tabButtons.forEach(b => b.classList.remove("active"));
        
        // مخفی کردن همه تب‌ها
        tabContents.forEach(tc => tc.classList.remove("active"));
        
        // فعال کردن دکمه فعلی
        btn.classList.add("active");
        
        // نمایش تب مربوطه
        const targetTab = document.getElementById(`${btn.dataset.tab}-tab`);
        targetTab.classList.add("active");
    });
});

accountForm.addEventListener("submit", (e) => {
    e.preventDefault()
    submitFormAccountBtn.disabled = true
    submitFormAccountBtn.textContent = 'Submitting...'
    let usernameInput = document.getElementById("username")
    let fullnameInput = document.getElementById("fullname")
    let bioText = document.getElementById("bio")
    fetch("/me/profile", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: usernameInput.value,
        fullname: fullnameInput.value,
        bio: bioText.value
    })
    })
    .then(async (res) => {
    const data = await res.json()
    if (!data.success) {
        console.error("Server error:", data.message || "Unknown error")
        setTimeout(() => {
            successBox[0].style.display = 'none'
            errorBox[0].style.display = 'block'
            errorBox[0].innerHTML = `${data.message}`

        }, 2000)
        setTimeout(() => {
            errorBox[0].style.display = 'none'
        }, 7000);
        
        
    } else if (data.success) {
        setTimeout(() => {
            successBox[0].style.display = 'block'
            errorBox[0].style.display = 'none'
            successBox[0].innerHTML = data.message || "User successfully updated."
        }, 2000)
        setTimeout(() => {
            location.reload()
            successBox[0].style.display = 'none'
        }, 3000);
    }
    })
    .catch((err) => {
    console.error("Network error:", err)
    alert("Network error. Please try again.")
    })
    .finally(() => {
        setTimeout(() => {
            submitFormAccountBtn.disabled = false;
            submitFormAccountBtn.textContent = 'Save Changes';
        }, 3000);
    })
})