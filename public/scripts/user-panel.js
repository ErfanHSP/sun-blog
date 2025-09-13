// تغییر بین بخش‌های اصلی
const menuItems = document.querySelectorAll(".sidebar-menu li");
const panelSections = document.querySelectorAll(".panel-section");
const accountForm = document.getElementById("account-form")

document.addEventListener("DOMContentLoaded", () => {
    // دریافت توکن از localStorage
    const token = localStorage.getItem('token');
    console.log(token)
    // اگر توکن وجود ندارد
    if (!token) {
        console.error("No token found");
        // redirect to login or show error
        return;
    }

    fetch("/me/getme", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  // اضافه کردن توکن به هدر
        },
    })
    .then(async (res) => {
        const data = await res.json();
        if (!data.success) {
            console.error("Server error:", data.message || "Unknown error");
            // نمایش خطا اگر نیاز باشد
        } else if (data.success) {
            console.log("User data:", data.user);
            // اینجا می‌توانید اطلاعات کاربر را در صفحه نمایش دهید
            // به عنوان مثال:
            // document.getElementById('username').value = data.user.username;
            // document.getElementById('fullname').value = data.user.fullname;
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

// تغییر بین تب‌های داخلی
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
    fetch("")
})