import * as fs from 'fs';

const ghPrefixText = '### 📌 Current Projects';
const ghSuffixText = `</br></br>🌐 https://mitchinson.dev

💌 mitchinson.dev@gmail.com

🐦 [@115bwm](https://twitter.com/115bwm)`;

export const writeToReadme = (contents: string) => {
    const contentsToWrite =
        ghPrefixText + '\n' + contents + '\n' + ghSuffixText;

    const existingReadme = fs.readFileSync('../README.md', 'utf8');

    if (contentsToWrite === existingReadme) {
        console.log('✅ No changes to README.md, skipping write.');
        process.exit(0);
    }

    fs.writeFile('../README.md', contentsToWrite, (err) => {
        if (err) {
            console.log('❌ Error writing readme', err);
        } else {
            console.log('✅ Wrote to README.md');
        }
    });
};
