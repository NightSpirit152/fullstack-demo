import { writeFile } from 'node:fs/promises';

const endpoint = process.env.GRAPHQL_SCHEMA_URL ?? 'http://localhost:5000/graphql?sdl';

const response = await fetch(endpoint);

if (!response.ok) {
	throw new Error(`Failed to fetch GraphQL SDL from ${endpoint}: ${response.status} ${response.statusText}`);
}

const schema = await response.text();

await writeFile(new URL('../schema.graphql', import.meta.url), schema);

console.log(`GraphQL SDL schema saved to schema.graphql from ${endpoint}`);