import { readFileSync } from "fs";
import { autoReload } from "rollup-plugin-auto-reload";
import { userscriptMetadataGenerator } from "userscript-metadata-generator";

const createDevMetadata = (metadata, scriptUrl) => {
  const requires = [];

  if (typeof metadata.require === "string") {
    requires.push(metadata.require);
  } else if (Array.isArray(metadata.require)) {
    requires.push(...metadata.require);
  }

  requires.push(scriptUrl);
  return {
    ...metadata,
    name: `[dev] ${metadata.name}`,
    require: requires,
  };
};

const createUpdatableScriptMetadata = (metadata) => {
  return {
    ...metadata,
    downloadURL:
      "https://update.greasyfork.org/scripts/478102/Auto%20hide%20next%20up%20card%20for%20Amazon%20Prime%20Video.user.js",
    updateURL:
      "https://update.greasyfork.org/scripts/478102/Auto%20hide%20next%20up%20card%20for%20Amazon%20Prime%20Video.meta.js",
  };
};

const createRollupOptions = () => {
  const metadata = JSON.parse(
    readFileSync("misc/userscript.meta.json", "utf-8")
  );
  const manifest = JSON.parse(readFileSync("src/manifest.json"), "utf-8");

  const version = manifest.version;
  metadata.version = version;

  const rootDir = process.cwd();
  const inputPath = "src/main.js";
  const scriptName = `auto-hide-next-up-card_${version}`;

  const userscriptPath = `dist/userscript/${scriptName}.user.js`;
  const userscriptUrl = `file://${rootDir}/${userscriptPath}`;

  const devPath = `dist/userscript/${scriptName}.dev.user.js`;
  const devMetadata = createDevMetadata(metadata, userscriptUrl);

  const updatableScriptPath = `dist/userscript/${scriptName}.updatable.user.js`;
  const updatableScriptMetadata = createUpdatableScriptMetadata(metadata);

  const mainOptions = {
    input: inputPath,
    output: {
      file: userscriptPath,
      format: "iife",
      banner: () => `${userscriptMetadataGenerator(metadata)}\n`,
    },
    plugins: [],
  };

  const devOptions = {
    input: "misc/userscript.dev.js",
    output: {
      file: devPath,
      format: "iife",
      banner: () => `${userscriptMetadataGenerator(devMetadata)}\n`,
    },
  };

  const updatableScriptOptions = {
    input: inputPath,
    output: {
      file: updatableScriptPath,
      format: "iife",
      banner: () => `${userscriptMetadataGenerator(updatableScriptMetadata)}\n`,
    },
  };

  if (process.env.AUTO_RELOAD === "true") {
    mainOptions.plugins.push(autoReload());
  }

  return [mainOptions, devOptions, updatableScriptOptions];
};

const options = createRollupOptions();

export default options;
