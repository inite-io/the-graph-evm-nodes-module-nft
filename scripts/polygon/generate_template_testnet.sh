#!/bin/bash

set -e

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0xD643434F8AD8Bb386Be43Ca526E477cd5202A2AD/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/26561500  /" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/mumbai/" ./subgraph.yaml