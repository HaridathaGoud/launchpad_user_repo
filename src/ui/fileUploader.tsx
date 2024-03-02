import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../reducers/layoutReducer";
import { apiUploadPost } from "../utils/api";
import Spinner from "../components/loaders/spinner";
interface FileUploaderProps {
  accept?: string;
  canDragAndDrop?: boolean;
  canCopyAndPaste?: boolean;
  inputClass?: string;
  setFile: Function;
  inputRef: any;
  uploaderClass?: string;
  size?: number;
}
const fileTypes = {
  images: {
    "image/png": true,
    "image/jpg": true,
    "image/jpeg": true,
    "image/PNG": true,
    "image/JPG": true,
    "image/JPEG": true,
    errorMessage:
      "File is not allowed. Please upload only jpg, png, jpeg files!",
  },
  all: true,
};

const isFileAcceptable = (
  file: any,
  size: number | undefined,
  accept: string | undefined
) => {
  debugger;
  const fileSizeInMB = file.size / (1024 * 1024);
  if (accept && !fileTypes[accept][file.type]) {
    return { acceptable: false, error: fileTypes[accept]["errorMessage"] };
  }
  if (size && fileSizeInMB > size) {
    return {
      acceptable: false,
      error: `File Size should be less than ${size}MB! Current File size : (${fileSizeInMB}) MB`,
    };
  }
  return { acceptable: true, error: "" };
};
const FileUploader = ({
  accept,
  canDragAndDrop,
  canCopyAndPaste,
  inputClass,
  setFile,
  inputRef,
  uploaderClass,
  size,
}: FileUploaderProps) => {
  const [loader, setLoader] = useState(false);
  const rootDispatch = useDispatch();
  const uploadToServer = async (file: any, event) => {
    const body: any = new FormData();
    setLoader(true);
    body.append("file", file);
    if (accept ? fileTypes[accept][file?.type] : fileTypes["all"]) {
      try {
        const response = await apiUploadPost(`Upload/UploadFileNew`, body);
        if (response.statusText.toLowerCase() === "ok") {
          rootDispatch(setError({ message: "" }));
          const imageURL = response.data[0];
          setFile?.({ name: file?.name, url: imageURL });
        } else {
          rootDispatch(setError({ message: response }));
        }
      } catch (error) {
        rootDispatch(setError({ message: error }));
      } finally {
        setLoader(false);
      }
    } else {
      rootDispatch(
        setError({
          message: accept
            ? fileTypes[accept]["errorMessage"]
            : "File not allowed!",
        })
      );
      event.target.value = "";
      setLoader(false);
    }
  };
  const handleFileChange = (event) => {
    debugger;
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const { acceptable, error } = isFileAcceptable(
        selectedFile,
        size,
        accept
      );
      if (acceptable) {
        uploadToServer(selectedFile, event);
      } else {
        rootDispatch(setError({message:error}));
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (canDragAndDrop) {
      const selectedFile = event.dataTransfer.files[0];
      if (selectedFile) {
        const { acceptable, error } = isFileAcceptable(
          selectedFile,
          size,
          accept
        );
        if (acceptable) {
          uploadToServer(selectedFile, event);
        } else {
          rootDispatch(setError({message:error}));
        }
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handlePaste = (event) => {
    event.preventDefault();
    if (canCopyAndPaste) {
      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent.clipboardData;
      const pastedFile = clipboardData.files[0];
      if (pastedFile) {
        const { acceptable, error } = isFileAcceptable(
          pastedFile,
          size,
          accept
        );
        if (acceptable) {
          uploadToServer(pastedFile, event);
        } else {
          rootDispatch(setError({message:error}));
        }
      }
    }
  };
  return (
    <label
      htmlFor="fileUploader"
      className={
        uploaderClass ||
        "relative flex items-center justify-between border border-t-0 px-3.5 py-4  fileUpload"
      }
    >
      {!loader && (
        <button
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onPaste={handlePaste}
        >
          <input
            id="fileUploader"
            ref={inputRef}
            type="file"
            className={
              inputClass ||
              "absolute bottom-0 left-0 right-0 top-0 ml-0 w-full opacity-0 cursor-pointer"
            }
            onChange={handleFileChange}
          />
          <span className="pointer-events-none relative pl-1 text-sm">
            <span className={`fileUploadText text-sm font-normal`}>
              Attach images by dragging & dropping, selecting or pasting them.
            </span>
          </span>
          <span className={`icon addtext`}></span>
        </button>
      )}
      {loader && (
        <p className="text-center grow">
          <Spinner />
        </p>
      )}
    </label>
  );
};

export default FileUploader;
