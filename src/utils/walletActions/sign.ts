import { signMessage } from "wagmi/actions";
async function sign(message: string) {
  try {
    const res = await signMessage({ message });
    console.log(res)
    if (res) {
      return [true, ""];
    } else {
      return [false, "User rejected request"];
    }
  } catch (error) {
    return [false, error.message || error];
  }
}

export default sign;
