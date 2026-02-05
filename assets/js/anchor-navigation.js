// 锚点导航增强脚本
// 确保点击导航链接后，标题完全显示在导航栏下方

(function() {
  'use strict';

  // 等待 DOM 加载完成
  function initAnchorNavigation() {
    // 获取所有固定头部的高度
    function getTotalHeaderOffset() {
      let offset = 20; // 基础间距，确保标题下方有留白

      // 只检查自定义页面导航栏高度（masthead 已被隐藏）
      const pageNav = document.querySelector('.page-navigation');
      if (pageNav) {
        offset += pageNav.offsetHeight;
      }

      return offset;
    }

    // 平滑滚动到目标元素
    function smoothScrollTo(targetId) {
      const target = document.querySelector(targetId);

      if (!target) {
        console.warn('目标元素不存在:', targetId);
        return;
      }

      const headerOffset = getTotalHeaderOffset();
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // 使用平滑滚动
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // 滚动完成后，给目标元素添加高亮效果
      setTimeout(() => {
        target.classList.add('anchor-highlight');
        setTimeout(() => {
          target.classList.remove('anchor-highlight');
        }, 1500);
      }, 500);
    }

    // 为所有导航链接添加点击事件
    function setupNavigationLinks() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');

          // 忽略空的锚点
          if (targetId === '#' || targetId === '') {
            return;
          }

          smoothScrollTo(targetId);
        });
      });
    }

    // 更新导航激活状态
    function updateActiveNavigation() {
      const sections = document.querySelectorAll('[id]');
      const navLinks = document.querySelectorAll('.page-navigation__link');
      const headerOffset = getTotalHeaderOffset();
      const scrollPos = window.scrollY + headerOffset + 50;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.page-navigation__link[href="#${id}"]`);

        if (correspondingLink && scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      });
    }

    // 初始化
    setupNavigationLinks();

    // 监听滚动事件（带节流）
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateActiveNavigation();
          ticking = false;
        });
        ticking = true;
      }
    });

    // 窗口大小改变时重新计算
    window.addEventListener('resize', function() {
      updateActiveNavigation();
    });

    // 初始更新
    setTimeout(updateActiveNavigation, 100);
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnchorNavigation);
  } else {
    initAnchorNavigation();
  }
})();
