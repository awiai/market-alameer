// ======================================
// لوحة تحكم ماركت الأمير - المرحلة الأولى
// ======================================

// كلمة مرور المدير
const ADMIN_PASSWORD = "123456";

// عناصر الصفحة
const loginPage = document.querySelector(".login-page");
const dashboard = document.getElementById("dashboard");

const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// إخفاء لوحة التحكم عند فتح الصفحة
dashboard.style.display = "none";

// تسجيل الدخول
loginBtn.addEventListener("click", () => {

    const password = passwordInput.value.trim();

    if (password === ADMIN_PASSWORD) {

        loginPage.style.display = "none";
        dashboard.style.display = "block";

        localStorage.setItem("adminLogin", "true");

    } else {

        alert("كلمة المرور غير صحيحة");

    }

});

// تسجيل الخروج
logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("adminLogin");

    location.reload();

});

// إذا كان مسجل الدخول سابقاً
if (localStorage.getItem("adminLogin") === "true") {

    loginPage.style.display = "none";
    dashboard.style.display = "block";

}
