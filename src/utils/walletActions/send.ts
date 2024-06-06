import { parseEther } from "viem";
import { sendTransaction } from "wagmi/actions";

async function send(
  to: `0x${string}`,
  value: any
) {
  try {
    const hash = await sendTransaction({
        to,
        value: parseEther(value),
      })

    if (hash) {
      return [true, ""];
    } else {
      return [false, "User rejected the request"];
    }
  } catch (error) {
    return [false, error.message || error];
  }
}

export default send;
