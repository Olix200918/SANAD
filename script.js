// تخزين كلمات المرور السابقة
const usedPasswords = new Set();

// إضافة التحقق من تسجيل الدخول
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.querySelector('input[type="text"]').value;
    const password = document.getElementById('passwordInput').value;
    const errorElement = document.getElementById('passwordError');
    
    // إخفاء رسالة الخطأ في البداية
    errorElement.classList.remove('show');
    
    // التحقق من وجود قيم
    if (!username || !password) {
        errorElement.textContent = 'Please enter both username and password';
        errorElement.classList.add('show');
        return;
    }
    
    // التحقق من كلمة المرور
    const passwordRegex = /^[a-zA-Z0-9_]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorElement.textContent = 'Password must be at least 8 characters long and contain only English letters, numbers, and ( _ )';
        errorElement.classList.add('show');
        return;
    }
    
    // حفظ البيانات في localStorage
    const userData = {
        username: username,
        password: password,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('sanadUserData', JSON.stringify(userData));
    
    // التحقق من تسجيل الدخول
    checkLoginStatus();
    
    // الانتقال إلى الصفحة الرئيسية
    window.location.href = 'home.html';
});

// دالة التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const userData = JSON.parse(localStorage.getItem('sanadUserData'));
    
    // إذا لم يكن المستخدم مسجل الدخول، أعده إلى صفحة تسجيل الدخول
    if (!userData && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';
    }
}

function generatePassword() {
    const length = 8;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const underscore = '_';  // Only using underscore as a special character
    
    let allChars = uppercase + lowercase + numbers + underscore;
    let password;
    
    do {
        password = '';
        
        // Ensure at least one uppercase letter
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        
        // Ensure at least one lowercase letter
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        
        // Ensure at least one number
        password += numbers[Math.floor(Math.random() * numbers.length)];
        
        // Ensure one underscore
        password += underscore;
        
        // Fill the rest randomly
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Shuffle the characters
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
    } while (usedPasswords.has(password));
    
    // تخزين كلمة المرور الجديدة
    usedPasswords.add(password);
    
    // عرض كلمة المرور في حقل الإدخال
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.value = password;
    
    // تحديث أيقونة العين لتتوافق مع حالة العرض
    const toggleBtn = document.querySelector('.toggle-password i');
    passwordInput.type = 'text';
    toggleBtn.className = 'fas fa-eye-slash';
    
    // إخفاء كلمة المرور بعد ثانيتين
    setTimeout(() => {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }, 2000);
}

// إضافة دالة جديدة لتبديل إظهار/إخفاء كلمة المرور
function togglePassword() {
    const passwordInput = document.getElementById('passwordInput');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // تحديث أيقونة الثيم
    const themeIcon = document.querySelector('.theme-btn i');
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// إضافة كود للتحقق من الثيم المحفوظ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || '';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // تحديث أيقونة الثيم
    const themeIcon = document.querySelector('.theme-btn i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});
