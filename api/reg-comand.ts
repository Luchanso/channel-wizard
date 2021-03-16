import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async (request: VercelRequest, response: VercelResponse) => {
  const URL = `https://discord.com/api/v8/applications/821319584325173258/guilds/821308055890690048/commands`;
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const data = {
    name: "blep",
    description: "Send a random adorable animal photo",
    options: [
      {
        name: "animal",
        description: "The type of animal",
        type: 3,
        required: true,
        choices: [
          {
            name: "Dog",
            value: "animal_dog",
          },
          {
            name: "Cat",
            value: "animal_cat",
          },
          {
            name: "Penguin",
            value: "animal_penguin",
          },
        ],
      },
      {
        name: "only_smol",
        description: "Whether to show only baby animals",
        type: 5,
        required: false,
      },
    ],
  };

  await fetch(URL, {
    method: 'post',
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  response.status(200).send("OK");
};
