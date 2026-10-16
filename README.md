# Physics Reviewer

A static site with study modules and quizzes. No build step, no database.

## Files
- `modules.js`   the lessons (explanations, formulas, worked examples)
- `questions.js` the quiz questions
- `index.html`, `style.css`, `app.js`   the site itself (you rarely need to touch these)

## Add a new topic
1. In `questions.js`, copy a topic block and change the `name` and questions.
2. In `modules.js`, add a matching entry. The name must match EXACTLY.

## Add a lesson to a topic
In `modules.js`, copy a `{ h: ..., p: ... }` block inside that topic's list. `formula` and `example` are optional. Use \n for a new line in a formula.

## Try it on your computer
Double-click `index.html`.

## Deploy to Vercel
1. Upload all files to a GitHub repo.
2. At vercel.com choose Add New > Project, pick the repo, keep defaults, click Deploy.
3. Pushing changes to GitHub updates the site automatically.

## Admin file uploads (PDFs, handouts, slides)
Students see uploaded files under "Downloads" in each topic's module. You upload them at `/admin.html`.

One-time setup in Vercel:
1. Open your project > Storage > Create > Blob, and connect it to the project (this adds BLOB_READ_WRITE_TOKEN automatically).
2. Project > Settings > Environment Variables: add ADMIN_PASSWORD with a long password only you know.
3. Redeploy (Deployments > ... > Redeploy).
4. Open yoursite.vercel.app/admin.html, enter the password, pick a topic, and upload.

Limits: 500 MB per file (large files upload directly to Vercel Blob with a progress percentage). The free Vercel Blob plan has limited total storage, so check your usage in the Storage tab. Allowed: pdf, doc, docx, ppt, pptx, xlsx, png, jpg, jpeg, txt.
Uploads only work on the deployed site, not when you double-click index.html.
