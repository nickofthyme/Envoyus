# Contributing

## Git Workflow

### 1. Add **dev** branch to [BLeNd-HR51](https://github.com/BLeNd-HR51/Envoyus.git "BLeNd Repo") organization repo
  **TODO: image of github dev branch**

### 2. Fork the organization repo

```
Fork the [BLeNd-HR51](https://github.com/BLeNd-HR51/Envoyus.git "BLeNd Repo") organization repo to your github account
  ###### **_Keep your forked repo master in sync with the team repo_**
```

### 3. Clone your forked repo to your local machine

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/Envoyus.git
```

### 4. Add an upstream remote in your local cloned repo

```bash
git remote add upstream https://github.com/BLeNd-HR51/Envoyus.git
```

### 5. Fetch the dev branch from upstream

```bash
# Checks to ensure you have a dev branch
git fetch upstream
```

### 6. Set your master branch to track the upstream dev branch

```
git branch -u upstream/dev'
```

### 7. Cut a namespaced feature branch from master

``` bash
# Creates your branch and brings you there
git checkout -b <FEATURE_NAME>
```

  Your branch 'FEATURE_NAME' should follow this naming convention:
    - bug/<YOUR_FEATURE_DESCRIPTION>
    - feat/<YOUR_FEATURE_DESCRIPTION>
    - test/<YOUR_FEATURE_DESCRIPTION>
    - doc/<YOUR_FEATURE_DESCRIPTION>
    - refactor/<YOUR_FEATURE_DESCRIPTION>

### 8. Make changes and regularly commit your feature branch.

  Prefix each commit like so
    - (feat) <COMMIT_DESCRIPTION>
      + `(feat) Added new feature`
    - (fix) <COMMIT_DESCRIPTION>
      + `(fix) Fixed inconsistent tests [Fixes #0]`
    - (refactor) <COMMIT_DESCRIPTION>
      + `(refactor) Refactor SQL database`
    - (cleanup) <COMMIT_DESCRIPTION>
      + `(cleanup) Refactor SQL database`
    - (test) <COMMIT_DESCRIPTION>
      + `(test) Added tests for search component`
    - (doc) <COMMIT_DESCRIPTION>
      + `(doc) Revised contributing document`

     ###### **_Make changes and commits on your branch, and make sure that you only make changes that are relevant to this branch. If you find yourself making unrelated changes, make a new branch for those changes._**

  > #### Commit Message Guidelines

  > - Commit messages should be written in the present tense (e.g. "Fix continuous integration script").
  > - The first line of your commit message should be a brief summary of what the commit changes. Aim for about 70 characters max. Remember: This is a summary, not a detailed description of everything that changed.
  > - If you want to explain the commit in more depth, following the first line should be a blank line and then a more detailed description of the commit. This can be is detailed as you want, so dig into details here and keep the first line short.

### 9. Squish your changes into a single commit [optional]

```bash
# This will bring you into an interactive 'squash' mode
git rebase -i HEAD~<COMMITS_SINCE_BRANCH CREATION>
```

  > - Leave the first commit as 'pick' or change it to 'rename' to edit the commit message
  > - Change the subsequent commits to 'squash'
  > - This will squash all the commits into one.

### 10. Navigate to your local master branch

```bash
git checkout master
```

### 11. Pull down any changes that have occurred on the dev branch since you last updated

```bash
# If you have already set your master branch to track the upstream dev branch
git pull
# Otherwise
git pull upstream dev
```

### 12. Navigate back to your local feature branch

```bash
git checkout <FEATURE_NAME>
```

### 13. Update your feature branch with the changes from the master

```bash
git rebase master
```

> This will start the rebase process. You must commit all of your changes before doing this. If there are no conflicts, this should just roll all of your changes back on top of the changes from upstream, leading to a nice, clean, linear commit history.

> If there are conflicting changes, git will start yelling at you part way through the rebasing process. Git will pause rebasing to allow you to sort out the conflicts. You do this the same way you solve merge conflicts, by checking all of the files git says have been changed in both histories and picking the versions you want. Be aware that these changes will show up in your pull request, so try and incorporate upstream changes as much as possible.

> Select a file to change that has 'merge conflicts'. Fix the conflicts and then add the files.

```bash
git add <FILE_NAME>
```

> NOTE: you do not make commits during a rebase.

> Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

> This will continue the rebasing process. Once you are done fixing all conflicts you should run the existing tests to make sure you didn’t break anything, then run your new tests (there are new tests, right?) and make sure they work also.

```bash
node run test
```

> If rebasing broke anything, fix it, then repeat the above process until you get here again and nothing is broken and all the tests pass.

### 14. Push your feature branch to your fork

```bash
git push origin <FEATURE_NAME>
```

### 15. Make a pull request

  Make a clear pull request from your fork and branch to the upstream master branch, detailing exactly what changes you made and what feature this should add.

  The clearer your pull request is the faster you can get your changes incorporated into this repo.

  Notify one of the BLeNd team members that a pull request is needed. The quicker the better so that the dev branch has all of the most recent changes.

  At least one other person MUST give your changes a code review, and once they are satisfied they will merge your changes into upstream. Alternatively, they may have some requested changes. You should make more commits to your branch to fix these, then follow this process again from rebasing onwards.

  Once you get back here, make a comment requesting further review and someone will look at your code again. If they like it, it will get merged, else, just repeat again.

  Thanks for contributing, Happy Hacking!

## Guidelines

  1. Uphold the current code standard:
      - Keep your code [DRY](http://javascript.crockford.com/code.html).
      - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
  1. Run the [tests](./client/test) before submitting a pull request.
    ```bash
    node run test
    ```
    1. Tests are very, very important. Submit tests if your pull request contains new, testable behavior.
  1. Your pull request should be comprised of a single [squashed](# 8. Squish your changes into a single commit [optional]) commit.
