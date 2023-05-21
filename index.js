#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];
const content = fs.readFileSync(path.join(__dirname, fileName), "utf-8");

// BEGIN
console.log(content);
const data = content
  .split("\r\n")
  .slice(1)
  .map((row) =>
    row
      .slice(1, -1)
      .split("|")
      .map((item, i) => (i > 0 ? Number(item.trim()) : item.trim()))
  );
// 1
console.log(`всего видов существ:`, data.length);
// 2
const dataSortedStr = data.sort((stats1, stats2) => stats2[1] - stats1[1]);
console.log(
  `стоимость 10 самых сильных (${dataSortedStr[0][0]}):`,
  dataSortedStr[0][6] * 10,
  `стоимость 20 самых слабых (${dataSortedStr[1][0]}):`,
  dataSortedStr[1][6] * 20
);
// 3
const dataSortedWeigt = data.sort((stats1, stats2) => stats2[5] - stats1[5]);
console.log(
  `цена отряда самых тяжелых (${dataSortedWeigt[0][0]}):`,
  dataSortedWeigt[0][3] * dataSortedWeigt[0][6],
  `цена отряда самых легких (${dataSortedWeigt.at(-1)[0]}):`,
  dataSortedWeigt.at(-1)[3] * dataSortedWeigt.at(-1)[6]
);
// 4
const dataSortedValue = data
  .map((creature) => [...creature, creature[1] / creature[6]])
  .sort((stats1, stats2) => stats2[7] - stats1[7]);

console.log(dataSortedValue.at(-1)[0], dataSortedValue[0][0]);

// 5
console.log(
  `самая сильная армия: ${1e4 / dataSortedValue[0][6]} ${
    dataSortedValue[0][0]
  }ов c суммарной силой ${
    (1e4 / dataSortedValue[0][6]) * dataSortedValue[0][1]
  }`
);

// END
