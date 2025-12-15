document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.createElement('button');
    toggleButton.innerText = '🌓';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.zIndex = '1000';
    toggleButton.style.padding = '10px';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.border = 'none';
    toggleButton.style.backgroundColor = 'var(--main-color)';
    toggleButton.style.color = 'var(--bg-color)';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.fontSize = '20px';
    toggleButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    toggleButton.id = 'dark-mode-toggle';
    
    document.body.appendChild(toggleButton);

    const currentTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (currentTheme == 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (currentTheme == 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    toggleButton.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});