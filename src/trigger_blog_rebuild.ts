import { REBUILD_BLOG_HOOK_URL } from './configuration';
import axios from 'axios';
import { Notion } from './notion';
import { subHours } from 'date-fns';

const occurredWithinLastHour = (date: Date): boolean => {
    const hourAgo = subHours(new Date(), 1);
    return date > hourAgo;
};

const rebuildBlog = async () => {
    console.log('⌛️ Calling blog rebuild');

    axios
        .get(REBUILD_BLOG_HOOK_URL)
        .then((res) => {
            console.log('✅ Blog Rebuild Request:', res.data);
        })
        .catch((err) => {
            console.log('❌ Error Rebuilding Blog:', err?.response?.data);
            process.exit(1);
        });
};

const notion = new Notion();

notion.getMostRecentEdit().then((recentEdit) => {
    console.log('🕒 Last edit:', recentEdit);
    if (occurredWithinLastHour(recentEdit)) {
        console.log('✅ Recent edits, rebuilding blog.');
        rebuildBlog();
    } else {
        console.log('✅ No recent edits, skipping rebuild.');
    }
});
