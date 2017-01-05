
#Git Workflow
## Use a fork of your team repo

* Fork the team repo
* Keep your forked repo master in sync with the team repo
* Add an upstream remote: 'git remote add upstream 'https://github.com/BLeNd-HR51/Envoyus.git'
* Fetch the dev branch from upstream: 'git fetch upstream'
* Set your master branch to track the upstream dev branch: 'git branch -u upstream/dev'

## Use a feature branch in your forked repo for development

* Create a feature branch in your forked repo before writing any code: 'git checkout -b BLeNd-HR51/Envoyus#{waffleNumber}'
* Make changes and regular commits

***** squishing is optional
* Squish your changes into a single commit: 'git rebase -i HEAD~{commitsSinceBranchCreation}'i 
 * This will bring you in interactive mode
 * Leave the first commit as 'pick' or change it to 'rename' to edit the commit message
 * Change the subsequent commits to 'squash'
 * This will squash all the commits into one.
 *****************
* Checkout your master branch and pull the most recent changes to the dev branch: 'git checkout master'
 * 'git pull'
* Checkout your feature branch again: 'git checkout {featureBranch}'
* Update your feature branch with the changes from the master: 'git rebase master'
* Push your feature branch to your fork: 'git push origin {featureBranch}'
* Submit a pull request to the team repo dev branch
* In the body of that PR, add 'closes uberforcats/2016-09-thesis#{waffleNumber}'