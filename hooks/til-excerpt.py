import re

# Define the pattern to match "## how i learned" in the markdown
how_i_learned_pattern = re.compile(r"(## how i learned)", re.IGNORECASE)

def on_page_markdown(markdown, **kwargs):
    # Search for the "## how i learned" section
    match = how_i_learned_pattern.search(markdown)
    if match:
        # Insert "<!-- more -->" before the matched section
        markdown = markdown[:match.start()] + "\n<!-- more -->\n" + markdown[match.start():]
    
    return markdown
