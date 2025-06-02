import remixEslintConfig from "@meshed/eslint-config/remix";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...remixEslintConfig,
  {
    // 필요에 따라 Custom룰 정의
  },
]);
