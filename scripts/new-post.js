import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const POSTS_DIR = './src/content/posts';

// Helper to get today's date in YYYY-MM-DD
function getToday() {
  return new Date().toISOString().split('T')[0];
}

// Helper to slugify title
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start
    .replace(/-+$/, '');      // Trim - from end
}

// Helper to ask questions
function ask(question, defaultVal) {
  return new Promise((resolve) => {
    rl.question(`${question} ${defaultVal ? `(${defaultVal}) ` : ''}`, (answer) => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

async function main() {
  console.log('📝 Create a new blog post\n');

  // 1. Title
  const title = await ask('Post Title:', '');
  if (!title) {
    console.error('❌ Title is required.');
    rl.close();
    process.exit(1);
  }

  // 2. Date
  const today = getToday();
  const date = await ask('Date:', today);

  // 3. Category
  // Detect existing categories
  const categories = fs.readdirSync(POSTS_DIR).filter(f => fs.statSync(path.join(POSTS_DIR, f)).isDirectory());
  console.log(`\nAvailable Categories: ${categories.join(', ')}`);

  let category = await ask('Category:', 'Life');

  // 4. Generate details
  const slug = slugify(title);
  const filename = `${date}-${slug}.md`;
  const categoryDir = path.join(POSTS_DIR, category);
  const fullPath = path.join(categoryDir, filename);

  // Ensure category directory exists
  if (!fs.existsSync(categoryDir)) {
    console.log(`\nCreating new category directory: ${category}`);
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  // Check if file exists
  if (fs.existsSync(fullPath)) {
    console.error(`\n❌ Error: File already exists at ${fullPath}`);
    rl.close();
    process.exit(1);
  }

  // 5. Create content
  const content = `---
title: ${title}
published: ${date}
description: ''
image: ''
imageAlt: ${title}
imageCredit: ''
imageCreditUrl: '' 
category: ${category}
tags: []
draft: true
---

Write your content here...
`;

  fs.writeFileSync(fullPath, content);

  console.log(`\n✅ Post created successfully!`);
  console.log(`   Path: ${fullPath}`);

  rl.close();
}

main();