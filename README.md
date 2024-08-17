# Astro Project with ESLint, Husky, and Lint-Staged

This project is initialized using [Astro](https://astro.build/) with [ESLint](https://eslint.org/), [ESLint configuration for Astro files](https://ota-meshi.github.io/eslint-plugin-astro/), [Husky](https://typicode.github.io/husky/) for Git hooks, and [lint-staged](https://www.npmjs.com/package/lint-staged) for pre-commit checks.

This `README.md` covers all the necessary steps to set up the project and provides clarity on the configurations involved. Feel free to adjust it based on your preferences.

## Project Setup

### 1. Install Astro

Run the following command to create a new Astro project:

```bash
npm create astro@latest
```

Choose:

-  Empty template
-  No TypeScript
-  Install deps
-  Initialize GIT repository

### 2. Install and Configure ESLint

Run the following command to set up ESLint:

```bash
npm init @eslint/config@latest
```

Choose:

-  Validate Syntax and problems
-  ESM
-  No React or Vue
-  No TypeScript
-  Code runs on Browser

### 3. Add ESLint Configuration

In eslint.config.js, add the following:

```javascript
export default [
	// Existing config...
	{
		files: ["**/*.js", "**/*.ts", "**/*.astro"],
		ignores: [
			"**/node_modules/**",
			"**/dist/**",
			"**/public/**",
			"**/build/**",
		],
	},
];
```

### 4. Install ESLint for Astro

```bash
npm install --save-dev eslint-plugin-astro eslint-plugin-jsx-a11y --force
```

### 5. Add to eslint.config.js:

```javascript
import eslintPluginAstro from "eslint-plugin-astro";

export default [
	// Existing config...

	...eslintPluginAstro.configs.recommended,
	...eslintPluginAstro.configs["jsx-a11y-recommended"],
];
```

### 6. Test ESLint Setup

To check if ESLint is working, you can add the following rule in eslint.config.js:

```json
{
	"rules": {
		"no-console": "error"
	}
}
```

Add a console.log to a file like index.astro and run:

```bash
npx eslint .\src\pages\index.astro
```

It should return a no-console error.

### 7. Install Husky for Git Hooks

Install Husky:

```bash
npm install --save-dev husky --force
```

Add the following script in package.json to prepare the project:

```json
{
	"scripts": {
		"prepare": "husky install"
	}
}
```

Run this to init and config ./husky

```bash
npm run prepare
```

### 8. Install lint-staged for Pre-Commit Hook

Install lint-staged:

```bash
npm install --save-dev lint-staged --force
```

Add the following text to .husky/pre-commit:

```
npx lint-staged
```

### 9. Configure lint-staged in package.json

```json
{
	"lint-staged": {
		"*.astro": "eslint --fix",
		"*.{js,ts}": "eslint --fix"
	}
}
```

Now, when you try to commit files, the pre-commit hook will automatically validate ESLint rules.

If you try to commit code that violates the ESLint rules (e.g. console.log), the commit will be blocked with an error like this:

```bash
⚠ Skipping backup because there’s no initial commit yet.

[STARTED] Preparing lint-staged...
[COMPLETED] Preparing lint-staged...
[STARTED] Hiding unstaged changes to partially staged files...
[COMPLETED] Hiding unstaged changes to partially staged files...
[STARTED] Running tasks for staged files...
[STARTED] package.json — 13 files
[STARTED] *.{js,ts,astro} — 3 files
[STARTED] eslint
[FAILED] eslint [FAILED]
[FAILED] eslint [FAILED]
[COMPLETED] Running tasks for staged files...
[STARTED] Applying modifications from tasks...
[COMPLETED] Applying modifications from tasks...
[STARTED] Restoring unstaged changes to partially staged files...
[SKIPPED]
✖ eslint:

C:\path\index.astro
  2:1  error  Unexpected console statement  no-console

✖ 1 problem (1 error, 0 warnings)

 Skipped because of errors from tasks.
husky - pre-commit script failed (code 1)
```

and cancels the commit.
