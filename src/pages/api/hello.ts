import { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';
import stream from 'stream';

export default async function hello(_req: NextApiRequest, res: NextApiResponse) {
  const fileData = 'aowoakpwapwplaplwplaplwpalpwlpalw';
  const pipeline = promisify(stream.pipeline);

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Content-Disposition', 'attachment; filename=encrypted.txt')
  await pipeline(fileData, res);
}