import { fetchBalance } from "wagmi/actions";

async function readBalance(account: `0x${string}`) {
  try {
    const balance = fetchBalance({
      address: account,
    });

    if (balance) {
      return [balance, ""];
    } else {
      return [false, "User rejected the request"];
    }
  } catch (error) {
    return [false, error.message || error];
  }
}

export default readBalance;
