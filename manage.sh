#!/bin/bash
codegen() {
  # frontend codegen
  openapi-generator generate \
    -i swagger.yaml \
    -g typescript-axios \
    -o frontend/src/gen
}

allocator() {
  if [ $1 = "codegen" ]; then
    codegen
  else
    echo "usage $ manage codegen"
  fi
}

allocator "$1"