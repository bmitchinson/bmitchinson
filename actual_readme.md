This repo exists to pull from notion, as a source of truth that's easy to edit,
to reflect what I'm working on at the moment.

This repo runs a node script every hour that pulls from Notion, and populates the
`README.md` file here. The notion page it sources from is just 2-4 bullet points
of markdown, and the end result README.md populates the following:

-   https://mitchinson.dev
-   `curl mitchinson.dev`
-   `npx mitchinson`
-   My profile at https://github.com/bmitchinson

Initial typescript configuration from [my ts starter repo](https://github.com/bmitchinson/typescript-node-starter)
