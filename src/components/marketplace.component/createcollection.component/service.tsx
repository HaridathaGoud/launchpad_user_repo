export const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/u;
export const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
export const htmlTagsRegex = /<\/?[a-z][\s\S]*>/i;
export const numericRegex = /^[0-9]+$/;
export const specialCharactersOnlyRegex = /^[!@#$%^&*(),.?":{}|<>]+$/;

export const validationRules = {
    logo: { required: true, errorMsg: "Is required" },
    bannerImage: { required: true, errorMsg: "Is required" },
    featuredImage: { required: true, errorMsg: "Is required" },

    collectionName: {
      required: true,
      errorMsg: "Is required",
      contentErrorMsg: "Please enter valid content.",
      validateContent: (value) => ( htmlTagsRegex.test(value) || emojiRegex.test(value) || numericRegex.test(value) || specialCharactersOnlyRegex.test(value)),
    },
    blockChain: { required: true, errorMsg: "Is required" },
    description: {
        required: true,
        errorMsg: "Is required",
        contentErrorMsg: "Please enter valid content.",
        validateContent: (value) => (htmlTagsRegex.test(value) || emojiRegex.test(value) || specialCharactersOnlyRegex.test(value)),
    },
    category: { required: true, errorMsg: "Is required" }
};