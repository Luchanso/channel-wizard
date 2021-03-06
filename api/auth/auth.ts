import { VercelRequest, VercelResponse } from "@vercel/node";
import nacl from 'tweetnacl';
import { OK } from "../constants/constants";

export const checkAuth = (request: VercelRequest, response: VercelResponse, publicKey: string) => {
  const body = JSON.stringify(request.body);
  const signature = request.headers['x-signature-ed25519'] as string;
  const timestamp = request.headers['x-signature-timestamp'] as string;

  if (!signature || !timestamp) {
    console.log('checkAuth not found headers - 400');
    return response.status(400).end();
  }

  if (!nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(publicKey, 'hex')
  )) {
    console.log('checkAuth invalid request signature - 401');
    return response.status(401).end('invalid request signature');
  }

  return OK;
}
