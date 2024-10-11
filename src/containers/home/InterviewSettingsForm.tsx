import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import * as Yup from "yup";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const dataContext = useData();
  

  



  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
    }),
    onSubmit: (values) => {
      if (dataContext) {
        dataContext.setState((prevState: any) => ({
          ...prevState,
          interviewSettings: values,
        }))
        console.log({ values });
        alert("Form successfully submitted");
      }
    },
  });

  const handleRealTimeSelect = (field: string, selectedOption: any) => {
    const value = selectedOption.value;
    setFieldValue(field, value);
    if (dataContext) {
      dataContext.setState((prevState: any) => ({
        ...prevState,
        interviewSettings: {
          ...prevState.interviewSettings,
          [field]: value,
        }
      }))
    }
  }

  if (!dataContext) {
    return <div>Error: Data context not available</div>
  }

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(option: any) => handleRealTimeSelect("interviewMode", option)}
          onBlur={() => setFieldTouched("interviewMode", true)}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(option: any) => handleRealTimeSelect("interviewDuration", option)}
          onBlur={() => setFieldTouched("interviewDuration", true)}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(option: any)  => handleRealTimeSelect("interviewLanguage", option)}
          onBlur={() => setFieldTouched("interviewLanguage", true)}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
