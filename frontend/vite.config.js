import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    preview: {
        allowedHosts: ["ai-career-predictor-1-tbdd.onrender.com"],
    },
});