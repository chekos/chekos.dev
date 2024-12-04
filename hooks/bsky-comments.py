from textwrap import dedent


def on_page_markdown(markdown, **kwargs):
    page = kwargs["page"]
    bsky_post_uri = page.meta.get("bsky_post_uri")
    placeholder_div = "<div />"
    if bsky_post_uri:
        placeholder_div = f'<div id="bluesky-comments" class="admonition info" data-bsky-post-uri="{bsky_post_uri}" style="margin-top: 20px;">Loading comments...</div>'

    markdown = markdown + dedent(f"""

    {placeholder_div}
    """)

    return markdown
