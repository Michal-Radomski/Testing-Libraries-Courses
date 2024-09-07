import { generateReportData, storeData } from "./src/data";
import log from "./src/util/logger";

const data: string = generateReportData(log);
storeData(data);
