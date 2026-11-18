# Development journey: [campus escape] API

Student: [chiara sentino] · Section: [3-2] · Group: [group 6]

One entry per milestone, written the week you did it. Newest at the bottom.

## M1 · Accounts, passwords and tokens
- Dates worked: [Nov 17, 2026] · Time spent: [Approx. 5 hours]
- Goal: [Set up the Weeks 12–18 kit and prepare for M1 Accounts.]
- What I built: [Installed the kit and configured the account model and migration.]
- Evidence: [M1 pull request link pending] · d3f7a88 · [M1  commit hash]
- Problem I hit: [My existing migration defined password_hash as required and 255 characters, while the module specified a nullable 60-character field.]
- How I solved it: [I checked the migration status, then added and applied a follow-up migration to change the existing column.]
- Decision I made and why: [I kept the applied migration history and changed the column in a new migration. This adds one more migration to maintain.]
- Changes to my design set: [The password hash is now nullable and 60 characters; update the data dictionary/design documents to match.]
- What I would explain to a classmate: [The model tells the app about the table, The migration changes the actual table, they should describe the same thing]
- Ai tool/s used: [l used chatgpt to review the course materials, troubleshoot setup, draft code]

## M2 · The question bank

## M3 · Gameplay

## M4 · Automated tests and server preparation

## M5 · API documentation and deployment

## M6 · The SE1 portfolio and the release

## M7 · The Test Report
