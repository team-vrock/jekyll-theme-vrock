# VROCK Jekyll Theme

![](./screen.png)

VROCK is a corporate-clean Jekyll theme for technical teams that want to publish posts and showcase selected engineering work on GitHub Pages.

The theme keeps the original full-screen hero visual identity and adds modernized layouts, configurable navigation/social links, post search, pinned project cards, dark mode, and GA4 consent handling.

## Usage

```yml
remote_theme: team-vrock/jekyll-theme-vrock@feat/refresh-modern

plugins:
  - jekyll-remote-theme
```

## Configuration

```yml
title: TEAM VROCK
username: TEAM VROCK
user_title: Technical posts, projects, and engineering notes
user_description: "TEAM VROCK publishes practical notes about cloud, DevOps, and engineering work."

primary_cta:
  label: Read posts
  url: "#searchlist"
secondary_cta:
  label: View projects
  url: "#projects"

social_links:
  - label: LinkedIn
    url: "https://www.linkedin.com/company/vrock"
    icon: linkedin
  - label: GitHub
    url: "https://github.com/team-vrock"
    icon: github

github_projects:
  organization: team-vrock
  pinned_repositories:
    - jekyll-theme-vrock
    - team-vrock.github.io
```

If `_data/github_projects.yml` exists, the theme renders those enriched repository records. Otherwise it falls back to links generated from `github_projects.organization` and `github_projects.pinned_repositories`.

Expected project data shape:

```yml
- name: jekyll-theme-vrock
  description: Corporate-clean Jekyll theme for technical teams.
  language: Ruby
  html_url: https://github.com/team-vrock/jekyll-theme-vrock
  image: /assets/img/projects/jekyll-theme-vrock.png
  image_alt: jekyll-theme-vrock preview
```

## Search

Algolia search is optional and targets posts only. Configure it when your index is maintained separately:

```yml
algolia:
  application_id: "..."
  index_name: "..."
  search_only_api_key: "..."
  powered_by: true
```

## Analytics

GA4 loads only after cookie consent:

```yml
google-analytics:
  id: "G-XXXXXXXXXX"
```

## Development

```sh
bundle install
bundle exec jekyll build
bundle exec jekyll serve
```

## Questions

## License

This theme is free and open source software, distributed under the The MIT License. So feel free to use this Jekyll theme anyway you want.

## Credits

This theme was partially designed with the inspiration from these fine folks
- [Nathan Randecker](https://github.com/nrandecker/particle)
