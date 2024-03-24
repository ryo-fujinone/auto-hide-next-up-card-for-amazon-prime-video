import archiver from "archiver";
import fs from "fs-extra";
import path from "path";

const extName = "auto-hide-next-up-card";

const distDir = "dist";
const chromeExtDir = path.join(distDir, "chrome");
const firefoxExtDir = path.join(distDir, "firefox");

const pkgMetadata = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const pkgVersion = pkgMetadata.version;
const baseArchiveName = `${extName}_${pkgVersion}`;

const prepareSrc = (parentDir) => {
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  const targetDir = path.join(parentDir, "ext");
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true });
  }
  fs.copySync("src/", targetDir);
  fs.copySync("LICENSE", path.join(targetDir, "LICENSE"));
  return targetDir;
};

const buildChromeExt = async () => {
  const targetDir = prepareSrc(chromeExtDir);
  const archiveName = `${baseArchiveName}_chrome.zip`;
  const archivePath = path.join(chromeExtDir, archiveName);

  const output = fs.createWriteStream(archivePath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.directory(targetDir, false);
  archive.pipe(output);
  await archive.finalize();
  console.log(`created ${archivePath}`);
};

const buildFirefoxExt = async () => {
  const targetDir = prepareSrc(firefoxExtDir);
  const archiveName = `${baseArchiveName}_firefox.zip`;
  const archivePath = path.join(firefoxExtDir, archiveName);
  const manifestPath = path.join(targetDir, "manifest.json");

  fs.rmSync(manifestPath);
  fs.copySync("misc/manifest.firefox.json", manifestPath);

  const output = fs.createWriteStream(archivePath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.directory(targetDir, false);
  archive.pipe(output);
  await archive.finalize();
  console.log(`created ${archivePath}`);
};

const main = async () => {
  await buildChromeExt();
  await buildFirefoxExt();
};

main();
