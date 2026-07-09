// ===============================
// ماركت الأمير - لوحة التحكم
// الجزء الأول
// ===============================

// كلمة مرور المدير
const ADMIN_PASSWORD = "123456";

// عناصر الصفحة
const loginPage = document.querySelector(".login-page");
const dashboard = document.getElementById("dashboard");

const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// تسجيل الدخول
loginBtn.addEventListener("click", () => {

    const password = passwordInput.value.trim();

    if(password === ADMIN_PASSWORD){

        loginPage.style.display = "none";
        dashboard.style.display = "block";

        localStorage.setItem("adminLogged","true");

    }else{

        alert("كلمة المرور غير صحيحة");

    }

});

// تسجيل الخروج
logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("adminLogged");

    location.reload();

});

// إبقاء تسجيل الدخول
if(localStorage.getItem("adminLogged") === "true"){

    loginPage.style.display = "none";
    dashboard.style.display = "block";

}
