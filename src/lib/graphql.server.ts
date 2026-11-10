import { GraphQLClient } from 'graphql-request'

let client: GraphQLClient | undefined

/** Shared Hygraph client. Server-only: GRAPH_CMS_URL never reaches the browser bundle. */
export const getClient = () => {
	if (client) return client
	const url = process.env.GRAPH_CMS_URL
	if (!url) throw new Error('GRAPH_CMS_URL is not set')
	client = new GraphQLClient(url)
	return client
}

export default getClient
