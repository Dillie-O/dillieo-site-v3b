#!/usr/bin/env python3
"""
Script to organize blog posts into 5 categories:
- Development
- Growth  
- Projects
- Life
- Tips
"""

import os
import re
import shutil
from pathlib import Path

# Configuration
POSTS_DIR = Path("src/content/posts")
DEFAULT_DIR = POSTS_DIR / "Default"

# New categories
CATEGORIES = ["Development", "Growth", "Projects", "Life", "Tips"]

# Category mapping based on content analysis
def categorize_post(filename, content, tags):
    """Determine category based on filename, content, and tags"""
    filename_lower = filename.lower()
    content_lower = content.lower()
    tags_lower = [tag.lower() for tag in tags]
    
    # Development - technical tutorials, programming, tools, troubleshooting
    development_keywords = [
        'log4net', 'aspnet', 'coding', 'net', 'programming', 'tutorial',
        'visual-studio', 'postman', 'namespace', 'ftp', 'ssis', 'as400',
        'versioning', 'branch', 'source-control', 'configuration',
        'debugging', 'troubleshooting', 'api', 'environment'
    ]
    
    # Growth - personal development, career, philosophy, life lessons
    growth_keywords = [
        'mentoring', 'career', 'growth', 't-shaped', 'generalist', 'specialist',
        'chesterton', 'pensee', 'philosophy', 'quote', 'quotes', 'life',
        'resolutions', 'reflection', 'believe', 'faith', 'enough'
    ]
    
    # Projects - project showcases, retrospectives, hobbies, gaming
    projects_keywords = [
        'toolkit', 'deck-studio', 'netrep', 'ronin', 'ccg-toolkit',
        'postmortem', 'project', 'showcase', 'gaming', 'angband',
        'phatcodeshare', 'computers'
    ]
    
    # Life - family, fatherhood, personal stories, family moments
    life_keywords = [
        'family', 'fatherhood', 'daddy', 'daddy-tricks', 'birthday',
        'nacho-cheese', 'haylee', 'rylee', 'gratitude', 'memorial',
        'christmas', 'anniversary', 'personal'
    ]
    
    # Tips - quick tips, recipes, life hacks, short advice
    tips_keywords = [
        'quick-tip', 'tips', 'recipe', 'bacon', 'onion', 'butter',
        'rib-rub', 'grilling', 'juice-box', 'hydrat', 'short'
    ]
    
    # Check Development
    if (any(keyword in filename_lower for keyword in development_keywords) or
        any(keyword in content_lower for keyword in development_keywords) or
        any(tag in development_keywords for tag in tags_lower)):
        return "Development"
    
    # Check Growth
    if (any(keyword in filename_lower for keyword in growth_keywords) or
        any(keyword in content_lower for keyword in growth_keywords) or
        any(tag in growth_keywords for tag in tags_lower)):
        return "Growth"
    
    # Check Projects
    if (any(keyword in filename_lower for keyword in projects_keywords) or
        any(keyword in content_lower for keyword in projects_keywords) or
        any(tag in projects_keywords for tag in tags_lower)):
        return "Projects"
    
    # Check Life
    if (any(keyword in filename_lower for keyword in life_keywords) or
        any(keyword in content_lower for keyword in life_keywords) or
        any(tag in life_keywords for tag in tags_lower)):
        return "Life"
    
    # Check Tips
    if (any(keyword in filename_lower for keyword in tips_keywords) or
        any(keyword in content_lower for keyword in tips_keywords) or
        any(tag in tips_keywords for tag in tags_lower)):
        return "Tips"
    
    # Default to Development if unsure
    return "Development"

def extract_frontmatter(content):
    """Extract frontmatter from markdown content"""
    lines = content.split('\n')
    frontmatter_start = -1
    frontmatter_end = -1
    
    for i, line in enumerate(lines):
        if line.strip() == '---':
            if frontmatter_start == -1:
                frontmatter_start = i
            else:
                frontmatter_end = i
                break
    
    if frontmatter_start != -1 and frontmatter_end != -1:
        frontmatter_lines = lines[frontmatter_start + 1:frontmatter_end]
        frontmatter_text = '\n'.join(frontmatter_lines)
        content_without_frontmatter = '\n'.join(lines[frontmatter_end + 1:])
        return frontmatter_text, content_without_frontmatter, frontmatter_start, frontmatter_end
    
    return "", content, -1, -1

def update_frontmatter(frontmatter_text, new_category):
    """Update category in frontmatter"""
    lines = frontmatter_text.split('\n')
    updated_lines = []
    
    for line in lines:
        if line.strip().startswith('category:'):
            updated_lines.append(f'category: {new_category}')
        else:
            updated_lines.append(line)
    
    return '\n'.join(updated_lines)

def main():
    """Main script function"""
    print("Starting post organization...")
    
    # Create category directories
    for category in CATEGORIES:
        category_dir = POSTS_DIR / category
        category_dir.mkdir(exist_ok=True)
        print(f"Created directory: {category_dir}")
    
    # Process files in Default directory
    if not DEFAULT_DIR.exists():
        print(f"Error: {DEFAULT_DIR} does not exist")
        return
    
    moved_count = 0
    skipped_count = 0
    
    for file_path in DEFAULT_DIR.iterdir():
        if not file_path.is_file() or not file_path.suffix == '.md':
            continue
        
        filename = file_path.name
        
        # Skip files that don't start with numbers
        if not re.match(r'^\d+', filename):
            print(f"Skipping {filename} (doesn't start with number)")
            skipped_count += 1
            continue
        
        # Skip special files
        if filename in ['draft.md', 'index.md']:
            print(f"Skipping {filename} (special file)")
            skipped_count += 1
            continue
        
        print(f"\nProcessing {filename}...")
        
        # Read file content
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {filename}: {e}")
            continue
        
        # Extract frontmatter
        frontmatter_text, content_without_frontmatter, start, end = extract_frontmatter(content)
        
        # Extract tags
        tags = []
        for line in frontmatter_text.split('\n'):
            if line.strip().startswith('tags:'):
                tags_str = line.replace('tags:', '').strip()
                # Simple tag extraction
                tags = [tag.strip(' []"\'') for tag in tags_str.split(',') if tag.strip()]
                break
        
        # Determine category
        category = categorize_post(filename, content, tags)
        print(f"  Category: {category}")
        
        # Update frontmatter
        updated_frontmatter = update_frontmatter(frontmatter_text, category)
        
        # Reconstruct file content
        if start != -1 and end != -1:
            lines = content.split('\n')
            updated_content = (
                '\n'.join(lines[:start + 1]) + '\n' +
                updated_frontmatter + '\n' +
                '\n'.join(lines[end:]) + '\n' +
                content_without_frontmatter
            )
        else:
            updated_content = f"---\ncategory: {category}\n---\n\n{content}"
        
        # Write to new location
        target_path = POSTS_DIR / category / filename
        try:
            with open(target_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            # Remove original file
            file_path.unlink()
            
            print(f"  Moved to: {target_path}")
            moved_count += 1
            
        except Exception as e:
            print(f"Error moving {filename}: {e}")
    
    print(f"\nOrganization complete!")
    print(f"Files moved: {moved_count}")
    print(f"Files skipped: {skipped_count}")

if __name__ == "__main__":
    main()
