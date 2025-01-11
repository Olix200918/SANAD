// التحقق من تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('sanadUserData'));
    
    // إذا لم يكن المستخدم مسجل الدخول، أعده إلى صفحة تسجيل الدخول
    if (!userData) {
        window.location.href = 'index.html';
        return;
    }
    
    // عرض اسم المستخدم
    document.getElementById('username').textContent = userData.username;
    
    // استعادة الثيم المحفوظ
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const categoryCards = document.querySelectorAll('.category-main');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const subOptions = document.querySelectorAll(`.${category}-option`);
            
            // إخفاء جميع الخيارات الفرعية أولاً
            document.querySelectorAll('.sub-option').forEach(opt => {
                opt.classList.add('hidden');
            });
            
            // إزالة التأثير النشط من جميع الفئات
            document.querySelectorAll('.category-main').forEach(cat => {
                cat.classList.remove('active-category');
            });
            
            // إظهار الخيارات الفرعية للفئة المحددة
            subOptions.forEach(opt => {
                opt.classList.remove('hidden');
            });
            
            // إضهار زر الإغلاق
            closeMenuBtn.classList.remove('hidden');
            
            // إضافة التأثير النشط للفئة المحددة
            this.classList.add('active-category');
        });
    });

    // إضافة وظيفة زر الإغلاق
    closeMenuBtn.addEventListener('click', function() {
        // إخفاء جميع الخيارات الفرعية
        document.querySelectorAll('.sub-option').forEach(opt => {
            opt.classList.add('hidden');
        });
        
        // إزالة التأثير النشط من جميع الفئات
        document.querySelectorAll('.category-main').forEach(cat => {
            cat.classList.remove('active-category');
        });
        
        // إخفاء زر الإغلاق
        this.classList.add('hidden');
    });
});

// دالة تبديل الثيم
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
}

// تحديث أيقونة الثيم
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-btn i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem('sanadUserData');
    window.location.href = 'index.html';
}
