document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (!toggleButton) return;

    const currentTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const setTheme = (theme) => {
        const icon = toggleButton.querySelector('i');
        document.documentElement.setAttribute('data-theme', theme);
        toggleButton.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        toggleButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        if (icon) {
            icon.classList.toggle('fa-sun', theme === 'dark');
            icon.classList.toggle('fa-moon', theme !== 'dark');
        }
    };

    if (currentTheme == 'dark') {
        setTheme('dark');
    } else if (currentTheme == 'light') {
        setTheme('light');
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    toggleButton.addEventListener('click', () => {
        document.documentElement.classList.add('theme-transition');
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
        window.setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 350);
    });
});
