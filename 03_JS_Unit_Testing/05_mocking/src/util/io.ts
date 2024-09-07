import path from "path";
import { promises as fs } from "fs";

export default function writeData(data: string, filename: string): Promise<void> {
  const storagePath: string = path.join(process.cwd(), "data", filename);
  return fs.writeFile(storagePath, data);
}
