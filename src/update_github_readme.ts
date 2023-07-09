import { Notion } from './notion';
import { writeToReadme } from './github';

const notion = new Notion();

const writeToGithub = async () => {
    const work = await notion.getCurrentWork();
    const recentPosts = await notion.getRecentPosts();
    writeToReadme(work, recentPosts);
};

writeToGithub();
