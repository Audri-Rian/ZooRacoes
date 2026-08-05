const path = require("path");

module.exports = {
  "front/**/*.{ts,tsx}": (files) => {
    const rel = files.map((f) => path.relative("front", f));
    return `bash -c 'cd front && npx eslint --fix ${rel.map((f) => `"${f}"`).join(" ")}'`;
  },
  "back/**/*.java": "bash -c 'cd back && ./mvnw -q spotless:apply'",
};
