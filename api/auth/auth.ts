import { VercelRequest } from "@vercel/node";
import nacl from 'tweetnacl';

export const isVerified = (request: VercelRequest, publicKey: string) => {
  const body = request.body;
  const signature = request.headers['X-Signature-Ed25519'] as string;
  const timestamp = request.headers['X-Signature-Timestamp'] as string;

  return nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(publicKey, 'hex')
  );
}
