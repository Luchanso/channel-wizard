import { VercelRequest, VercelResponse } from "@vercel/node";
import nacl from 'tweetnacl';
import { OK } from "../constants/constants";

export const checkAuth = (request: VercelRequest, response: VercelResponse, publicKey: string) => {
  const body = request.body;
  const signature = request.headers['X-Signature-Ed25519'] as string;
  const timestamp = request.headers['X-Signature-Timestamp'] as string;

  if (!signature || !timestamp) {
    return response.status(400).end();
  }

  if (!nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(publicKey, 'hex')
  )) {
    return response.status(401).end('invalid request signature');
  }

  return OK;
}
