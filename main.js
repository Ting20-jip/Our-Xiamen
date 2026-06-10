document.addEventListener('DOMContentLoaded', function () {

    // --- 移动端菜单切换 ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            // 动画效果：按钮变为X形
            const spans = menuBtn.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // 点击导航链接后关闭菜单
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    const spans = menuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // --- 窗口大小变化时重置菜单 ---
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove('active');
            if (menuBtn) {
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // --- 滚动时导航阴影加深 ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            }
        });
    }

    // --- 卡片入场动画（简单的渐显效果） ---
    const cards = document.querySelectorAll('.feature-card, .attraction-item, .collection-item, .category-item');
    if (cards.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
        );

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    } else if (cards.length > 0) {
        // 降级处理：直接显示
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

});

(function() {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cute-cursor-dot';
    document.body.appendChild(cursorDot);
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px)`;
    });
    document.addEventListener('click', (e) => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = ['❤️','🌸','✨','🐚','🎵','🍃'][Math.floor(Math.random() * 6)];
        heart.style.left = e.clientX - 12 + 'px';
        heart.style.top = e.clientY - 12 + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    });
    // 给所有按钮增加可爱波纹感
    const btns = document.querySelectorAll('.btn, .feature-card');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            btn.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // 海浪鼠标跟随效果
    (function() {
        // 隐藏默认鼠标
        document.body.style.cursor = 'none';

        // 创建跟随元素
        const waveCursor = document.createElement('div');
        waveCursor.innerHTML = '🌊';
        waveCursor.style.position = 'fixed';
        waveCursor.style.pointerEvents = 'none';
        waveCursor.style.fontSize = '32px';
        waveCursor.style.zIndex = '99999';
        waveCursor.style.filter = 'drop-shadow(0 0 4px rgba(0,0,0,0.2))';
        waveCursor.style.transition = 'transform 0.08s ease';
        document.body.appendChild(waveCursor);

        // 鼠标移动时更新位置
        document.addEventListener('mousemove', (e) => {
            waveCursor.style.left = (e.clientX - 16) + 'px';
            waveCursor.style.top = (e.clientY - 16) + 'px';
        });

        // 点击时让海浪摇晃一下（更生动）
        document.addEventListener('click', () => {
            waveCursor.style.transform = 'scale(1.3) rotate(20deg)';
            setTimeout(() => {
                waveCursor.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
        });
    })();
})();