import { create as ipfsHttpClient } from "ipfs-http-client";
const projectId = process.env.REACT_APP_PROJECTID;
const projectSecret = process.env.REACT_APP_PROJECTSECRET;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
const ipfsClient = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});
export default ipfsClient