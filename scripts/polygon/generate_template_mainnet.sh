#!/bin/bash

set -e

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0xE4da4e67CC27d9D4BAEc86826b42d2C9E97280d8/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/26238988 /" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/matic/" ./subgraph.yaml