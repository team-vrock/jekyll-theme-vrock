document.addEventListener('DOMContentLoaded', () => {
    const config = window.VrockSearchConfig;
    const searchBox = document.getElementById('search-searchbar');
    const hitsContainer = document.getElementById('search-hits');
    const refinementContainer = document.getElementById('refinement-list');
    const poweredByContainer = document.getElementById('powered-by');

    if (!config || !searchBox || !hitsContainer) return;

    let activeTag = null;
    let latestQuery = '';
    let requestTimer = null;

    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'vrock-search-input';
    input.placeholder = 'Search posts...';
    input.setAttribute('aria-label', 'Search posts');
    searchBox.appendChild(input);

    if (poweredByContainer && config.poweredBy) {
        poweredByContainer.innerHTML = '<a href="https://www.algolia.com/" rel="noopener" target="_blank">Search by Algolia</a>';
    }

    const escapeHtml = (value) => String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const renderHits = (hits) => {
        if (!hits || hits.length === 0) {
            hitsContainer.innerHTML = '<div class="empty-state"><p>No posts found.</p></div>';
            return;
        }

        hitsContainer.innerHTML = hits.map((hit) => {
            const title = hit._highlightResult && hit._highlightResult.title ? hit._highlightResult.title.value : escapeHtml(hit.title);
            const content = hit._highlightResult && hit._highlightResult.content ? hit._highlightResult.content.value : escapeHtml(hit.desc || hit.content || '');
            const image = hit.image ? `<div class="images-left"><img alt="" src="${escapeHtml(hit.image)}" /></div>` : '';
            return `
                <article class="user-projects post-card">
                    ${image}
                    <div class="contents-right">
                        <h3>${title}</h3>
                        <p>${content}</p>
                        <a class="project-link" href="${escapeHtml(hit.url)}">Read post</a>
                    </div>
                </article>
            `;
        }).join('');
    };

    const renderFacets = (facets) => {
        if (!refinementContainer || !facets || !facets.tags) return;

        const tags = Object.entries(facets.tags).sort((a, b) => b[1] - a[1]).slice(0, 12);
        refinementContainer.innerHTML = tags.map(([tag, count]) => {
            const selected = activeTag === tag ? ' tags-link-selected' : '';
            return `<button class="tags-link${selected}" type="button" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)} <span class="tags-number">${count}</span></button>`;
        }).join('');
    };

    const search = () => {
        const body = {
            query: latestQuery,
            hitsPerPage: 8,
            facets: ['tags']
        };

        if (activeTag) {
            body.facetFilters = [[`tags:${activeTag}`]];
        }

        fetch(`https://${config.applicationId}-dsn.algolia.net/1/indexes/${encodeURIComponent(config.indexName)}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Algolia-Application-Id': config.applicationId,
                'X-Algolia-API-Key': config.searchOnlyApiKey
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.ok ? response.json() : Promise.reject(response))
            .then((data) => {
                renderHits(data.hits || []);
                renderFacets(data.facets || {});
            })
            .catch(() => {
                hitsContainer.innerHTML = '<div class="empty-state"><p>Search is currently unavailable.</p></div>';
            });
    };

    input.addEventListener('input', () => {
        latestQuery = input.value;
        window.clearTimeout(requestTimer);
        requestTimer = window.setTimeout(search, 180);
    });

    if (refinementContainer) {
        refinementContainer.addEventListener('click', (event) => {
            const button = event.target.closest('[data-tag]');
            if (!button) return;
            const tag = button.getAttribute('data-tag');
            activeTag = activeTag === tag ? null : tag;
            search();
        });
    }

    search();
});
