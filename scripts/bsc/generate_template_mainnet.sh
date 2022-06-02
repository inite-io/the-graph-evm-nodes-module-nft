#!/bin/bash

set -e

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0x6d38D1501F7aFb5Db6ca705DFAD5e51C4438e148/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/15966414/" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/bsc/" ./subgraph.yaml