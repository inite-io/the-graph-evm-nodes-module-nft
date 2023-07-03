#!/bin/bash

set -e

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0x0a40db4b66ee040e74b89f1d03d42442d08e5014/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/83441542/" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/aurora-testnet/" ./subgraph.yaml