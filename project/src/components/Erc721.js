import { useState } from "react";
import erc721Abi from "../../../project/src/erc721Abi";

function Erc721({ web3, account, erc721list }) {
  const [to, setTo] = useState("");
  const sendToken = async (tokenAddr, tokenId) => {
    const tokenContract = await new web3.eth.Contract(erc721Abi, tokenAddr, {
      from: account,
    });
    tokenContract.methods
      .transferFrom(account, to, tokenId)
      .send({
        from: account,
      })
      .on("receipt", (receipt) => {
        setTo("");
      });
  };
  return (
    <div className="erc721list">
      {erc721list.map((token) => {
        return (
          <div className="erc721token">
            Name: <span className="name">{token.name}</span>(
            <span className="symbol">{token.symbol}</span>)
            <div className="nft">id: {token.tokenId}</div>
            <img src={token.tokenURI} width={300} />
            <div className="tokenTransfer">
              <input
                class="sendBox_contract"
                type="text"
                placeholder="recipient address"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              ></input>
              <button
                className="w-btn w-btn-gra1 w-btn-gra-anim"
                onClick={sendToken.bind(this, token.address, token.tokenId)}
              >
                send Token
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Erc721;
