import { VercelRequest, VercelResponse } from "@vercel/node";

export default (request: VercelRequest, response: VercelResponse) => {
  const data = JSON.stringify({
    body: request.body,
    query: request.query
  }, null, 2);

  console.log(data);

  response.status(200).send(JSON.stringify(data, null, 2));
};
