import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const dataContext = useData();

  if (!dataContext) {
    return <div>Error: Data context not available</div>
  }

  const { state, setState } = dataContext;
  
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: dataContext?.state?.requisitionDetails?.requisitionTitle || "",
      noOfOpenings: dataContext?.state?.requisitionDetails?.noOfOpenings || 0,
      urgency: dataContext?.state.requisitionDetails?.urgency || "",
      gender: dataContext?.state.requisitionDetails?.gender || "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      if (dataContext) {
        setState((prevState: any) => ({
          ...prevState,
          requisitionDetails: values,
        }))
        handleTab(1);
        console.log("state", state);
      }
      
    },
  });

  const handleRealTimeChange = (e: React.ChangeEvent<any>) => {
    handleChange(e);
    setState((prevState: any) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleRealTimeSelect = (field: string, selectedOption: any) => {
    const value = selectedOption.value;
    setFieldValue(field, value);
    setState((prevState: any) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [field]: value,
      }
    }))
  }

  

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleRealTimeChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleRealTimeChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(option: any) => handleRealTimeSelect("gender", option)}
          onBlur={() => setFieldTouched("gender", true)}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(option: any) => handleRealTimeSelect("urgency", option)}
          onBlur={() => setFieldTouched("urgency", true)}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
