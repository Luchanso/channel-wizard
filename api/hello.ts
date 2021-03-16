import { VercelRequest, VercelResponse } from "@vercel/node";
import { checkAuth } from "./auth/auth";
import { OK, PING } from "./constants/constants";
import { isInteractiveBody } from "./types/types";

export default (request: VercelRequest, response: VercelResponse) => {
  const PUBLIC_KEY = process.env.PUBLIC_KEY;

  const temp = JSON.stringify(request.body);
  console.log(temp);

  let test: any = [];
  request.on('data', (chunk) => {
    test.push(chunk);
  }).on('end', () => {
    test = Buffer.concat(test).toString();
    console.log(test);
    console.log(test === temp);
    response.status(400).send("Unknown command");
    // at this point, `body` has the entire request body stored in it as a string
  });


  // if (checkAuth(request, response, PUBLIC_KEY) !== OK) {
  //   return;
  // }

  // const BOT_TOKEN = process.env.BOT_TOKEN;
  // const body = request.body;

  // console.log('-'.repeat(50));
  // console.log(body);

  // if (!isInteractiveBody(body)) {
  //   console.log('isInteractiveBody false - 400 error');
  //   return response.status(400);
  // }

  // if (body.type === PING) {
  //   console.log('BODY ping - 200');
  //   return response.status(200).send({ type: PING });
  // }

  // console.log('Unknown command - 400 error');
  // response.status(400).send("Unknown command");
};
