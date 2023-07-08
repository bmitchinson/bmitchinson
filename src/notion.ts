import { Client } from '@notionhq/client';
import { parse, format, differenceInDays } from 'date-fns';
import { NotionToMarkdown } from 'notion-to-md';
import {
    NOTION_API_KEY,
    CURRENT_WORK_PAGE_ID,
    POSTS_DB,
    BLOG_DOMAIN,
} from './configuration';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

export interface post {
    title: string;
    slug: string;
    date: string;
}

export class Notion {
    private notionMarkdownClient: NotionToMarkdown;
    private notionClient: Client;

    constructor() {
        this.notionClient = new Client({ auth: NOTION_API_KEY });
        this.notionMarkdownClient = new NotionToMarkdown({
            notionClient: this.notionClient,
        });
    }

    async getCurrentWork() {
        const blocks = await this.notionMarkdownClient.pageToMarkdown(
            CURRENT_WORK_PAGE_ID,
        );
        const md = this.notionMarkdownClient.toMarkdownString(blocks);
        return md;
    }

    async getRecentPosts(): Promise<post[]> {
        const posts = await this.notionClient.databases.query(
            publishedPostsNotionQuery,
        );
        return posts.results
            .map((p: any) => {
                const postDate = parse(
                    p.properties.date.date.start,
                    'yyyy-MM-dd',
                    new Date(),
                );
                return {
                    title: p.properties.title.title[0].plain_text,
                    slug: `${BLOG_DOMAIN}/${p.properties.slug.rich_text[0].plain_text}`,
                    date: `${format(
                        postDate,
                        'MMMM do, yyyy',
                    )} (${differenceInDays(new Date(), postDate)} days ago)`,
                };
            })
            .slice(0, 5);
    }
}

const publishedPostsNotionQuery: QueryDatabaseParameters = {
    database_id: POSTS_DB,
    filter: {
        and: [
            {
                property: 'status',
                select: {
                    equals: 'Published',
                },
            },
            {
                property: 'type',
                select: {
                    equals: 'Post',
                },
            },
        ],
    },
    sorts: [
        {
            property: 'date',
            direction: 'descending',
        },
    ],
};
