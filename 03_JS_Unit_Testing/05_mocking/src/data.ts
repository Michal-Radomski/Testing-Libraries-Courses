import writeData from "./util/io";

export function generateReportData(logFn: Function): string {
  const data = "Some dummy data for this demo app";
  if (logFn) {
    logFn(data);
  }

  return data;
}

export async function storeData(data: string): Promise<void> {
  if (!data) {
    throw new Error("No data received!");
  }
  await writeData(data, "data.txt");
}
