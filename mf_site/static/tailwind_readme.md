To use tailwind in a template within an app you need to:
1) go to tailwind.config.js
2) add the template folder to content within module_exports.
    - example: '.<APP_NAME>/templates/**/*.html' for APP_NAME
3) Run this command within the mf_site (app wide) directory:
    - npx tailwindcss -i ./static/src/input.css -o ./static/src/output.css

When adding a new style - a class you havent used before, you also need to run the command:
    - npx tailwindcss -i ./static/src/input.css -o ./static/src/output.css
Apparently this is part of the Just In Time compiling style?
