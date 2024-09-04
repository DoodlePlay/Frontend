// vite.config.js
/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true, // 전역 변수를 사용할 수 있도록 설정
    environment: "jsdom", // 브라우저 환경에서 테스트를 실행할 때 사용
    setupFiles: ["./vitest.setup.ts"], // 테스트 전에 실행할 파일 설정
  },
});
