#!/bin/bash
cd /home/kavia/workspace/code-generation/kavialearn-explorer-64218-40c22302/kavialearn_explorer
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

