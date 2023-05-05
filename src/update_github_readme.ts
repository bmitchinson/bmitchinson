import { Notion } from './notion';
import { writeToReadme } from './github';

const currentWork = new Notion();

const writeToGithub = async () => {
    const work = await currentWork.getCurrentWork();
    const recentPosts = await currentWork.getRecentPosts();
    writeToReadme(work, recentPosts);
};

writeToGithub();
