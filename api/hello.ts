import { VercelRequest, VercelResponse } from "@vercel/node";
import { checkAuth } from "./auth/auth";
import { OK, PING } from "./constants/constants";
import { isInteractiveBody } from "./types/types";

export default (request: VercelRequest, response: VercelResponse) => {
  const PUBLIC_KEY = process.env.PUBLIC_KEY;

  if (checkAuth(request, response, PUBLIC_KEY) !== OK) {
    return;
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const body = request.body;

  if (!isInteractiveBody(body)) {
    return response.status(400);
  }

  if (body.type === PING) {
    return response.status(200).send({ type: PING });
  }

  response.status(400).send("Unknown command");
};
