const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const source = path.join(process.env.USERPROFILE, "Downloads");
const target = path.join(process.cwd(), "public", "images", "posters");
const names = fs.readdirSync(source).filter((name) =>
  /\.(jpg|jpeg|png)$/i.test(name) &&
  (/^(#?Incantation|Annabelle|Avatar The Way Of Water|HARRY POTTER.*|Insidious|download( \(\d+\))?)\.(jpg|jpeg|png)$/i.test(name))
);

fs.mkdirSync(target, { recursive: true });

Promise.all(names.map(async (name) => {
  const outputName = path.basename(name, path.extname(name))
    .toLowerCase().replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "").replaceAll("'", "") + ".webp";
  await sharp(path.join(source, name)).webp({ quality: 86, effort: 6 }).toFile(path.join(target, outputName));
  console.log(outputName);
})).catch((error) => { console.error(error); process.exitCode = 1; });
