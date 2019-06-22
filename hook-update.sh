#!/bin/sh
echo "updating pre-push hook ..."
cp .git_template/hooks/pre-push .git/hooks/pre-push
echo "success"
