import { validateContentRule } from "../../../../utils/validation";

const validateForm = (form:any) => {
    const { proposal, summary, startDate, endDate, image, options, proposalType } =
      form;
    const newErrors: any = {};
    if (!proposal || proposal === "") {
      newErrors.proposal = "Is required";
    } else if (validateContentRule(proposal)) {
      newErrors.proposal = "Please provide valid content";
    }
    if (!summary || summary === "") {
      newErrors.summary = "Is required";
    } else if (validateContentRule(summary)) {
      newErrors.summary = "Please provide valid content";
    }
    if (!proposalType) {
      newErrors.proposalType = "Is required";
    }
    if (!startDate || startDate === "") {
      newErrors.startDate = "Is required";
    }
    if (!endDate || endDate === "") {
      newErrors.endDate = "Is required";
    }
    if (!image || image === "") {
      newErrors.image = "Is required";
    }
    if (options && options.length > 0) {
      let optionsError = "";
      const hasError = !options.every((option: any, optionIndex) => {
        if (!option.options || !option.options.trim()) {
          optionsError = "Options cannot be empty!";
          return false;
        }
        if (validateContentRule(option.options)) {
          optionsError = "Please provide valid content for options!";
          return false;
        }
        const isDuplicate = options.some(
          (item: any, index) =>
            item?.options?.trim().toLowerCase() ===
              option?.options?.trim().toLowerCase() && index !== optionIndex
        );
        if (isDuplicate) {
          optionsError = "Options must be unique!";
          return false;
        } else {
          return true;
        }
      });
      if (hasError) newErrors.options = optionsError;
    }
    if (options.length < 2) {
      newErrors.options = "Please input atleast two options!";
    }
    return newErrors;
  };

  
export default validateForm