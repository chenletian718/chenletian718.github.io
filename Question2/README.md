# Question 2 — GitHub.io Personal Webpage and Network Analysis

This folder contains the deployable website (`site/`), network experiment instructions and outputs (`network/`), and the English report draft (`report_q2.md`). The project uses GitHub Actions to publish `site/` to GitHub Pages. The repository is a user site (`chenletian718.github.io`), so the expected URL is `https://chenletian718.github.io` after Pages is enabled.

## Local preview

From the repository root:

```powershell
cd Question2/site
py -m http.server 8000
```

Open `http://127.0.0.1:8000` in a browser. Check the desktop and mobile layouts, navigation, email link, GitHub link, and browser console. This local preview is not evidence of the deployed site.

## Publish

Push the repository to `main`, then open **GitHub → chenletian718/chenletian718.github.io → Settings → Pages**. Under **Build and deployment**, choose **GitHub Actions**. Open the **Actions** tab and wait for “Deploy Question 2 website to GitHub Pages” to complete. Open the URL printed by the workflow and save a screenshot with the address bar visible.

The profile now identifies chenle.tian as a 20-year-old male student, lists piano, sketching, chess, breaking, basketball, and fitness, and uses `Chenle.Tian24@student.xjtlu.edu.cn` as the contact address. The page honestly states that there are no completed personal projects yet and uses the coursework page as the demonstrated project. Do not fabricate network measurements: run the Windows commands and Wireshark capture in `network/` and insert the observed values and screenshots into `report_q2.md`.
