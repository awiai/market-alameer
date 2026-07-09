import { firebaseConfig } from "./config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// ========================================
// Market Alameer Admin Panel
// الجزء الأول
// ========================================

// كلمة مرور المدير
const ADMIN_PASSWORD = "123456";

// عناصر الصفحة
const loginPage = document.querySelector(".login-page");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const passwordInput = document.getElementById("password");

// إخفاء لوحة التحكم عند بداية التشغيل
dashboard.style.display = "none";

// تسجيل الدخول
loginBtn.addEventListener("click", () => {

    const password = passwordInput.value.trim();

    if (password === ADMIN_PASSWORD) {

        loginPage.style.display = "none";
        dashboard.style.display = "block";

        localStorage.setItem("admin_login", "true");

    } else {

        alert("كلمة المرور غير صحيحة");

    }

});

// تسجيل الخروج
logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("admin_login");

    location.reload();

});

// إذا كان المدير مسجلاً مسبقاً
if (localStorage.getItem("admin_login") === "true") {

    loginPage.style.display = "none";
    dashboard.style.display = "block";

}
// ========================================
// إدارة المنتجات (المرحلة الأولى)
// ========================================

const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");

// قائمة مؤقتة للمنتجات
let products = [];

// إضافة منتج
productForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();
    const category = document.getElementById("productCategory").value;

    const product = {
        id: Date.now(),
        name,
        price,
        description,
        category
    };

    products.push(product);

    renderProducts();

    productForm.reset();

});

// عرض المنتجات
function renderProducts() {

    if (products.length === 0) {
        productsList.innerHTML = "لا توجد منتجات";
        return;
    }

    productsList.innerHTML = "";

    products.forEach(product => {

        productsList.innerHTML += `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.price} د.ع</p>
            <small>${product.category}</small>
        </div>
        `;

    });

}
// ========================================
// تجهيز اللوحة
// ========================================

const buttons = document.querySelectorAll("nav button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.style.opacity = "0.7";
        });

        button.style.opacity = "1";

    });

});
