#!/bin/bash

set -e

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0x163e2BF74e3C512b4b53c144832B585a73D2924A/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/60118887/" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/aurora/" ./subgraph.yaml