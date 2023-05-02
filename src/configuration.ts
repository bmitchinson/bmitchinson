import 'dotenv/config';
import * as env from 'env-var';

export const NOTION_API_KEY = env.get('NOTION_API_KEY').required().asString();
export const PAGE_ID = 'd2e7873bf5f3417eb00746829f98ae40';
