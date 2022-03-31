import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import MaichaToken from "../artifacts/contracts/MaichaNFT.sol/MaichaToken.json";
import WalletBalance from "./WalletBalance";
const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, MaichaToken.abi, signer);

export default function Home() {
  const [totalMinted, totalMintedSet] = useState<number>(10);

  useEffect(() => {
    getCount();
  }, []);
  const getCount = async () => {
    const count = await contract.count();
    console.log(count);
    totalMintedSet(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1>My NFT Collections</h1>
      {Array(totalMinted + 1)
        .fill(0)
        .map((_, index) => (
          <div key={index}>
            <NFTImage tokenId={index} />
          </div>
        ))}
    </div>
  );
}

function NFTImage(props: { tokenId: number }) {
  const contentID = "QmYCakZzBNYDbEbutiVA6hMyp6pX1LsZ7Pfm2YQHaPuauA";
  const metadataURI = `${contentID}/${props.tokenId}.json`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentID}/${props.tokenId}.png`;

  const imageURI = `img/${props.tokenId}.png`;

  const [isMinted, isMintedSet] = useState<boolean>(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const res = await contract.isContentOwned(metadataURI);
    isMintedSet(res);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    await result.wait();

    getMintedStatus();
  };

  const getURI = async () => {
    const uri = await contract.tokenURI(props.tokenId);
    console.log(uri);
    return uri;
  };

  return (
    <div className="container">
      <div className="row">
        <img
          className="col-1 img-responsive"
          src={isMinted ? imageURI : "img/placeholder-1.png"}
        />
        <div>
          <h5>ID # {props.tokenId}</h5>
          {!isMinted ? (
            <button onClick={() => mintToken()}>Mint</button>
          ) : (
            <button onClick={getURI}>Taken! Show URI</button>
          )}
        </div>
      </div>
    </div>
  );
}
