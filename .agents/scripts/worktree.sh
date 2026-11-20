#!/usr/bin/env bash
set -euo pipefail

# Safe git worktree helper for isolated agentic feature branches.
# Usage:
#   .agents/scripts/worktree.sh create <branch-slug> [base-branch]
#   .agents/scripts/worktree.sh list
#   .agents/scripts/worktree.sh remove <branch-slug>

REPO_ROOT="$(git rev-parse --show-toplevel)"
WORKTREE_DIR="${REPO_ROOT}/.worktrees"

cmd="${1:-help}"

case "$cmd" in
  create)
    slug="${2:?Usage: worktree.sh create <branch-slug> [base-branch]}"
    base="${3:-main}"
    branch="feat/${slug}"
    target="${WORKTREE_DIR}/${slug}"

    mkdir -p "${WORKTREE_DIR}"
    if git show-ref --verify --quiet "refs/heads/${branch}"; then
      git worktree add "${target}" "${branch}"
    else
      git worktree add -b "${branch}" "${target}" "${base}"
    fi
    echo "Worktree ready: ${target} (branch: ${branch})"
    ;;
  list)
    git worktree list
    ;;
  remove)
    slug="${2:?Usage: worktree.sh remove <branch-slug>}"
    target="${WORKTREE_DIR}/${slug}"
    git worktree remove "${target}"
    echo "Removed worktree: ${target}"
    ;;
  *)
    echo "Usage:"
    echo "  $0 create <branch-slug> [base-branch]"
    echo "  $0 list"
    echo "  $0 remove <branch-slug>"
    exit 1
    ;;
esac
