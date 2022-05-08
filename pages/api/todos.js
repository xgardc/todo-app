import { getTodos } from "../../firebase";

export default async function handler(req, res) {
  res.json(await getTodos());
}
