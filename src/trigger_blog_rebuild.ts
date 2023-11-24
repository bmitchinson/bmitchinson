import { REBUILD_BLOG_HOOK_URL } from './configuration';
import axios from 'axios';
import { Notion } from './notion';
import { parseISO } from 'date-fns';
import state from '../state.json';
import * as fs from 'fs';

const occurredSinceLastCheck = (date: Date): boolean => {
    console.log('🕒 Last check:', state.lastSuccessfulCheck);
    return date > parseISO(state.lastSuccessfulCheck);
};

const updateLastSuccessfulCheckState = () => {
    const now = new Date();
    state.lastSuccessfulCheck = now.toISOString();
    fs.writeFileSync('state.json', JSON.stringify(state));
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
    if (occurredSinceLastCheck(recentEdit)) {
        console.log('✅ Recent edits, rebuilding blog.');
        rebuildBlog();
    } else {
        console.log('✅ No recent edits, skipping rebuild.');
    }
    updateLastSuccessfulCheckState();
});
