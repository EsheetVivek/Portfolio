import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", "legacy/**", "node_modules/**"] }];
export default config;
