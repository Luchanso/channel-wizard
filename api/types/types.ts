import { PING } from "../constants/constants";

export type InteractionType = typeof PING;

export type User = {
  avatar: string;
  discriminator: string;
  id: string;
  public_flags: number;
  username: string;
};

export type InteractiveBody = {
  application_id: string;
  id: string;
  token: string;
  type: InteractionType;
  user: User;
  version: number;
};

export function isInteractiveBody(
  body: any | undefined
): body is InteractiveBody {
  if (
    body &&
    body.application_id &&
    body.id &&
    body.token &&
    body.version &&
    body.user
  ) {
    return true;
  }

  return false;
}
