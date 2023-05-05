import * as fs from 'fs';
import { post } from './notion';

const readmeFile = 'README.md';
const projectsPrefixText = '### 📌 Current Projects';
const recentPostPrefixText = '### 📝 Recent Posts';
const finalSuffixText = `🌐 https://mitchinson.dev

💌 mitchinson.dev@gmail.com

🐦 [@115bwm](https://twitter.com/115bwm)`;

const mapPostsToMarkdown = (posts: post[]) => {
    return posts.reduce((acc, post) => {
        return `${acc}\n- [${post.title}](${post.slug}) - ${post.date}`;
    }, '');
};

export const writeToReadme = (currentWork: string, recentPosts: post[]) => {
    const contentsToWrite =
        projectsPrefixText +
        '\n' +
        currentWork +
        '\n' +
        recentPostPrefixText +
        '\n' +
        mapPostsToMarkdown(recentPosts) +
        '\n\n' +
        finalSuffixText;

    const existingReadme = fs.readFileSync(readmeFile, 'utf8');

    if (contentsToWrite === existingReadme) {
        console.log('✅ No changes to README.md, skipping write.');
        process.exit(0);
    }

    fs.writeFile(readmeFile, contentsToWrite, (err) => {
        if (err) {
            console.log('❌ Error writing readme', err);
        } else {
            console.log('✅ Wrote to README.md');
        }
    });
};
