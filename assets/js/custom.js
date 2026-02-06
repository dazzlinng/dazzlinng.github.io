document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".greedy-nav .visible-links a");

    if (sections.length === 0 || navLinks.length === 0) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.parentElement.classList.remove("active");
                    if (link.getAttribute("href").includes(id)) {
                        link.parentElement.classList.add("active");
                    }
                });
            }
        });
    }, {
        rootMargin: "-50% 0px -50% 0px"
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function() {
        setTimeout(function() {
            const $nav = jQuery('#site-nav');
            const $vlinks = $nav.find('.visible-links');
            const $hlinks = $nav.find('.hidden-links');
            const $btn = $nav.find('button');

            $hlinks.children().appendTo($vlinks);
            $btn.addClass('hidden');

            jQuery(window).off('resize', jQuery.fnGreedyNavUpdate);
        }, 100);
    });
}
