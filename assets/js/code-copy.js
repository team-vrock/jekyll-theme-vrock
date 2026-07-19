document.addEventListener('DOMContentLoaded', () => {
    const copyText = async (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    };

    document.querySelectorAll('.highlight').forEach((block) => {
        if (block.querySelector('.copy-code-button')) return;

        const code = block.querySelector('code');
        if (!code) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'copy-code-button';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');

        button.addEventListener('click', async () => {
            try {
                await copyText(code.textContent);
                button.textContent = 'Copied';
                button.classList.add('is-copied');
            } catch (error) {
                button.textContent = 'Failed';
                button.classList.add('has-error');
            }

            window.setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('is-copied', 'has-error');
            }, 1600);
        });

        block.appendChild(button);
    });
});
