import { validateContentRule } from "../../../../utils/validation";

const convertTo24HourFormat = (time) => {
  const [timeStr, amPm] = time.split(' ');
  const [hours, minutes] = timeStr.split(':');
  let hours24 = parseInt(hours, 10);

  if (amPm?.toLowerCase() === 'pm' && hours24 !== 12) {
    hours24 += 12;
  } else if (amPm?.toLowerCase() === 'am' && hours24 === 12) {
    hours24 = 0;
  }

  return hours24 * 60 + parseInt(minutes, 10);
};

const validateForm = (form:any) => {
    const { proposal, summary, startDate, endDate, image, options, proposalType } =
      form;
    const newErrors: any = {};
    const currentDate=new Date().toISOString().slice(0,19);
    const startTime = convertTo24HourFormat(startDate);
      const endTime = convertTo24HourFormat(endDate);
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
    }else if(startDate<currentDate){
      newErrors.startDate = "Must be equal to or after the current date and time"
    }
    if (!endDate || endDate === "") {
      newErrors.endDate = "Is required";
    }else if(endDate<startDate){
      newErrors.endDate = "Must be after start date and time"
    }else  if((startDate == endDate) && (startTime > endTime)) {
      newErrors.endDate = "Must be after start date and time"
   }else if((startDate == endDate) && startTime == endTime){
    newErrors.endDate = "Must be after start date and time"
  }
    if (!image || image === "") {
      newErrors.image = "Is required";
    }
    if (options && options.length > 0) {
      let optionsError = "";
      const hasError = !options.every((option: any, optionIndex) => {
        if (!option.options || !option.options.trim()) {
          optionsError = "Options cannot be empty";
          return false;
        }
        if (validateContentRule(option.options)) {
          optionsError = "Please provide valid content for options";
          return false;
        }
        const isDuplicate = options.some(
          (item: any, index) =>
            item?.options?.trim().toLowerCase() ===
              option?.options?.trim().toLowerCase() && index !== optionIndex
        );
        if (isDuplicate) {
          optionsError = "Options must be unique";
          return false;
        } else {
          return true;
        }
      });
      if (hasError) newErrors.options = optionsError;
    }
    if (options.length < 2) {
      newErrors.options = "Please input atleast two options";
    }
    if (options.length >4) {
      newErrors.options = "You can add up to 4 options only";
    }
    return newErrors;
  };

export default validateForm