import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "DIRECTUS_");
  return {
    plugins: [react()],
    define: {
      "import.meta.env.DIRECTUS_SERVER": JSON.stringify(env.DIRECTUS_SERVER),
    },
  };
});
