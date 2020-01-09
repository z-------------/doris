#!/usr/bin/env node

/**
 * (Shallowly) copy files from src/ to dist/.
 */

const fs = require("fs").promises;
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");
const DIST_DIR = path.join(__dirname, "..", "dist");

let error = false;

(async () => {
    // create dist/ if it doesn't exist
    try {
        await fs.stat(DIST_DIR);
    } catch ({ code }) {
        if (code === "ENOENT") {
            await fs.mkdir(DIST_DIR);
        }
    }

    // copy files
    const filenames = await fs.readdir(SRC_DIR);
    for (const filename of filenames) {
        if (![".ts", ".js"].includes(path.extname(filename))) {
            try {
                await fs.copyFile(path.join(SRC_DIR, filename), path.join(DIST_DIR, filename))
            } catch {
                error = true;
                console.error(`Failed to copy '${filename}'.`);
            }
        }
    }

    process.exit(error ? 1 : 0);
})();
