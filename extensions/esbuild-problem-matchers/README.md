# TypeScript esbuild problem matchers

This [Visual Studio Code extension] provides problem matchers for TypeScript
projects built with [esbuild].

## Problem matchers

The following problem matchers are available and work out of the box.

- `$ts-esbuild` (when running esbuild normally)
- `$ts-esbuild-watch` (when running esbuild in `--watch` mode)

## Usage

Here's an example of how to use both problem matchers in your `tasks.json` file.

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "build",
            "group": "build",
            "problemMatcher": ["$ts-esbuild"]
        },
        {
            "type": "npm",
            "script": "watch",
            "group": "build",
            "isBackground": true,
            "problemMatcher": ["$ts-esbuild-watch"]
        },
        {
            "type": "npm",
            "script": "watch",
            "group": "build",
            "problemMatcher": "$esbuild-watch",
            "isBackground": true,
            "label": "npm: watch"
        },
        {
            "type": "npm",
            "script": "build",
            "group": "build",
            "problemMatcher": "$esbuild",
            "label": "npm: build"
        }
    ]
}
```

### ESBuild via JS

For this problem matcher to be picked up, you need to specify your watch `onRebuild` property to match what this problem matcher is looking for. For example:

```js
console.log('[watch] build started')

await esbuild
  .build({
    ...otherOptions,
    watch: {
      onRebuild(error, result) {
        console.log('[watch] build started')
        if (error) {
          error.errors.forEach((error) =>
            console.error(
              `> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`
            )
          )
        } else console.log('[watch] build finished')
      },
    },
  })
  .then(() => {
    console.log('[watch] build finished')
  })
```

## Compatibility

The problem matchers have been tested on the latest version of esbuild available
at the time, which is: `0.14`. If the matchers stop working in a future version,
please open an issue or a pull request so it can be kept up to date.

[esbuild]: https://esbuild.github.io
[Visual Studio Code extension]: https://marketplace.visualstudio.com/items?itemName=nhedger.ts-esbuild-problem-matchers

## License

This extension is open-sourced software licensed under the [MIT license](LICENSE.md).
