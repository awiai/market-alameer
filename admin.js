alert("تم تشغيل admin.js");
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


// كلمة مرور المدير
const ADMIN_PASSWORD = "123456";


// عناصر الصفحة
const loginPage = document.querySelector(".login-page");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const passwordInput = document.getElementById("password");


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


// حفظ تسجيل الدخول
if (localStorage.getItem("admin_login") === "true") {

    loginPage.style.display = "none";
    dashboard.style.display = "block";

}


// المنتجات
const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");


// إضافة منتج
productForm.addEventListener("submit", async function (e) {

    e.preventDefault();


    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();
    const category = document.getElementById("productCategory").value;


    const product = {

        name,
        price,
        description,
        category,
        createdAt: Date.now()

    };


    try {

        await addDoc(collection(db, "products"), product);

        alert("تمت إضافة المنتج");

        productForm.reset();

        loadProducts();


    } catch(error) {

        console.log(error);

        alert("حدث خطأ أثناء حفظ المنتج");

    }


});


// عرض المنتجات
async function loadProducts(){

    productsList.innerHTML = "";


    const snapshot = await getDocs(collection(db, "products"));


    if(snapshot.empty){

        productsList.innerHTML = "لا توجد منتجات";

        return;

    }


    snapshot.forEach((doc)=>{


        const product = doc.data();


        productsList.innerHTML += `

        <div class="product-card">

        <h3>${product.name}</h3>

        <p>${product.price} د.ع</p>

        <small>${product.category}</small>

        </div>

        `;


    });


}


// تشغيل تحميل المنتجات
loadProducts();
