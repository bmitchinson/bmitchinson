import 'dotenv/config';
import * as env from 'env-var';

export const NOTION_API_KEY = env.get('NOTION_API_KEY').required().asString();
export const PAGE_ID = 'd2e7873bf5f3417eb00746829f98ae40';
export const POSTS_DB = '9315f6e9736747a48431a5a3eb326c28';

// slugs for recent posts will be appended to:
export const BLOG_DOMAIN = 'https://blog.mitchinson.dev/';
