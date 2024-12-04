def on_page_content(html, page, config, files):
    bsky_post_uri = page.meta.get('bsky_post_uri')
    if bsky_post_uri:
        # Inject a placeholder div with a data attribute
        placeholder_div = f'<div id="bluesky-comments" data-bsky-post-uri="{bsky_post_uri}" style="margin-top: 20px;">Loading comments...</div>'
        html = html.replace("</main>", f"{placeholder_div}</main>")
    return html
