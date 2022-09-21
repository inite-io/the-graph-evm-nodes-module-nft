#!/bin/bash

set -e

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0xf39d00f8ad68bcc4eca81ed87c62427c114321af/" ./subgraph.yaml 
# sed -i '' -e "s/{{START_BLOCK}}/21478131/" ./subgraph.yaml
sed -i '' -e "s/{{START_BLOCK}}/22688843/" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/chapel/" ./subgraph.yaml