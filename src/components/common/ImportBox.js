import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import HrModal from "./HrModal";
import HrInput from "./HrInput";

const ImportBox = (props) => {
  const { setOpenForm, toggle, handleImportFunction, title, downloadableFile } = props;
  const [file, setFile] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
        setFile(null);
    };
  }, []);

  const handleOnChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
        setFile(files[0]);
    }
  };

  const handleOnSubmit = () => {
    const formData = new FormData();
    formData.append(`emp_file`, file);
    dispatch(handleImportFunction(formData))
    .then((res) => {
        if(res.error){
            return;
        }else{
            setOpenForm(false);
        }
    })
  };

  const download = (filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.setAttribute('download', filePath.split('/').pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExample = () => {
    download(downloadableFile);
  }



  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={`${title}`}
    >
      <div>
        <div className="grid gap-4">
          <div className="gap-4">
            <Button
                className="rounded-none bg-slate-500 h-[30px] mb-2"
                onClick={() => {downloadExample()}}
            >Download Example</Button>
            <HrInput
              name="file"
              label="Upload Files"
              required
              type="file"
              accept="*"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="float-end mt-5">
          <Button
            className="rounded-none h-7"
            // disabled={loading}
            onClick={() => {handleOnSubmit()}}
          >
            Submit
          </Button>
        </div>
      </div>
    </HrModal>
  );
};

export default ImportBox;
