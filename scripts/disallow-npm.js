const agent = process.env.npm_config_user_agent;
const { error } = console;

if (!agent.startsWith('pnpm')) {
    error('\nPlease use pnpm to manage dependencies in this repository.\n  $ npm i pnpm -g\n');
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
}
