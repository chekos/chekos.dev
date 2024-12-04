from textwrap import dedent
import urllib.parse
import re

x_intent = "https://twitter.com/intent/tweet"
fb_sharer = "https://www.facebook.com/sharer/sharer.php"
bsky_intent = "https://bsky.app/intent/compose"
include = re.compile(r"[1-9].*")


def on_page_markdown(markdown, **kwargs):
    page = kwargs["page"]
    config = kwargs["config"]
    if not include.match(page.url):
        return markdown

    page_url = config.site_url + page.url
    page_title = urllib.parse.quote(page.title + "\n")
    bsky_post_uri = page.meta.get("bsky_post_uri")
    placeholder_div = "<div />"
    if bsky_post_uri: 
        placeholder_div = f'<div id="bluesky-comments" data-bsky-post-uri="{bsky_post_uri}" style="margin-top: 20px;">Loading comments...</div>'
    return markdown + dedent(f"""
    
    [Share on :simple-bluesky:]({bsky_intent}?text={page_title}{page_url}){{ .md-button }}
    [Share on :simple-x:]({x_intent}?text={page_title}&url={page_url}){{ .md-button }}
    [Share on :simple-facebook:]({fb_sharer}?u={page_url}){{ .md-button }}

    {placeholder_div}
    """)
