import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required."),
  nameWinitials: Yup.string().required("Name with Initials is required."),
  nameInFull: Yup.string().required("Full Name is required."),
  // firstName: Yup.string().required('First Name is required.'),
  // lastName : Yup.string().required('Last Name is required.'),
  gender: Yup.string().required("Gender is required."),
  nic: Yup.string()
    .matches(/^([0-9]{9}[X|V]|[0-9]{12})$/, "Invalid NIC")
    .required("National Identity Card Number is required."),
  dob: Yup.string().required("Date of Birth is required."),
  residenceAddress: Yup.string(),
  //   resAddOne: Yup.string(),
  //   resAddTwo: Yup.string(),
  //   resAddThree: Yup.string(),
  //   resAddFour: Yup.string(),
  //   resAddFive: Yup.string(),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  perAddrsAvai: Yup.boolean(),
  permanentAddress: Yup.string(),
  //   perAddOne: Yup.string(),
  //   perAddTwo: Yup.string(),
  //   perAddThree: Yup.string(),
  //   perAddFour: Yup.string(),
  //   perAddFive: Yup.string(),
  mobileNo: Yup.string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Invalid Contact Number"
    )
    .required("Mobile Contact Number is Required"),
  landNo: Yup.string().matches(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    "Invalid Contact Number"
  ),
  //.required("Land Contact Number is Required"),
  designation: Yup.string().required("Designation is Required"),
  division: Yup.string(),
  placeWork: Yup.string(),
  officeAddress: Yup.string(),
  // offAddrslineOne: Yup.string(),
  // offAddrslineTwo: Yup.string(),
  // offAddrslineThree: Yup.string(),
  // offAddrslineFour: Yup.string(),
  // offAddrslineFive: Yup.string(),
  offMobile: Yup.string().matches(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    "Invalid Contact Number"
  ),
  offLandNo: Yup.string().matches(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    "Invalid Contact Number"
  ),
  offEmail: Yup.string().email("Invalid Email"),
  offFax: Yup.string().matches(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    "Invalid Contact Number"
  ),
  profession: Yup.string(),
  gradeOfMem: Yup.string().required("Membership Grade is Required"),
  section: Yup.string().required("Membership Section is Required"),
  memBefore: Yup.boolean(),
  memFrom: Yup.string(),
  memTo: Yup.string(),
  sendingAddrs: Yup.string().required("Preffered Address is Required"),
  status: Yup.string(),
  enrollDate: Yup.string(),
});

export default validationSchema;
