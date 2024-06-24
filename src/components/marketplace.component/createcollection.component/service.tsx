export const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/u;
export const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
export const htmlTagsRegex = /<\/?[a-z][\s\S]*>/i;
export const numericRegex = /^[0-9]+$/;

export const validationRules = {
    logo: { required: true, errorMsg: "Please provide logo image." },
    bannerImage: { required: true, errorMsg: "Please provide banner image." },
    featuredImage: { required: true, errorMsg: "Please provide feature image." },

    collectionName: {
      required: true,
      errorMsg: "Please provide Name",
      contentErrorMsg: "Please enter valid content.",
      validateContent: (value) => ( htmlTagsRegex.test(value) || emojiRegex.test(value) || numericRegex.test(value)),
    },
    blockChain: { required: true, errorMsg: "Please select Network" },
    description: {
        required: true,
        errorMsg: "Please provide Description",
        contentErrorMsg: "Please enter valid content.",
        validateContent: (value) => (htmlTagsRegex.test(value) || emojiRegex.test(value)),
    },
    category: { required: true, errorMsg: "Please select Category" }
};