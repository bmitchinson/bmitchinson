import { CurrentWork } from './notion';
import { writeToReadme } from './github';

const currentWork = new CurrentWork();

const writeToGithub = async () => {
    const work = await currentWork.get();
    writeToReadme(work);
};

writeToGithub();
