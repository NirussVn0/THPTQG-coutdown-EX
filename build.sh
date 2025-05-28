#!/bin/bash
cd "$(dirname "$0")"
export NODE_ENV=production
npx next build
