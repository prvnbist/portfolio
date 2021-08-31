import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.GRAPH_CMS_URL)

export default client
