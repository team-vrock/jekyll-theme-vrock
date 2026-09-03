---
---
document.addEventListener('DOMContentLoaded', async () => {
    const searchBox = document.getElementById('search-searchbar');
    const results = document.getElementById('search-hits');
    if (!searchBox || !results) return;

    const PAGE_SIZE = 5;
    const loadMoreButton = document.getElementById('load-more-posts');
    const loadMoreWrap = loadMoreButton ? loadMoreButton.closest('.load-more-wrap') : null;
    let cards = Array.from(results.querySelectorAll('article.post-card'));
    let visibleCount = Math.min(PAGE_SIZE, cards.length);
    let originalResults = results.innerHTML;

    const syncLoadMore = () => {
        cards.forEach((card, index) => card.toggleAttribute('hidden', index >= visibleCount));
        if (loadMoreWrap) {
            loadMoreWrap.toggleAttribute('hidden', visibleCount >= cards.length);
        }
    };

    const focusFirstNew = (card) => {
        if (!card) return;
        card.setAttribute('tabindex', '-1');
        card.focus({ preventScroll: true });
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    syncLoadMore();
    originalResults = results.innerHTML;

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            const firstNew = cards[visibleCount];
            visibleCount = Math.min(visibleCount + PAGE_SIZE, cards.length);
            syncLoadMore();
            originalResults = results.innerHTML;
            focusFirstNew(firstNew);
        });
    }

    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'vrock-search-input';
    input.placeholder = 'Search posts...';
    input.setAttribute('aria-label', 'Search posts');
    searchBox.appendChild(input);

    let posts;
    try {
        const response = await fetch('{{ "/search.json" | relative_url }}');
        if (!response.ok) throw new Error('Search index unavailable');
        posts = await response.json();
    } catch (error) {
        return;
    }

    const escapeHtml = (value) => String(value || '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

    const renderPost = (post) => {
        const date = post.date ? new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        }) : '';
        const image = post.image
            ? `<div class="images-left"><img alt="" src="${escapeHtml(post.image)}"><p class="post-date">${date}</p></div>`
            : '';
        const noImageDate = post.image ? '<p class="post-date post-date-placeholder" aria-hidden="true"></p>' : `<p class="post-date">${date}</p>`;
        return `<article class="user-projects post-card${post.image ? '' : ' post-card-no-image'}">
            <h3 class="post-title">${escapeHtml(post.title)}</h3>
            ${image}
            <div class="contents-right">
                <p>${escapeHtml(post.desc)}</p>
                ${noImageDate}
                <a class="project-link" href="${escapeHtml(post.url)}">Read post</a>
            </div>
        </article>`;
    };

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        if (!query) {
            results.innerHTML = originalResults;
            cards = Array.from(results.querySelectorAll('article.post-card'));
            syncLoadMore();
            return;
        }
        if (loadMoreWrap) {
            loadMoreWrap.setAttribute('hidden', '');
        }
        const matches = posts.filter((post) => [post.title, post.desc, post.category, post.tags]
            .join(' ').toLowerCase().includes(query));
        results.innerHTML = matches.length ? matches.map(renderPost).join('') : '<div class="empty-state"><p>No posts found.</p></div>';
    });

    const postsLink = document.querySelector('.floating-menu a[aria-label="Posts"]');
    if (postsLink) {
        postsLink.addEventListener('click', () => {
            if (window.location.pathname === '{{ "/" | relative_url }}') {
                window.setTimeout(() => input.focus(), 250);
            }
        });
    }

    if (window.location.hash === '#searchlist' || new URLSearchParams(window.location.search).has('search')) {
        window.setTimeout(() => input.focus(), 250);
    }
});
