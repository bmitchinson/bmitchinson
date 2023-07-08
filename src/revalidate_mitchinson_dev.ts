import { HOME_DOMAIN } from './configuration';
import axios from 'axios';

const revalidateMitchinsonDev = async () => {
    const requestURL = `${HOME_DOMAIN}/api/revalidate?revalidate_pass=${encodeURIComponent(
        process.env.REVALIDATE_PASS,
    )}`;

    console.log('⌛️ Reaching out to', HOME_DOMAIN);

    axios
        .get(requestURL)
        .then((res) => {
            console.log('✅ Revalidated:', res.data);
        })
        .catch((err) => {
            console.log('❌ Error revalidating:', err?.response?.data);
            process.exit(1);
        });
};

revalidateMitchinsonDev();
