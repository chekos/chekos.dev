# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a MkDocs Material blog site built with Python. Use these commands for development:

- **Install dependencies**: `uv sync` or `pip install -r requirements.txt`
- **Serve locally**: `mkdocs serve` (serves at http://127.0.0.1:8000)
- **Build site**: `mkdocs build`
- **Deploy**: `mkdocs gh-deploy` (deploys to GitHub Pages)

Python dependencies are managed with `uv` (preferred) or traditional pip with `requirements.txt`.

## Architecture

This is a personal blog site using MkDocs Material with custom functionality:

### Directory Structure
- `blog/` - Contains all content (posts, assets, styles, scripts)
  - `posts/` - Blog posts organized by year and TIL (Today I Learned) categories
  - `js/` - Custom JavaScript (primarily Bluesky comments integration)
  - `stylesheets/` - Custom CSS for enhanced styling
  - `assets/` - Images and icons
- `hooks/` - Python hooks that extend MkDocs functionality during build
- `scripts/` - Utility scripts for content management

### Key Features

**Bluesky Comments Integration**: 
- Posts can include Bluesky comment threads by adding `bsky_post_uri` to post metadata
- `hooks/bsky-comments.py` injects comment placeholders during build
- `blog/js/bsky-comments.js` fetches and renders comments from Bluesky API
- Comments are sorted by likes and support nested threading with pagination

**Social Media Integration**:
- `hooks/socialmedia.py` automatically adds share buttons (Twitter, Facebook, Bluesky) to blog posts
- Only applied to posts with numeric URLs (blog posts, not pages)

**TIL Integration**:
- `hooks/til-excerpt.py` handles Today I Learned post processing
- TIL posts are organized in `blog/posts/til/`

### Configuration

- `mkdocs.yml` - Main site configuration with Material theme, plugins, and custom hooks
- `pyproject.toml` - Python project configuration for uv dependency management
- Site uses Material theme with pink color scheme and auto/light/dark mode support
- RSS plugin enabled for blog posts with git disabled
- Social plugin generates social media cards

### Content Management

Blog posts are written in Markdown and stored in `blog/posts/`. The site supports:
- Categorization and tagging
- Archive by date
- Search in English and Spanish
- Code syntax highlighting
- Admonitions and other Material extensions

When working with blog content, ensure post metadata includes proper `date` field and optional `bsky_post_uri` for comment integration.