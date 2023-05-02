import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NOTION_API_KEY, PAGE_ID } from './configuration';

export class CurrentWork {
    private client: NotionToMarkdown;

    constructor() {
        const c = new Client({ auth: NOTION_API_KEY });
        this.client = new NotionToMarkdown({ notionClient: c });
    }

    async get() {
        const blocks = await this.client.pageToMarkdown(PAGE_ID);
        const md = this.client.toMarkdownString(blocks);
        return md;
    }
}
