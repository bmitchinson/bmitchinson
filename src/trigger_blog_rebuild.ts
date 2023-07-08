import { REBUILD_BLOG_HOOK_URL } from './configuration';
import axios from 'axios';

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

rebuildBlog();
