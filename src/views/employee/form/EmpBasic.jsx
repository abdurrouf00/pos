import HrInput from "@/components/common/HrInput";
import HrSelect from "@/components/common/HrSelect";
import Loading from "@/components/ui/loading";
import { Upload, X } from "lucide-react";
import { useRef } from "react";
import { bindEmployeeData } from "../store";
import { useDispatch, useSelector } from "react-redux";

const BasicInfo = ({ handleChange, loading, errors }) => {
  const imageRef = useRef(null);
  const signatureRef = useRef(null);
  const { profileImage, signatureImage, basicEmployeeData } = useSelector(
    ({ employee }) => employee
  );
  const dispatch = useDispatch();
  if (loading) return <Loading />;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full  p-2 rounded-md">
        <HrInput
          label="Employee Name"
          name="name"
          value={basicEmployeeData?.name}
          onChange={handleChange}
          type="text"
          required={true}
          placeholder="Enter employee name"
          aria-invalid={errors?.name && !basicEmployeeData?.name}
        />
        <HrInput
          label="Short Name"
          name="short_name"
          value={basicEmployeeData?.short_name}
          onChange={handleChange}
          type="text"
          placeholder="Enter short name"
        />
        <HrInput
          label="Email"
          name="email"
          value={basicEmployeeData?.email}
          onChange={handleChange}
          placeholder="Enter email"
          type="email"
          aria-invalid={errors?.email && !basicEmployeeData?.email}
        />
        <HrInput
          label="Phone Number"
          name="phone_no"
          value={basicEmployeeData?.phone_no}
          onChange={handleChange}
          type="number"
          placeholder="Enter phone number"
        />
        <HrInput
          label="NID Number"
          name="nid_no"
          value={basicEmployeeData?.nid_no}
          onChange={handleChange}
          type="number"
          placeholder="Enter nid number"
          // aria-invalid={errors?.nid_no && !basicEmployeeData?.nid_no}
          error={errors?.nid_no?.message}
        />
        <HrInput
          label="Date of Birth"
          name="dob"
          value={basicEmployeeData?.dob ?? ""}
          onChange={handleChange}
          placeholder="Enter date of birth"
          type="date"
        />
        <HrSelect
          label="Gender"
          name="gender"
          value={basicEmployeeData?.gender}
          onChange={handleChange}
          placeholder="Enter gender"
          options={[
            { value: "1", label: "Male" },
            { value: "2", label: "Female" },
            { value: "3", label: "Other" },
          ]}
        />
        <HrInput
          label="Father's Name"
          name="father_name"
          value={basicEmployeeData?.father_name}
          onChange={handleChange}
          placeholder="Enter father's name"
          type="text"
        />
        <HrInput
          label="Mother's Name"
          name="mother_name"
          value={basicEmployeeData?.mother_name}
          onChange={handleChange}
          placeholder="Enter mother's name"
          type="text"
        />
        <HrInput
          label="Permanent Address"
          name="permanent_address"
          value={basicEmployeeData?.permanent_address}
          onChange={handleChange}
          placeholder="Enter permanent address"
          type="text"
        />
        <HrInput
          label="Present Address"
          name="present_address"
          value={basicEmployeeData?.present_address}
          onChange={handleChange}
          placeholder="Enter present address"
          type="text"
        />

        {/* <div className="flex flex-col space-y-1.5">
          {imagePreview && (
            <Image src={imagePreview} alt="Employee" width={100} height={100} />
          )}
          {signaturePreview && (
            <Image
              src={signaturePreview}
              alt="Signature"
              width={100}
              height={100}
            />
          )}
        </div> */}
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex justify-center items-center gap-2 border border-dashed relative min-h-20 rounded w-full">
          <input
            name="image"
            // value={basicEmployeeData?.image?.name}
            onChange={handleChange}
            placeholder="Enter image"
            type="file"
            accept="image/*"
            hidden
            ref={imageRef}
            className="absolute"
          />
          {!basicEmployeeData?.image ? (
            <div
              className="text-sm text-gray-500 flex items-center gap-2"
              onClick={() => imageRef.current.click()}
            >
              <Upload size={16} /> Upload Profile Image
            </div>
          ) : (
            <div className="relative border">
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-white rounded"
                onClick={() => {
                  dispatch(
                    bindEmployeeData({ ...basicEmployeeData, image: "" })
                  );
                  imageRef.current.value = null;
                }}
              >
                <X size={14} />
              </button>
              <img
                src={profileImage}
                alt="profile image"
                className="w-10 h-10 rounded object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-2 border border-dashed relative min-h-20 rounded w-full">
          <input
            name="signature"
            onChange={handleChange}
            placeholder="Enter signature"
            type="file"
            accept="image/*"
            hidden
            ref={signatureRef}
            className="absolute"
          />
          {!basicEmployeeData?.signature ? (
            <div
              className="text-sm text-gray-500 flex items-center gap-2"
              onClick={() => signatureRef.current.click()}
            >
              <Upload size={16} /> Upload Signature
            </div>
          ) : (
            <div className="relative border">
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-white rounded"
                onClick={() => {
                  dispatch(
                    bindEmployeeData({ ...basicEmployeeData, signature: "" })
                  );
                  signatureRef.current.value = null;
                }}
              >
                <X size={16} />
              </button>
              <img
                src={signatureImage}
                alt="signature"
                className="w-10 h-10 rounded object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
