import { json, log } from "@graphprotocol/graph-ts";
import {
  Approval,
  ApprovalForAll, buyed, NFT, Transfer
} from "../generated/NFT/NFT";
import { NFTToken, User } from "../generated/schema";

export function handleApproval(event: Approval): void {}
export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleTransfer(event: Transfer): void {
  log.info("here main {}", ['1']);

  const tokenId = event.params.tokenId.toString();
  if (!tokenId) {
    log.info("skipping token id {}", ['1']);
    return;
  }

  if (!event || !event.params || !event.params.tokenId) {
    log.info("here second {}", ['1']);
    return;
  }

  log.info("here token id {}", [tokenId]);
  let token = NFTToken.load(tokenId);
  if (!token) {
    log.info("here {}", ['1']);
    token = new NFTToken(event.params.tokenId.toString());

    if (!event.address) {
      log.info("here address {}", ['1']);
      return;
    }

    let tokenContract = NFT.bind(event.address);
    const tokenInfoWrapped = tokenContract.try_getItemInfo(event.params.tokenId);
    log.info("length: {}; reverted: {}", [tokenInfoWrapped.value.length.toString(), tokenInfoWrapped.reverted.toString()]);
    if (!tokenInfoWrapped.value.length && !tokenInfoWrapped.reverted) {
      // in case of no data just skip it
      log.info("No data for token {}", [event.params.tokenId.toString()]);
      return;
    }
    const tokenInfoUnwrapped = tokenInfoWrapped.value.at(0);

    if (tokenInfoUnwrapped.creator) {
      token.creator = tokenInfoUnwrapped.creator.toHexString();
    }
      
    if (tokenInfoUnwrapped.tokenID) {
      token.token_id = tokenInfoUnwrapped.tokenID;
    }

    const owner = tokenContract.ownerOf(token.token_id);

    // when new token generated creator is owner
    token.owner = owner.toHexString();
    // initially token is on sale
  
    if (tokenInfoUnwrapped.price) {
      token.price = tokenInfoUnwrapped.price;
    }

    if (tokenInfoUnwrapped.onSale) {
      token.on_sale = tokenInfoUnwrapped.onSale;
    }

    if (tokenInfoUnwrapped.data) {
      token.json = tokenInfoUnwrapped.data;
      const data = json.fromString(tokenInfoUnwrapped.data);
      const title = data.toObject().get("title");
      if (title)  {
        token.title = title.toString();
      }
  
      const description = data.toObject().get("description");
      if (description) {
        token.description = description.toString();
      }
  
      const media = data.toObject().get("media");
      if (media) {
        token.media = media.toString();
      }
    }

    token.last_change = event.block.timestamp;
  } else {
    log.info("here not {}", ['1']);
    let tokenContract = NFT.bind(event.address);
    log.info("here not {}", ['2']);
    const tokenInfoWrapped = tokenContract.try_getItemInfo(event.params.tokenId);
    // log.info("length: {}; reverted: {}", [tokenInfoWrapped.value.length.toString(), tokenInfoWrapped.reverted.toString()]);
    log.info("reverted: {}", [tokenInfoWrapped.reverted.toString()]);
    // if (!tokenInfoWrapped.value.length && !tokenInfoWrapped.reverted) {
    if (!tokenInfoWrapped.reverted) {
      // in case of no data just skip it
      log.info("No data for token {}", [event.params.tokenId.toString()]);
      return;
    }
    const tokenInfoUnwrapped = tokenInfoWrapped.value.at(0);
    const owner = tokenContract.ownerOf(token.token_id);

    // when new token generated creator is owner
    token.owner = owner.toHexString();
    token.on_sale = tokenInfoUnwrapped.onSale;
    token.price = tokenInfoUnwrapped.price;
    token.last_change = event.block.timestamp;
  }
  token.save();

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}

export function handlebuyed(event: buyed): void {}
