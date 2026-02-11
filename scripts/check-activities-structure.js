const fs = require("fs");

const requiredFiles = [
  "packages/activities/registry.ts",
  "packages/activities/index.ts"
];

let fail = false;

requiredFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.log(`❌ Missing: ${file}`);
    fail = true;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

if (fail) {
  process.exit(1);
}

console.log("🎯 Activities structure OK");
