#!/bin/bash
codegen() {
  # frontend codegen
  openapi-generator generate \
    -i ../swagger.yaml \
    -g typescript-axios \
    -o frontend/src/gen
  # Typescriptの型チェックで怒られる部分の修正
  LF=$(printf '\\\012_')
  LF=${LF%_}
  sed -i-e "1s/^/\/\/ @ts-nocheck${LF}/" src/gen/api.ts
}

allocator() {
  if [ $1 = "codegen" ]; then
    codegen
  else
    echo "usage $ manage codegen"
  fi
}

allocator "$1"
