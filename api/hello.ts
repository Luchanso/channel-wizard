import { VercelRequest, VercelResponse } from "@vercel/node";

export default (request: VercelRequest, response: VercelResponse) => {
  const result = {
    body: request.body,
    query: request.query
  }
  response.status(200).send(JSON.stringify(result, null, 2));
};
