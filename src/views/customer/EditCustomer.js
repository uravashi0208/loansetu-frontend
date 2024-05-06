import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Divider,
  CircularProgress,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { gridSpacing, gridSpacings } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import GetRequest from 'commonRequest/getRequest';
import { useLocation, useNavigate } from 'react-router';
// useNavigate;
import GetByIdRequest from 'commonRequest/getByIdRequest';
import { useAlert } from 'ui-component/alert/alert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import PostRequest from 'commonRequest/postRequest';
import UpdateFormRequest from 'commonRequest/updatefoemRequest';
import GetRequestOnRole from 'commonRequest/getRequestRole';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EditCustomer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [checked, setChecked] = useState(false);
  const { showAlert, AlertComponent } = useAlert();
  const location = useLocation();
  const tokenValue = localStorage.getItem('token');
  const roleData = JSON.parse(tokenValue);
  const [examinationDetails, setExaminationDetails] = useState([{ examination: '', passingYear: '', percentage: '', school_name: '' }]);

  const [expanded, setExpanded] = useState(false);

  const status = [
    {
      value: 'single',
      label: 'Single'
    },
    {
      value: 'married',
      label: 'Married'
    },
    {
      value: 'un-married',
      label: 'Un-Married'
    }
  ];

  const relation = [
    {
      value: 'self',
      label: 'Self'
    },
    {
      value: 'father',
      label: 'Father'
    },
    {
      value: 'mother',
      label: 'Mother'
    },
    {
      value: 'sister',
      label: 'Sister'
    },
    {
      value: 'brother',
      label: 'Brother'
    },
    {
      value: 'uncle',
      label: 'Uncle'
    },
    {
      value: 'aunty',
      label: 'Aunty'
    }
  ];

  const handleChangeCollapses = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (location && location.state !== null) {
      getStudentById(location.state);
    }
    getAllCountry();
  }, []);

  const getStudentById = async (id) => {
    const response = await GetByIdRequest('/student/getcustomerbyid/', id);
    if (response.response === true) {
      setStudentData(response.data);
      setExaminationDetails(response.data[0].applicantDetails.education);
    }
  };

  const getAllCountry = async () => {
    const response = await GetRequest('/university/getcountry');
    if (response.data) {
      setCountryData(response.data);
    }
  };

  const getUniversitiesByCountry = async (country) => {
    if (country !== undefined) {
      const response = await GetRequestOnRole('/university/getuniversitybycountry/', country);
      if (response.data) {
        setUniversityData(response.data);
      }
    }
  };

  const handleAddDetail = () => {
    setExaminationDetails([...examinationDetails, { examination: '', passingYear: '', percentage: '', school_name: '' }]);
  };
  const handleChangeDetail = (i, e) => {
    let newFormValues = [...examinationDetails];
    newFormValues[i][e.target.name] = e.target.value;
    setExaminationDetails(newFormValues);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...examinationDetails];
    updatedDetails.splice(index, 1);
    setExaminationDetails(updatedDetails);
  };

  const initialValues = {
    student_name: studentData[0]?.applicantDetails?.student_name ? studentData[0]?.applicantDetails?.student_name : '',
    relation_with_student: studentData[0]?.applicantDetails?.relation_with_student
      ? studentData[0]?.applicantDetails?.relation_with_student
      : '',
    dob: studentData[0]?.applicantDetails?.dob ? studentData[0]?.applicantDetails?.dob : '',
    aadhar_no: studentData[0]?.applicantDetails?.aadhar_no ? studentData[0]?.applicantDetails?.aadhar_no : '',
    pan_no: studentData[0]?.applicantDetails?.pan_no ? studentData[0]?.applicantDetails?.pan_no : '',
    passport: studentData[0]?.applicantDetails?.passport ? studentData[0]?.applicantDetails?.passport : '',
    marital_status: studentData[0]?.applicantDetails?.marital_status ? studentData[0]?.applicantDetails?.marital_status : '',
    phone: studentData[0]?.applicantDetails?.phone ? studentData[0]?.applicantDetails?.phone : '',
    height: studentData[0]?.applicantDetails?.height ? studentData[0]?.applicantDetails?.height : '',
    weight: studentData[0]?.applicantDetails?.weight ? studentData[0]?.applicantDetails?.weight : '',
    email: studentData[0]?.applicantDetails?.email ? studentData[0]?.applicantDetails?.email : '',
    father_full_name: studentData[0]?.applicantDetails?.father_full_name ? studentData[0]?.applicantDetails?.father_full_name : '',
    mother_full_name: studentData[0]?.applicantDetails?.mother_full_name ? studentData[0]?.applicantDetails?.mother_full_name : '',
    resident_address: studentData[0]?.applicantDetails?.resident_address ? studentData[0]?.applicantDetails?.resident_address : '',
    pincode: studentData[0]?.applicantDetails?.pincode ? studentData[0]?.applicantDetails?.pincode : '',
    permanent_address: studentData[0]?.applicantDetails?.permanent_address ? studentData[0]?.applicantDetails?.permanent_address : '',
    permanent_pincode: studentData[0]?.applicantDetails?.permanent_pincode ? studentData[0]?.applicantDetails?.permanent_pincode : '',
    year_in_current_address: studentData[0]?.applicantDetails?.year_in_current_address
      ? studentData[0]?.applicantDetails?.year_in_current_address
      : '',
    reference_name: studentData[0]?.applicantDetails?.reference_name ? studentData[0]?.applicantDetails?.reference_name : '',
    reference_phone_no: studentData[0]?.applicantDetails?.reference_phone_no ? studentData[0]?.applicantDetails?.reference_phone_no : '',
    reference_address: studentData[0]?.applicantDetails?.reference_address ? studentData[0]?.applicantDetails?.reference_address : '',
    loan_amount_required: studentData[0]?.applicantDetails?.loan_amount_required
      ? studentData[0]?.applicantDetails?.loan_amount_required
      : '',
    exam: studentData[0]?.applicantDetails?.exam ? studentData[0]?.applicantDetails?.exam : '',
    listening: studentData[0]?.applicantDetails?.listening ? studentData[0]?.applicantDetails?.listening : '',
    reading: studentData[0]?.applicantDetails?.reading ? studentData[0]?.applicantDetails?.reading : '',
    writing: studentData[0]?.applicantDetails?.writing ? studentData[0]?.applicantDetails?.writing : '',
    speaking: studentData[0]?.applicantDetails?.speaking ? studentData[0]?.applicantDetails?.speaking : '',
    country: studentData[0]?.applicantDetails?.country ? studentData[0]?.applicantDetails?.country : '',
    university: studentData[0]?.applicantDetails?.university ? studentData[0]?.applicantDetails?.university : '',
    course_name: studentData[0]?.applicantDetails?.course_name ? studentData[0]?.applicantDetails?.course_name : '',
    type_of_employment: studentData[0]?.applicantDetails?.type_of_employment ? studentData[0]?.applicantDetails?.type_of_employment : '',
    company_name: studentData[0]?.applicantDetails?.company_name ? studentData[0]?.applicantDetails?.company_name : '',
    applicant_designation: studentData[0]?.applicantDetails?.applicant_designation
      ? studentData[0]?.applicantDetails?.applicant_designation
      : '',
    work_experience: studentData[0]?.applicantDetails?.work_experience ? studentData[0]?.applicantDetails?.work_experience : '',
    current_work_experience: studentData[0]?.applicantDetails?.current_work_experience
      ? studentData[0]?.applicantDetails?.current_work_experience
      : '',
    bussiness_address: studentData[0]?.applicantDetails?.bussiness_address ? studentData[0]?.applicantDetails?.bussiness_address : '',
    bussiness_pincode: studentData[0]?.applicantDetails?.bussiness_pincode ? studentData[0]?.applicantDetails?.bussiness_pincode : '',
    net_monthly_income: studentData[0]?.applicantDetails?.net_monthly_income ? studentData[0]?.applicantDetails?.net_monthly_income : '',
    other_income: studentData[0]?.applicantDetails?.other_income ? studentData[0]?.applicantDetails?.other_income : '',
    gold: studentData[0]?.applicantDetails?.gold ? studentData[0]?.applicantDetails?.gold : '',
    land: studentData[0]?.applicantDetails?.land ? studentData[0]?.applicantDetails?.land : '',
    life_insurance_policy: studentData[0]?.applicantDetails?.life_insurance_policy
      ? studentData[0]?.applicantDetails?.life_insurance_policy
      : '',
    property: studentData[0]?.applicantDetails?.property ? studentData[0]?.applicantDetails?.property : '',
    shares: studentData[0]?.applicantDetails?.shares ? studentData[0]?.applicantDetails?.shares : '',
    rent_income: studentData[0]?.applicantDetails?.rent_income ? studentData[0]?.applicantDetails?.rent_income : '',
    bank_balance: studentData[0]?.applicantDetails?.bank_balance ? studentData[0]?.applicantDetails?.bank_balance : '',
    bank_name: studentData[0]?.applicantDetails?.bank_name ? studentData[0]?.applicantDetails?.bank_name : '',
    account_number: studentData[0]?.applicantDetails?.account_number ? studentData[0]?.applicantDetails?.account_number : '',
    ifsc_code: studentData[0]?.applicantDetails?.ifsc_code ? studentData[0]?.applicantDetails?.ifsc_code : '',
    currently_running_loan_bank: studentData[0]?.applicantDetails?.currently_running_loan_bank
      ? studentData[0]?.applicantDetails?.currently_running_loan_bank
      : '',
    currently_running_loan_type: studentData[0]?.applicantDetails?.currently_running_loan_type
      ? studentData[0]?.applicantDetails?.currently_running_loan_type
      : '',
    currently_running_loan_sanction_amount: studentData[0]?.applicantDetails?.currently_running_loan_sanction_amount
      ? studentData[0]?.applicantDetails?.currently_running_loan_sanction_amount
      : '',
    currently_running_loan_emi: studentData[0]?.applicantDetails?.currently_running_loan_emi
      ? studentData[0]?.applicantDetails?.currently_running_loan_emi
      : '',
    co_applicant1_name: studentData[0]?.co_applicant1_name ? studentData[0]?.co_applicant1_name : '',
    co_applicant1_relation_with_student: studentData[0]?.co_applicant1_relation_with_student
      ? studentData[0]?.co_applicant1_relation_with_student
      : '',
    co_applicant1_dob: studentData[0]?.co_applicant1_dob ? studentData[0]?.co_applicant1_dob : '',
    co_applicant1_aadhar_no: studentData[0]?.co_applicant1_aadhar_no ? studentData[0]?.co_applicant1_aadhar_no : '',
    co_applicant1_pan_no: studentData[0]?.co_applicant1_pan_no ? studentData[0]?.co_applicant1_pan_no : '',
    co_applicant1_passport: studentData[0]?.co_applicant1_passport ? studentData[0]?.co_applicant1_passport : '',
    co_applicant1_marital_status: studentData[0]?.co_applicant1_marital_status ? studentData[0]?.co_applicant1_marital_status : '',
    co_applicant1_phone: studentData[0]?.co_applicant1_phone ? studentData[0]?.co_applicant1_phone : '',
    co_applicant1_height: studentData[0]?.co_applicant1_height ? studentData[0]?.co_applicant1_height : '',
    co_applicant1_weight: studentData[0]?.co_applicant1_weight ? studentData[0]?.co_applicant1_weight : '',
    co_applicant1_email: studentData[0]?.co_applicant1_email ? studentData[0]?.co_applicant1_email : '',
    co_applicant1_father_full_name: studentData[0]?.co_applicant1_father_full_name ? studentData[0]?.co_applicant1_father_full_name : '',
    co_applicant1_mother_full_name: studentData[0]?.co_applicant1_mother_full_name ? studentData[0]?.co_applicant1_mother_full_name : '',
    co_applicant1_resident_address: studentData[0]?.co_applicant1_resident_address ? studentData[0]?.co_applicant1_resident_address : '',
    co_applicant1_pincode: studentData[0]?.co_applicant1_pincode ? studentData[0]?.co_applicant1_pincode : '',
    co_applicant1_permanent_address: studentData[0]?.co_applicant1_permanent_address ? studentData[0]?.co_applicant1_permanent_address : '',
    co_applicant1_permanent_pincode: studentData[0]?.co_applicant1_permanent_pincode ? studentData[0]?.co_applicant1_permanent_pincode : '',
    co_applicant1_year_in_current_address: studentData[0]?.co_applicant1_year_in_current_address
      ? studentData[0]?.co_applicant1_year_in_current_address
      : '',
    co_applicant1_reference_name: studentData[0]?.co_applicant1_reference_name ? studentData[0]?.co_applicant1_reference_name : '',
    co_applicant1_reference_phone_no: studentData[0]?.co_applicant1_reference_phone_no
      ? studentData[0]?.co_applicant1_reference_phone_no
      : '',
    co_applicant1_reference_address: studentData[0]?.co_applicant1_reference_address ? studentData[0]?.co_applicant1_reference_address : '',
    co_applicant1_loan_amount_required: studentData[0]?.co_applicant1_loan_amount_required
      ? studentData[0]?.co_applicant1_loan_amount_required
      : '',
    co_applicant1_type_of_employment: studentData[0]?.co_applicant1_type_of_employment
      ? studentData[0]?.co_applicant1_type_of_employment
      : '',
    co_applicant1_company_name: studentData[0]?.co_applicant1_company_name ? studentData[0]?.co_applicant1_company_name : '',
    co_applicant1_applicant_designation: studentData[0]?.co_applicant1_applicant_designation
      ? studentData[0]?.co_applicant1_applicant_designation
      : '',
    co_applicant1_work_experience: studentData[0]?.co_applicant1_work_experience ? studentData[0]?.co_applicant1_work_experience : '',
    co_applicant1_current_work_experience: studentData[0]?.co_applicant1_current_work_experience
      ? studentData[0]?.co_applicant1_current_work_experience
      : '',
    co_applicant1_bussiness_address: studentData[0]?.co_applicant1_bussiness_address ? studentData[0]?.co_applicant1_bussiness_address : '',
    co_applicant1_bussiness_pincode: studentData[0]?.co_applicant1_bussiness_pincode ? studentData[0]?.co_applicant1_bussiness_pincode : '',
    co_applicant1_net_monthly_income: studentData[0]?.co_applicant1_net_monthly_income
      ? studentData[0]?.co_applicant1_net_monthly_income
      : '',
    co_applicant1_other_income: studentData[0]?.co_applicant1_other_income ? studentData[0]?.co_applicant1_other_income : '',
    co_applicant1_gold: studentData[0]?.co_applicant1_gold ? studentData[0]?.co_applicant1_gold : '',
    co_applicant1_land: studentData[0]?.co_applicant1_land ? studentData[0]?.co_applicant1_land : '',
    co_applicant1_life_insurance_policy: studentData[0]?.co_applicant1_life_insurance_policy
      ? studentData[0]?.co_applicant1_life_insurance_policy
      : '',
    co_applicant1_property: studentData[0]?.co_applicant1_property ? studentData[0]?.co_applicant1_property : '',
    co_applicant1_shares: studentData[0]?.co_applicant1_shares ? studentData[0]?.co_applicant1_shares : '',
    co_applicant1_rent_income: studentData[0]?.co_applicant1_rent_income ? studentData[0]?.co_applicant1_rent_income : '',
    co_applicant1_bank_balance: studentData[0]?.co_applicant1_bank_balance ? studentData[0]?.co_applicant1_bank_balance : '',
    co_applicant1_bank_name: studentData[0]?.co_applicant1_bank_name ? studentData[0]?.co_applicant1_bank_name : '',
    co_applicant1_account_number: studentData[0]?.co_applicant1_account_number ? studentData[0]?.co_applicant1_account_number : '',
    co_applicant1_ifsc_code: studentData[0]?.co_applicant1_ifsc_code ? studentData[0]?.co_applicant1_ifsc_code : '',
    co_applicant1_currently_running_loan_bank: studentData[0]?.co_applicant1_currently_running_loan_bank
      ? studentData[0]?.co_applicant1_currently_running_loan_bank
      : '',
    co_applicant1_currently_running_loan_type: studentData[0]?.co_applicant1_currently_running_loan_type
      ? studentData[0]?.co_applicant1_currently_running_loan_type
      : '',
    co_applicant1_currently_running_loan_sanction_amount: studentData[0]?.co_applicant1_currently_running_loan_sanction_amount
      ? studentData[0]?.co_applicant1_currently_running_loan_sanction_amount
      : '',
    co_applicant1_currently_running_loan_emi: studentData[0]?.co_applicant1_currently_running_loan_emi
      ? studentData[0]?.co_applicant1_currently_running_loan_emi
      : '',

    co_applicant2_name: studentData[0]?.co_applicant2_name ? studentData[0]?.co_applicant2_name : '',
    co_applicant2_relation_with_student: studentData[0]?.co_applicant2_relation_with_student
      ? studentData[0]?.co_applicant2_relation_with_student
      : '',
    co_applicant2_dob: studentData[0]?.co_applicant2_dob ? studentData[0]?.co_applicant2_dob : '',
    co_applicant2_aadhar_no: studentData[0]?.co_applicant2_aadhar_no ? studentData[0]?.co_applicant2_aadhar_no : '',
    co_applicant2_pan_no: studentData[0]?.co_applicant2_pan_no ? studentData[0]?.co_applicant2_pan_no : '',
    co_applicant2_passport: studentData[0]?.co_applicant2_passport ? studentData[0]?.co_applicant2_passport : '',
    co_applicant2_marital_status: studentData[0]?.co_applicant2_marital_status ? studentData[0]?.co_applicant2_marital_status : '',
    co_applicant2_phone: studentData[0]?.co_applicant2_phone ? studentData[0]?.co_applicant2_phone : '',
    co_applicant2_height: studentData[0]?.co_applicant2_height ? studentData[0]?.co_applicant2_height : '',
    co_applicant2_weight: studentData[0]?.co_applicant2_weight ? studentData[0]?.co_applicant2_weight : '',
    co_applicant2_email: studentData[0]?.co_applicant2_email ? studentData[0]?.co_applicant2_email : '',
    co_applicant2_father_full_name: studentData[0]?.co_applicant2_father_full_name ? studentData[0]?.co_applicant2_father_full_name : '',
    co_applicant2_mother_full_name: studentData[0]?.co_applicant2_mother_full_name ? studentData[0]?.co_applicant2_mother_full_name : '',
    co_applicant2_resident_address: studentData[0]?.co_applicant2_resident_address ? studentData[0]?.co_applicant2_resident_address : '',
    co_applicant2_pincode: studentData[0]?.co_applicant2_pincode ? studentData[0]?.co_applicant2_pincode : '',
    co_applicant2_permanent_address: studentData[0]?.co_applicant2_permanent_address ? studentData[0]?.co_applicant2_permanent_address : '',
    co_applicant2_permanent_pincode: studentData[0]?.co_applicant2_permanent_pincode ? studentData[0]?.co_applicant2_permanent_pincode : '',
    co_applicant2_year_in_current_address: studentData[0]?.co_applicant2_year_in_current_address
      ? studentData[0]?.co_applicant2_year_in_current_address
      : '',
    co_applicant2_reference_name: studentData[0]?.co_applicant2_reference_name ? studentData[0]?.co_applicant2_reference_name : '',
    co_applicant2_reference_phone_no: studentData[0]?.co_applicant2_reference_phone_no
      ? studentData[0]?.co_applicant2_reference_phone_no
      : '',
    co_applicant2_reference_address: studentData[0]?.co_applicant2_reference_address ? studentData[0]?.co_applicant2_reference_address : '',
    co_applicant2_loan_amount_required: studentData[0]?.co_applicant2_loan_amount_required
      ? studentData[0]?.co_applicant2_loan_amount_required
      : '',
    co_applicant2_type_of_employment: studentData[0]?.co_applicant2_type_of_employment
      ? studentData[0]?.co_applicant2_type_of_employment
      : '',
    co_applicant2_company_name: studentData[0]?.co_applicant2_company_name ? studentData[0]?.co_applicant2_company_name : '',
    co_applicant2_applicant_designation: studentData[0]?.co_applicant2_applicant_designation
      ? studentData[0]?.co_applicant2_applicant_designation
      : '',
    co_applicant2_work_experience: studentData[0]?.co_applicant2_work_experience ? studentData[0]?.co_applicant2_work_experience : '',
    co_applicant2_current_work_experience: studentData[0]?.co_applicant2_current_work_experience
      ? studentData[0]?.co_applicant2_current_work_experience
      : '',
    co_applicant2_bussiness_address: studentData[0]?.co_applicant2_bussiness_address ? studentData[0]?.co_applicant2_bussiness_address : '',
    co_applicant2_bussiness_pincode: studentData[0]?.co_applicant2_bussiness_pincode ? studentData[0]?.co_applicant2_bussiness_pincode : '',
    co_applicant2_net_monthly_income: studentData[0]?.co_applicant2_net_monthly_income
      ? studentData[0]?.co_applicant2_net_monthly_income
      : '',
    co_applicant2_other_income: studentData[0]?.co_applicant2_other_income ? studentData[0]?.co_applicant2_other_income : '',
    co_applicant2_gold: studentData[0]?.co_applicant2_gold ? studentData[0]?.co_applicant2_gold : '',
    co_applicant2_land: studentData[0]?.co_applicant2_land ? studentData[0]?.co_applicant2_land : '',
    co_applicant2_life_insurance_policy: studentData[0]?.co_applicant2_life_insurance_policy
      ? studentData[0]?.co_applicant2_life_insurance_policy
      : '',
    co_applicant2_property: studentData[0]?.co_applicant2_property ? studentData[0]?.co_applicant2_property : '',
    co_applicant2_shares: studentData[0]?.co_applicant2_shares ? studentData[0]?.co_applicant2_shares : '',
    co_applicant2_rent_income: studentData[0]?.co_applicant2_rent_income ? studentData[0]?.co_applicant2_rent_income : '',
    co_applicant2_bank_balance: studentData[0]?.co_applicant2_bank_balance ? studentData[0]?.co_applicant2_bank_balance : '',
    co_applicant2_bank_name: studentData[0]?.co_applicant2_bank_name ? studentData[0]?.co_applicant2_bank_name : '',
    co_applicant2_account_number: studentData[0]?.co_applicant2_account_number ? studentData[0]?.co_applicant2_account_number : '',
    co_applicant2_ifsc_code: studentData[0]?.co_applicant2_ifsc_code ? studentData[0]?.co_applicant2_ifsc_code : '',
    co_applicant2_currently_running_loan_bank: studentData[0]?.co_applicant2_currently_running_loan_bank
      ? studentData[0]?.co_applicant2_currently_running_loan_bank
      : '',
    co_applicant2_currently_running_loan_type: studentData[0]?.co_applicant2_currently_running_loan_type
      ? studentData[0]?.co_applicant2_currently_running_loan_type
      : '',
    co_applicant2_currently_running_loan_sanction_amount: studentData[0]?.co_applicant2_currently_running_loan_sanction_amount
      ? studentData[0]?.co_applicant2_currently_running_loan_sanction_amount
      : '',
    co_applicant2_currently_running_loan_emi: studentData[0]?.co_applicant2_currently_running_loan_emi
      ? studentData[0]?.co_applicant2_currently_running_loan_emi
      : '',
    edit_customer: 'edit_customer',
    createdBy: roleData.data._id
  };
  return (
    <>
      <MainCard title="Edit Customer">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            student_name: Yup.string().required('Name is required'),
            relation_with_student: Yup.string().required('Relation with student is required'),
            phone: Yup.string().max(10).min(10).required('Phone number is required'),
            dob: Yup.string().required('Date of birth is required'),
            aadhar_no: Yup.string().required('Aadhar number is required'),
            pan_no: Yup.string().required('Pan number is required'),
            passport: Yup.string().required('Passport is required'),
            marital_status: Yup.string().required('Marital Staus is required'),
            height: Yup.string().required('Height is required'),
            weight: Yup.string().required('Weight is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            father_full_name: Yup.string().required('Father Full Name is required'),
            mother_full_name: Yup.string().required('Mother Full Name is required'),
            resident_address: Yup.string().required('Resident Address is required'),
            pincode: Yup.string().required('Pincode is required'),
            permanent_address: Yup.string().required('Permanent Address is required'),
            permanent_pincode: Yup.string().required('Pincode is required'),
            year_in_current_address: Yup.string().required('Year is required'),
            reference_name: Yup.string().required('Reference Name is required'),
            reference_phone_no: Yup.string().required('Phone number is required'),
            reference_address: Yup.string().required('Address is required'),
            loan_amount_required: Yup.string().required('Loan Amount is required'),
            exam: Yup.string().required('Exam is required'),
            listening: Yup.string().required('Listening is required'),
            reading: Yup.string().required('Reading is required'),
            writing: Yup.string().required('Writing is required'),
            speaking: Yup.string().required('Speaking is required'),
            university: Yup.string().required('University is required'),
            country: Yup.string().required('Country is required'),
            course_name: Yup.string().required('Course Name is required'),
            bank_name: Yup.string().required('Bank Name is required'),
            account_number: Yup.string().required('Account Number is required'),
            ifsc_code: Yup.string().required('IFSC Code is required'),
            co_applicant1_name: Yup.string().required('Name is required'),
            co_applicant1_relation_with_student: Yup.string().required('Relation with student is required'),
            co_applicant1_phone: Yup.string().max(10).min(10).required('Phone number is required'),
            co_applicant1_dob: Yup.string().required('Date of birth is required'),
            co_applicant1_aadhar_no: Yup.string().required('Aadhar number is required'),
            co_applicant1_pan_no: Yup.string().required('Pan number is required'),
            co_applicant1_marital_status: Yup.string().required('Marital Staus is required'),
            co_applicant1_father_full_name: Yup.string().required('Father Full Name is required'),
            co_applicant1_mother_full_name: Yup.string().required('Mother Full Name is required'),
            co_applicant1_resident_address: Yup.string().required('Resident Address is required'),
            co_applicant1_pincode: Yup.string().required('Pincode is required'),
            co_applicant1_permanent_address: Yup.string().required('Permanent Address is required'),
            co_applicant1_permanent_pincode: Yup.string().required('Pincode is required'),
            co_applicant1_year_in_current_address: Yup.string().required('Year is required'),
            co_applicant1_bank_name: Yup.string().required('Bank Name is required'),
            co_applicant1_account_number: Yup.string().required('Account Number is required'),
            co_applicant1_ifsc_code: Yup.string().required('IFSC Code is required'),
            co_applicant1_type_of_employment: Yup.string().required('Type of Employement is required'),

            co_applicant2_name: Yup.string().required('Name is required'),
            co_applicant2_relation_with_student: Yup.string().required('Relation with student is required'),
            co_applicant2_phone: Yup.string().max(10).min(10).required('Phone number is required'),
            co_applicant2_dob: Yup.string().required('Date of birth is required'),
            co_applicant2_aadhar_no: Yup.string().required('Aadhar number is required'),
            co_applicant2_pan_no: Yup.string().required('Pan number is required'),
            co_applicant2_marital_status: Yup.string().required('Marital Staus is required'),
            co_applicant2_email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            co_applicant2_father_full_name: Yup.string().required('Father Full Name is required'),
            co_applicant2_mother_full_name: Yup.string().required('Mother Full Name is required'),
            co_applicant2_resident_address: Yup.string().required('Resident Address is required'),
            co_applicant2_pincode: Yup.string().required('Pincode is required'),
            co_applicant2_permanent_address: Yup.string().required('Permanent Address is required'),
            co_applicant2_permanent_pincode: Yup.string().required('Pincode is required')
          })}
          onSubmit={async (values) => {
            try {
              const valuesWithDetails = { ...values, examinationDetails };
              setLoading(true);
              let response = await UpdateFormRequest('/student/editstudent/', valuesWithDetails, studentData[0]?._id);
              if (response && response.response === true) {
                showAlert(response.message, 'success');
                setTimeout(() => {
                  setLoading(false);
                  navigate('/customer');
                }, 1000);
              } else {
                setLoading(false);
                showAlert(response.message, 'error');
              }
            } catch (err) {
              setLoading(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Accordion expanded={expanded === 'panel1'} onChange={handleChangeCollapses('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                  <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h4">
                    APPLICANT(Student)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                      Student Information
                    </Typography>
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.student_name && errors.student_name)}>
                            <TextField
                              id="outlined-adornment-student_name"
                              type="text"
                              value={values.student_name}
                              name="student_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Student Full Name"
                              error={Boolean(touched.student_name && errors.student_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.student_name && errors.student_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.student_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth error={Boolean(touched.relation_with_student && errors.relation_with_student)}>
                            <InputLabel outlined>Relation with student</InputLabel>
                            <Select
                              id="outlined-adornment-relation_with_student"
                              value={values.relation_with_student}
                              label="Relation with student"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="relation_with_student"
                            >
                              <MenuItem value="" disabled>
                                <em>None</em>
                              </MenuItem>
                              {relation.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.relation_with_student && errors.relation_with_student && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.relation_with_student}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth error={Boolean(touched.dob && errors.dob)}>
                            <TextField
                              id="outlined-adornment-dob"
                              type="date"
                              value={values.dob}
                              name="dob"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Date of Birth"
                              error={Boolean(touched.dob && errors.dob)}
                              variant="outlined" // Add this line
                            />
                            {touched.dob && errors.dob && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.dob}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.aadhar_no && errors.aadhar_no)}>
                            <TextField
                              id="outlined-adornment-aadhar_no"
                              type="text"
                              value={values.aadhar_no}
                              name="aadhar_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="AADHAR NO."
                              error={Boolean(touched.aadhar_no && errors.aadhar_no)}
                              variant="outlined" // Add this line
                            />
                            {touched.aadhar_no && errors.aadhar_no && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.aadhar_no}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.pan_no && errors.pan_no)}>
                            <TextField
                              id="outlined-adornment-pan_no"
                              type="text"
                              value={values.pan_no}
                              name="pan_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.pan_no && errors.pan_no)}
                              label="PAN NO."
                              variant="outlined" // Add this line
                            />
                            {touched.pan_no && errors.pan_no && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.pan_no}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.passport && errors.passport)}>
                            <TextField
                              id="outlined-adornment-passport"
                              type="text"
                              value={values.passport}
                              name="passport"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.passport && errors.passport)}
                              label="PASSPORT"
                              variant="outlined" // Add this line
                            />
                            {touched.passport && errors.passport && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.passport}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth error={Boolean(touched.marital_status && errors.marital_status)}>
                            <InputLabel outlined>Marital Status</InputLabel>
                            <Select
                              id="outlined-adornment-marital_status"
                              value={values.marital_status}
                              label="Marital Status"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="marital_status"
                            >
                              <MenuItem value="" disabled>
                                <em>None</em>
                              </MenuItem>
                              {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.marital_status && errors.marital_status && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.marital_status}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                            <TextField
                              id="outlined-adornment-phone"
                              type="number"
                              value={values.phone}
                              name="phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Phone Number"
                              error={Boolean(touched.phone && errors.phone)}
                              variant="outlined" // Add this line
                            />
                            {touched.phone && errors.phone && (
                              <FormHelperText error id="standard-weight-helper-text-phone">
                                {errors.phone}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth error={Boolean(touched.height && errors.height)}>
                            <TextField
                              id="outlined-adornment-height"
                              type="text"
                              value={values.height}
                              name="height"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.height && errors.height)}
                              label="Height"
                              variant="outlined" // Add this line
                            />
                            {touched.height && errors.height && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.height}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth error={Boolean(touched.weight && errors.weight)}>
                            <TextField
                              id="outlined-adornment-weight"
                              type="text"
                              value={values.weight}
                              name="weight"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.weight && errors.weight)}
                              label="Weight"
                              variant="outlined" // Add this line
                            />
                            {touched.weight && errors.weight && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.weight}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                            <TextField
                              id="outlined-adornment-email"
                              type="email"
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Email"
                              error={Boolean(touched.email && errors.email)}
                              variant="outlined" // Add this line
                            />
                            {touched.email && errors.email && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.email}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                      Family Details
                    </Typography>
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.father_full_name && errors.father_full_name)}>
                            <TextField
                              id="outlined-adornment-father_full_name"
                              type="text"
                              value={values.father_full_name}
                              name="father_full_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Father Full Name"
                              error={Boolean(touched.father_full_name && errors.father_full_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.father_full_name && errors.father_full_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.father_full_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.mother_full_name && errors.mother_full_name)}>
                            <TextField
                              id="outlined-adornment-mother_full_name"
                              type="text"
                              value={values.mother_full_name}
                              name="mother_full_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Mother Full Name"
                              error={Boolean(touched.mother_full_name && errors.mother_full_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.mother_full_name && errors.mother_full_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.mother_full_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.resident_address && errors.resident_address)}>
                            <TextField
                              id="outlined-adornment-resident_address"
                              multiline
                              value={values.resident_address}
                              name="resident_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.resident_address && errors.resident_address)}
                              label="Current Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                            {touched.resident_address && errors.resident_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.resident_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.pincode && errors.pincode)}>
                            <TextField
                              id="outlined-adornment-pincode"
                              type="text"
                              value={values.pincode}
                              name="pincode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.pincode && errors.pincode)}
                              label="Pincode"
                              variant="outlined" // Add this line
                            />
                            {touched.pincode && errors.pincode && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.pincode}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid xs={12} md={6}>
                            <FormControlLabel
                              control={
                                <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} color="primary" />
                              }
                              label="Remember me"
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.permanent_address && errors.permanent_address)}>
                            <TextField
                              id="outlined-adornment-permanent_address"
                              multiline
                              value={checked ? values.resident_address : values.permanent_address}
                              name="permanent_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.permanent_address && errors.permanent_address)}
                              label="Permanent Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                            {touched.permanent_address && errors.permanent_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.permanent_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.permanent_pincode && errors.permanent_pincode)}>
                            <TextField
                              id="outlined-adornment-permanent_pincode"
                              type="text"
                              value={checked ? values.pincode : values.permanent_pincode}
                              name="permanent_pincode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.permanent_pincode && errors.permanent_pincode)}
                              label="Pincode"
                              variant="outlined" // Add this line
                            />
                            {touched.permanent_pincode && errors.permanent_pincode && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.permanent_pincode}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth error={Boolean(touched.year_in_current_address && errors.year_in_current_address)}>
                            <TextField
                              id="outlined-adornment-year_in_current_address"
                              type="text"
                              value={values.year_in_current_address}
                              name="year_in_current_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.year_in_current_address && errors.year_in_current_address)}
                              label="No. of Year in Current Address"
                              variant="outlined" // Add this line
                            />
                            {touched.year_in_current_address && errors.year_in_current_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.year_in_current_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <FormControl fullWidth error={Boolean(touched.reference_name && errors.reference_name)}>
                            <TextField
                              id="outlined-adornment-reference_name"
                              type="text"
                              value={values.reference_name}
                              name="reference_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.reference_name && errors.reference_name)}
                              label="Reference Name"
                              variant="outlined" // Add this line
                            />
                            {touched.reference_name && errors.reference_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.reference_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.reference_phone_no && errors.reference_phone_no)}>
                            <TextField
                              id="outlined-adornment-reference_phone_no"
                              type="number"
                              value={values.reference_phone_no}
                              name="reference_phone_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.reference_phone_no && errors.reference_phone_no)}
                              label="Reference Mobile No."
                              variant="outlined" // Add this line
                            />
                            {touched.reference_phone_no && errors.reference_phone_no && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.reference_phone_no}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.reference_address && errors.reference_address)}>
                            <TextField
                              id="outlined-adornment-reference_address"
                              multiline
                              value={values.reference_address}
                              name="reference_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.reference_address && errors.reference_address)}
                              label="Reference Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                            {touched.reference_address && errors.reference_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.reference_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.loan_amount_required && errors.loan_amount_required)}>
                            <TextField
                              id="outlined-adornment-loan_amount_required"
                              type="text"
                              value={values.loan_amount_required}
                              name="loan_amount_required"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.loan_amount_required && errors.loan_amount_required)}
                              label="Loan Requirement: In Rupees"
                              variant="outlined" // Add this line
                            />
                            {touched.loan_amount_required && errors.loan_amount_required && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.loan_amount_required}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Examination Details
                    </Typography>

                    {examinationDetails?.map((element, index) => (
                      <Grid container spacing={2} key={index} mb={2}>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              id={`examination_${index}`}
                              value={element.examination}
                              name={`examination`}
                              onChange={(e) => handleChangeDetail(index, e)}
                              label="Education"
                              variant="outlined"
                              type="text"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              id={`passingYear_${index}`}
                              value={element.passingYear}
                              name={`passingYear`}
                              onChange={(e) => handleChangeDetail(index, e)}
                              label="Passing Year"
                              variant="outlined"
                              type="text"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <FormControl fullWidth>
                            <TextField
                              id={`percentage_${index}`}
                              value={element.percentage}
                              name={`percentage`}
                              onChange={(e) => handleChangeDetail(index, e)}
                              label="Percentage"
                              variant="outlined"
                              type="text"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              id={`school_name${index}`}
                              value={element.school_name}
                              name={`school_name`}
                              onChange={(e) => handleChangeDetail(index, e)}
                              label="School/University Name"
                              variant="outlined"
                              type="text"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={1} sx={{ display: 'flex' }}>
                          {index !== 0 && (
                            <IconButton onClick={() => handleRemoveDetail(index)}>
                              <RemoveIcon />
                            </IconButton>
                          )}
                          {index === examinationDetails.length - 1 && (
                            <IconButton onClick={handleAddDetail}>
                              <AddIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Select Exam</FormLabel>
                            <RadioGroup
                              row
                              aria-label="exam"
                              name="exam"
                              value={values.exam}
                              onChange={handleChange}
                              error={Boolean(touched.exam && errors.exam)}
                            >
                              <FormControlLabel value="IELTS" control={<Radio />} label="IELTS" />
                              <FormControlLabel value="PTE" control={<Radio />} label="PTE" />
                              <FormControlLabel value="GRE" control={<Radio />} label="GRE" />
                              <FormControlLabel value="Doolingo" control={<Radio />} label="Doolingo" />
                              <FormControlLabel value="TOEFL" control={<Radio />} label="TOEFL" />
                              {/* Add more FormControlLabels for other exam options */}
                            </RadioGroup>
                            {touched.exam && errors.exam && <FormHelperText error>{errors.exam}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} mt={2}>
                          <Grid container spacing={gridSpacings}>
                            <Grid item xs={12} md={3}>
                              <FormControl fullWidth error={Boolean(touched.listening && errors.listening)}>
                                <TextField
                                  id="outlined-adornment-listening"
                                  type="number"
                                  value={values.listening}
                                  name="listening"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={Boolean(touched.listening && errors.listening)}
                                  label="Listening"
                                  variant="outlined" // Add this line
                                />
                                {touched.listening && errors.listening && (
                                  <FormHelperText error id="standard-weight-helper-text-email">
                                    {errors.listening}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <FormControl fullWidth error={Boolean(touched.reading && errors.reading)}>
                                <TextField
                                  id="outlined-adornment-reading"
                                  type="number"
                                  value={values.reading}
                                  name="reading"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={Boolean(touched.reading && errors.reading)}
                                  label="Reading"
                                  variant="outlined" // Add this line
                                />
                                {touched.reading && errors.reading && (
                                  <FormHelperText error id="standard-weight-helper-text-email">
                                    {errors.reading}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <FormControl fullWidth error={Boolean(touched.writing && errors.writing)}>
                                <TextField
                                  id="outlined-adornment-writing"
                                  type="number"
                                  value={values.writing}
                                  name="writing"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={Boolean(touched.writing && errors.writing)}
                                  label="Writing"
                                  variant="outlined" // Add this line
                                />
                                {touched.writing && errors.writing && (
                                  <FormHelperText error id="standard-weight-helper-text-email">
                                    {errors.writing}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <FormControl fullWidth error={Boolean(touched.speaking && errors.speaking)}>
                                <TextField
                                  id="outlined-adornment-speaking"
                                  type="number"
                                  value={values.speaking}
                                  name="speaking"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={Boolean(touched.speaking && errors.speaking)}
                                  label="Speaking"
                                  variant="outlined" // Add this line
                                />
                                {touched.speaking && errors.speaking && (
                                  <FormHelperText error id="standard-weight-helper-text-email">
                                    {errors.speaking}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container spacing={gridSpacings}>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth error={Boolean(touched.country && errors.country)}>
                          <InputLabel outlined>Country</InputLabel>
                          <Select
                            id="outlined-adornment-country"
                            value={values.country}
                            label="Country"
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e);
                              getUniversitiesByCountry(e.target.value);
                            }}
                            name="country"
                          >
                            <MenuItem value="" disabled>
                              <em>None</em>
                            </MenuItem>
                            {countryData.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.country && errors.country && (
                            <FormHelperText error id="standard-weight-helper-text-email">
                              {errors.country}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth error={Boolean(touched.university && errors.university)}>
                          <InputLabel outlined>University</InputLabel>
                          <Select
                            id="outlined-adornment-university"
                            value={values.university}
                            label="University"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="university"
                          >
                            <MenuItem value="" disabled>
                              <em>None</em>
                            </MenuItem>
                            {universityData.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.university_name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.university && errors.university && (
                            <FormHelperText error id="standard-weight-helper-text-university">
                              {errors.university}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={Boolean(touched.course_name && errors.course_name)}>
                          <TextField
                            id="outlined-adornment-course_name"
                            type="text"
                            value={values.course_name}
                            name="course_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Course Name"
                            error={Boolean(touched.course_name && errors.course_name)}
                            variant="outlined" // Add this line
                          />
                          {touched.course_name && errors.course_name && (
                            <FormHelperText error id="standard-weight-helper-text-course_name">
                              {errors.course_name}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Business Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-type_of_employment"
                            type="text"
                            value={values.type_of_employment}
                            name="type_of_employment"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Type of Employement"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-company_name"
                            type="text"
                            value={values.company_name}
                            name="company_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Company Name"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-applicant_designation"
                            type="text"
                            value={values.applicant_designation}
                            name="applicant_designation"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Designation"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-work_experience"
                            type="text"
                            value={values.work_experience}
                            name="work_experience"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Total Work Of Experience"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-current_work_experience"
                            type="text"
                            value={values.current_work_experience}
                            name="current_work_experience"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="No Of Year IN Current Work"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-bussiness_address"
                            multiline
                            value={values.bussiness_address}
                            name="bussiness_address"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bussiness Address"
                            variant="outlined" // Add this line
                            rows={4}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-bussiness_pincode"
                            type="text"
                            value={values.bussiness_pincode}
                            name="bussiness_pincode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bussiness Pincode"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-net_monthly_income"
                            type="text"
                            value={values.net_monthly_income}
                            name="net_monthly_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Net Monthly Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-other_income"
                            type="text"
                            value={values.other_income}
                            name="other_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Other Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Investment Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-gold"
                            type="text"
                            value={values.gold}
                            name="gold"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Gold"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-land"
                            type="text"
                            value={values.land}
                            name="land"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Land"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-life_insurance_policy"
                            type="text"
                            value={values.life_insurance_policy}
                            name="life_insurance_policy"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Life Insurance Policy"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-property"
                            type="text"
                            value={values.property}
                            name="property"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Property"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-shares"
                            type="text"
                            value={values.shares}
                            name="shares"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Shares"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-rent_income"
                            type="text"
                            value={values.rent_income}
                            name="rent_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Rent Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-bank_balance"
                            type="text"
                            value={values.bank_balance}
                            name="bank_balance"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bank Balance"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Bank Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={Boolean(touched.bank_name && errors.bank_name)}>
                          <TextField
                            id="outlined-adornment-bank_name"
                            type="text"
                            value={values.bank_name}
                            name="bank_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.bank_name && errors.bank_name)}
                            label="Bank Name"
                            variant="outlined" // Add this line
                          />
                          {touched.bank_name && errors.bank_name && (
                            <FormHelperText error id="standard-weight-helper-text-bank_name">
                              {errors.bank_name}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={Boolean(touched.bank_name && errors.bank_name)}>
                          <TextField
                            id="outlined-adornment-account_number"
                            type="text"
                            value={values.account_number}
                            name="account_number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.bank_name && errors.bank_name)}
                            label="Account Number"
                            variant="outlined" // Add this line
                          />
                          {touched.account_number && errors.account_number && (
                            <FormHelperText error id="standard-weight-helper-text-account_number">
                              {errors.account_number}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={Boolean(touched.ifsc_code && errors.ifsc_code)}>
                          <TextField
                            id="outlined-adornment-ifsc_code"
                            type="text"
                            value={values.ifsc_code}
                            name="ifsc_code"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.ifsc_code && errors.ifsc_code)}
                            label="IFSC Code"
                            variant="outlined" // Add this line
                          />
                          {touched.ifsc_code && errors.ifsc_code && (
                            <FormHelperText error id="standard-weight-helper-text-ifsc_code">
                              {errors.ifsc_code}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Currently Running Loan Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-currently_running_loan_bank"
                            type="text"
                            value={values.currently_running_loan_bank}
                            name="currently_running_loan_bank"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bank Name"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-currently_running_loan_type"
                            type="text"
                            value={values.currently_running_loan_type}
                            name="currently_running_loan_type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Type Of Loan"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-currently_running_loan_sanction_amount"
                            type="text"
                            value={values.currently_running_loan_sanction_amount}
                            name="currently_running_loan_sanction_amount"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Sanctions Amount"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-currently_running_loan_emi"
                            type="text"
                            value={values.currently_running_loan_emi}
                            name="currently_running_loan_emi"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="EMI of Loan"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChangeCollapses('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                  <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h4">
                    Co-APPLICANT-1
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                      Co-APPLICANT-1 Information
                    </Typography>
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant1_name && errors.co_applicant1_name)}>
                            <TextField
                              id="outlined-adornment-co_applicant1_name"
                              type="text"
                              value={values.co_applicant1_name}
                              name="co_applicant1_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Student Full Name"
                              error={Boolean(touched.co_applicant1_name && errors.co_applicant1_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_name && errors.co_applicant1_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant1_relation_with_student && errors.co_applicant1_relation_with_student)}
                          >
                            <InputLabel outlined>Relation with student</InputLabel>
                            <Select
                              id="outlined-adornment-co_applicant1_relation_with_student"
                              value={values.co_applicant1_relation_with_student}
                              label="Relation with student"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="co_applicant1_relation_with_student"
                            >
                              <MenuItem value="" disabled>
                                <em>None</em>
                              </MenuItem>
                              {relation.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.co_applicant1_relation_with_student && errors.co_applicant1_relation_with_student && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_relation_with_student}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant1_dob && errors.co_applicant1_dob)}>
                            <TextField
                              id="outlined-adornment-co_applicant1_dob"
                              type="date"
                              value={values.co_applicant1_dob}
                              name="co_applicant1_dob"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Date of Birth"
                              error={Boolean(touched.co_applicant1_dob && errors.co_applicant1_dob)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_dob && errors.co_applicant1_dob && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_dob}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant1_aadhar_no && errors.co_applicant1_aadhar_no)}>
                            <TextField
                              id="outlined-adornment-co_applicant1_aadhar_no"
                              type="text"
                              value={values.co_applicant1_aadhar_no}
                              name="co_applicant1_aadhar_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="AADHAR NO."
                              error={Boolean(touched.co_applicant1_aadhar_no && errors.co_applicant1_aadhar_no)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_aadhar_no && errors.co_applicant1_aadhar_no && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_aadhar_no}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant1_pan_no && errors.co_applicant1_pan_no)}>
                            <TextField
                              id="outlined-adornment-co_applicant1_pan_no"
                              type="text"
                              value={values.co_applicant1_pan_no}
                              name="co_applicant1_pan_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant1_pan_no && errors.co_applicant1_pan_no)}
                              label="PAN NO."
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_pan_no && errors.co_applicant1_pan_no && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_pan_no}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant1_passport"
                              type="text"
                              value={values.co_applicant1_passport}
                              name="co_applicant1_passport"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="PASSPORT"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant1_marital_status && errors.co_applicant1_marital_status)}
                          >
                            <InputLabel outlined>Marital Status</InputLabel>
                            <Select
                              id="outlined-adornment-co_applicant1_marital_status"
                              value={values.co_applicant1_marital_status}
                              label="Marital Status"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="co_applicant1_marital_status"
                            >
                              <MenuItem value="" disabled>
                                <em>None</em>
                              </MenuItem>
                              {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.co_applicant1_marital_status && errors.co_applicant1_marital_status && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_marital_status}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant1_phone && errors.co_applicant1_phone)}>
                            <TextField
                              id="outlined-adornment-co_applicant1_phone"
                              type="number"
                              value={values.co_applicant1_phone}
                              name="co_applicant1_phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Phone Number"
                              error={Boolean(touched.co_applicant1_phone && errors.co_applicant1_phone)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_phone && errors.co_applicant1_phone && (
                              <FormHelperText error id="standard-weight-helper-text-co_applicant1_phone">
                                {errors.co_applicant1_phone}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant1_height"
                              type="text"
                              value={values.co_applicant1_height}
                              name="co_applicant1_height"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Height"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant1_weight"
                              type="text"
                              value={values.co_applicant1_weight}
                              name="co_applicant1_weight"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Weight"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant1_email && errors.co_applicant1_email)}>
                            <TextField
                              id="outlined-adornment-co_applicant1_email"
                              type="email"
                              value={values.co_applicant1_email}
                              name="co_applicant1_email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Email"
                              error={Boolean(touched.co_applicant1_email && errors.co_applicant1_email)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_email && errors.co_applicant1_email && (
                              <FormHelperText error id="standard-weight-helper-text-co_applicant1_email">
                                {errors.co_applicant1_email}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                      Family Details
                    </Typography>
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant1_father_full_name && errors.co_applicant1_father_full_name)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant1_father_full_name"
                              type="text"
                              value={values.co_applicant1_father_full_name}
                              name="co_applicant1_father_full_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Father Full Name"
                              error={Boolean(touched.co_applicant1_father_full_name && errors.co_applicant1_father_full_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_father_full_name && errors.co_applicant1_father_full_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_father_full_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant1_mother_full_name && errors.co_applicant1_mother_full_name)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant1_mother_full_name"
                              type="text"
                              value={values.co_applicant1_mother_full_name}
                              name="co_applicant1_mother_full_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Mother Full Name"
                              error={Boolean(touched.co_applicant1_mother_full_name && errors.co_applicant1_mother_full_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_mother_full_name && errors.co_applicant1_mother_full_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_mother_full_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant1_resident_address && errors.co_applicant1_resident_address)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant1_resident_address"
                              multiline
                              value={values.co_applicant1_resident_address}
                              name="co_applicant1_resident_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant1_resident_address && errors.co_applicant1_resident_address)}
                              label="Current Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                            {touched.co_applicant1_resident_address && errors.co_applicant1_resident_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_resident_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant1_pincode && errors.co_applicant1_pincode)}>
                            <TextField
                              id="outlined-adornment-co_applicant1_pincode"
                              type="text"
                              value={values.co_applicant1_pincode}
                              name="co_applicant1_pincode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant1_pincode && errors.co_applicant1_pincode)}
                              label="Pincode"
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_pincode && errors.co_applicant1_pincode && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_pincode}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant1_permanent_address && errors.co_applicant1_permanent_address)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant1_permanent_address"
                              multiline
                              value={values.co_applicant1_permanent_address}
                              name="co_applicant1_permanent_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant1_permanent_address && errors.co_applicant1_permanent_address)}
                              label="Permanent Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                            {touched.co_applicant1_permanent_address && errors.co_applicant1_permanent_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_permanent_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant1_permanent_pincode && errors.co_applicant1_permanent_pincode)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant1_permanent_pincode"
                              type="text"
                              value={values.co_applicant1_permanent_pincode}
                              name="co_applicant1_permanent_pincode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant1_permanent_pincode && errors.co_applicant1_permanent_pincode)}
                              label="Pincode"
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_permanent_pincode && errors.co_applicant1_permanent_pincode && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_permanent_pincode}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant1_year_in_current_address && errors.co_applicant1_year_in_current_address)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant1_year_in_current_address"
                              type="text"
                              value={values.co_applicant1_year_in_current_address}
                              name="co_applicant1_year_in_current_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="No. of Year in Current Address"
                              error={Boolean(touched.co_applicant1_year_in_current_address && errors.co_applicant1_year_in_current_address)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant1_year_in_current_address && errors.co_applicant1_year_in_current_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant1_year_in_current_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant1_reference_name"
                              type="text"
                              value={values.co_applicant1_reference_name}
                              name="co_applicant1_reference_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Reference Name"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant1_reference_phone_no"
                              type="number"
                              value={values.co_applicant1_reference_phone_no}
                              name="co_applicant1_reference_phone_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Reference Mobile No."
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant1_reference_address"
                              multiline
                              value={values.co_applicant1_reference_address}
                              name="co_applicant1_reference_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Reference Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant1_loan_amount_required"
                              type="text"
                              value={values.co_applicant1_loan_amount_required}
                              name="co_applicant1_loan_amount_required"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Loan Requirement: In Rupees"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Business Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={3}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.co_applicant1_type_of_employment && errors.co_applicant1_type_of_employment)}
                        >
                          <TextField
                            id="outlined-adornment-co_applicant1_type_of_employment"
                            type="text"
                            value={values.co_applicant1_type_of_employment}
                            name="co_applicant1_type_of_employment"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.co_applicant1_type_of_employment && errors.co_applicant1_type_of_employment)}
                            label="Type of Employement"
                            variant="outlined" // Add this line
                          />
                          {touched.co_applicant1_type_of_employment && errors.co_applicant1_type_of_employment && (
                            <FormHelperText error id="standard-weight-helper-text-email">
                              {errors.co_applicant1_type_of_employment}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_company_name"
                            type="text"
                            value={values.co_applicant1_company_name}
                            name="co_applicant1_company_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Company Name"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_applicant_designation"
                            type="text"
                            value={values.co_applicant1_applicant_designation}
                            name="co_applicant1_applicant_designation"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Designation"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_work_experience"
                            type="text"
                            value={values.co_applicant1_work_experience}
                            name="co_applicant1_work_experience"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Total Work Of Experience"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_current_work_experience"
                            type="text"
                            value={values.co_applicant1_current_work_experience}
                            name="co_applicant1_current_work_experience"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="No Of Year IN Current Work"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_bussiness_address"
                            multiline
                            value={values.co_applicant1_bussiness_address}
                            name="co_applicant1_bussiness_address"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bussiness Address"
                            variant="outlined" // Add this line
                            rows={4}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_bussiness_pincode"
                            type="text"
                            value={values.co_applicant1_bussiness_pincode}
                            name="co_applicant1_bussiness_pincode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bussiness Pincode"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_net_monthly_income"
                            type="text"
                            value={values.co_applicant1_net_monthly_income}
                            name="co_applicant1_net_monthly_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Net Monthly Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_other_income"
                            type="text"
                            value={values.co_applicant1_other_income}
                            name="co_applicant1_other_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Other Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Investment Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_gold"
                            type="text"
                            value={values.co_applicant1_gold}
                            name="co_applicant1_gold"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Gold"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_land"
                            type="text"
                            value={values.co_applicant1_land}
                            name="co_applicant1_land"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Land"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_life_insurance_policy"
                            type="text"
                            value={values.co_applicant1_life_insurance_policy}
                            name="co_applicant1_life_insurance_policy"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Life Insurance Policy"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_property"
                            type="text"
                            value={values.co_applicant1_property}
                            name="co_applicant1_property"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Property"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_shares"
                            type="text"
                            value={values.co_applicant1_shares}
                            name="co_applicant1_shares"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Shares"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_rent_income"
                            type="text"
                            value={values.co_applicant1_rent_income}
                            name="co_applicant1_rent_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Rent Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_bank_balance"
                            type="text"
                            value={values.co_applicant1_bank_balance}
                            name="co_applicant1_bank_balance"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bank Balance"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Bank Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={Boolean(touched.co_applicant1_bank_name && errors.co_applicant1_bank_name)}>
                          <TextField
                            id="outlined-adornment-co_applicant1_bank_name"
                            type="text"
                            value={values.co_applicant1_bank_name}
                            name="co_applicant1_bank_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.co_applicant1_bank_name && errors.co_applicant1_bank_name)}
                            label="Bank Name"
                            variant="outlined" // Add this line
                          />
                          {touched.co_applicant1_bank_name && errors.co_applicant1_bank_name && (
                            <FormHelperText error id="standard-weight-helper-text-co_applicant1_bank_name">
                              {errors.co_applicant1_bank_name}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={Boolean(touched.co_applicant1_account_number && errors.co_applicant1_account_number)}>
                          <TextField
                            id="outlined-adornment-co_applicant1_account_number"
                            type="text"
                            value={values.co_applicant1_account_number}
                            name="co_applicant1_account_number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.co_applicant1_account_number && errors.co_applicant1_account_number)}
                            label="Account Number"
                            variant="outlined" // Add this line
                          />
                          {touched.co_applicant1_account_number && errors.co_applicant1_account_number && (
                            <FormHelperText error id="standard-weight-helper-text-co_applicant1_account_number">
                              {errors.co_applicant1_account_number}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={Boolean(touched.co_applicant1_ifsc_code && errors.co_applicant1_ifsc_code)}>
                          <TextField
                            id="outlined-adornment-co_applicant1_ifsc_code"
                            type="text"
                            value={values.co_applicant1_ifsc_code}
                            name="co_applicant1_ifsc_code"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.co_applicant1_ifsc_code && errors.co_applicant1_ifsc_code)}
                            label="IFSC Code"
                            variant="outlined" // Add this line
                          />
                          {touched.co_applicant1_ifsc_code && errors.co_applicant1_ifsc_code && (
                            <FormHelperText error id="standard-weight-helper-text-co_applicant1_ifsc_code">
                              {errors.co_applicant1_ifsc_code}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Currently Running Loan Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_currently_running_loan_bank"
                            type="text"
                            value={values.co_applicant1_currently_running_loan_bank}
                            name="co_applicant1_currently_running_loan_bank"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bank Name"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_currently_running_loan_type"
                            type="text"
                            value={values.co_applicant1_currently_running_loan_type}
                            name="co_applicant1_currently_running_loan_type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Type Of Loan"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_currently_running_loan_sanction_amount"
                            type="text"
                            value={values.co_applicant1_currently_running_loan_sanction_amount}
                            name="co_applicant1_currently_running_loan_sanction_amount"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Sanctions Amount"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant1_currently_running_loan_emi"
                            type="text"
                            value={values.co_applicant1_currently_running_loan_emi}
                            name="co_applicant1_currently_running_loan_emi"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="EMI of Loan"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChangeCollapses('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                  <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h4">
                    Co-APPLICANT-2
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                      Co-APPLICANT-2 Information
                    </Typography>
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant2_name && errors.co_applicant2_name)}>
                            <TextField
                              id="outlined-adornment-co_applicant2_name"
                              type="text"
                              value={values.co_applicant2_name}
                              name="co_applicant2_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Student Full Name"
                              error={Boolean(touched.co_applicant2_name && errors.co_applicant2_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_name && errors.co_applicant2_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant2_relation_with_student && errors.co_applicant2_relation_with_student)}
                          >
                            <InputLabel outlined>Relation with student</InputLabel>
                            <Select
                              id="outlined-adornment-co_applicant2_relation_with_student"
                              value={values.co_applicant2_relation_with_student}
                              label="Relation with student"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant2_relation_with_student && errors.co_applicant2_relation_with_student)}
                              name="co_applicant2_relation_with_student"
                            >
                              <MenuItem value="" disabled>
                                <em>None</em>
                              </MenuItem>
                              {relation.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.co_applicant2_relation_with_student && errors.co_applicant2_relation_with_student && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_relation_with_student}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant2_dob && errors.co_applicant2_dob)}>
                            <TextField
                              id="outlined-adornment-co_applicant2_dob"
                              type="date"
                              value={values.co_applicant2_dob}
                              name="co_applicant2_dob"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Date of Birth"
                              error={Boolean(touched.co_applicant2_dob && errors.co_applicant2_dob)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_dob && errors.co_applicant2_dob && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_dob}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant2_aadhar_no && errors.co_applicant2_aadhar_no)}>
                            <TextField
                              id="outlined-adornment-co_applicant2_aadhar_no"
                              type="text"
                              value={values.co_applicant2_aadhar_no}
                              name="co_applicant2_aadhar_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="AADHAR NO."
                              error={Boolean(touched.co_applicant2_aadhar_no && errors.co_applicant2_aadhar_no)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_aadhar_no && errors.co_applicant2_aadhar_no && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_aadhar_no}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant2_pan_no && errors.co_applicant2_pan_no)}>
                            <TextField
                              id="outlined-adornment-co_applicant2_pan_no"
                              type="text"
                              value={values.co_applicant2_pan_no}
                              name="co_applicant2_pan_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant2_pan_no && errors.co_applicant2_pan_no)}
                              label="PAN NO."
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_pan_no && errors.co_applicant2_pan_no && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_pan_no}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant2_passport"
                              type="text"
                              value={values.co_applicant2_passport}
                              name="co_applicant2_passport"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="PASSPORT"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant2_marital_status && errors.co_applicant2_marital_status)}
                          >
                            <InputLabel outlined>Marital Status</InputLabel>
                            <Select
                              id="outlined-adornment-co_applicant2_marital_status"
                              value={values.co_applicant2_marital_status}
                              label="Marital Status"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              name="co_applicant2_marital_status"
                              error={Boolean(touched.co_applicant2_marital_status && errors.co_applicant2_marital_status)}
                            >
                              <MenuItem value="" disabled>
                                <em>None</em>
                              </MenuItem>
                              {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.co_applicant2_marital_status && errors.co_applicant2_marital_status && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_marital_status}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant2_phone && errors.co_applicant2_phone)}>
                            <TextField
                              id="outlined-adornment-co_applicant2_phone"
                              type="number"
                              value={values.co_applicant2_phone}
                              name="co_applicant2_phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Phone Number"
                              error={Boolean(touched.co_applicant2_phone && errors.co_applicant2_phone)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_phone && errors.co_applicant2_phone && (
                              <FormHelperText error id="standard-weight-helper-text-co_applicant2_phone">
                                {errors.co_applicant2_phone}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant2_height"
                              type="text"
                              value={values.co_applicant2_height}
                              name="co_applicant2_height"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Height"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant2_weight"
                              type="text"
                              value={values.co_applicant2_weight}
                              name="co_applicant2_weight"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Weight"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant2_email && errors.co_applicant2_email)}>
                            <TextField
                              id="outlined-adornment-co_applicant2_email"
                              type="email"
                              value={values.co_applicant2_email}
                              name="co_applicant2_email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Email"
                              error={Boolean(touched.co_applicant2_email && errors.co_applicant2_email)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_email && errors.co_applicant2_email && (
                              <FormHelperText error id="standard-weight-helper-text-co_applicant2_email">
                                {errors.co_applicant2_email}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: '15px' }}>
                      Family Details
                    </Typography>
                    <Grid item xs={12} mb={2}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant2_father_full_name && errors.co_applicant2_father_full_name)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant2_father_full_name"
                              type="text"
                              value={values.co_applicant2_father_full_name}
                              name="co_applicant2_father_full_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Father Full Name"
                              error={Boolean(touched.co_applicant2_father_full_name && errors.co_applicant2_father_full_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_father_full_name && errors.co_applicant2_father_full_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_father_full_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant2_mother_full_name && errors.co_applicant2_mother_full_name)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant2_mother_full_name"
                              type="text"
                              value={values.co_applicant2_mother_full_name}
                              name="co_applicant2_mother_full_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Mother Full Name"
                              error={Boolean(touched.co_applicant2_mother_full_name && errors.co_applicant2_mother_full_name)}
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_mother_full_name && errors.co_applicant2_mother_full_name && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_mother_full_name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant2_resident_address && errors.co_applicant2_resident_address)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant2_resident_address"
                              multiline
                              value={values.co_applicant2_resident_address}
                              name="co_applicant2_resident_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant2_resident_address && errors.co_applicant2_resident_address)}
                              label="Current Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                            {touched.co_applicant2_resident_address && errors.co_applicant2_resident_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_resident_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={Boolean(touched.co_applicant2_pincode && errors.co_applicant2_pincode)}>
                            <TextField
                              id="outlined-adornment-co_applicant2_pincode"
                              type="text"
                              value={values.co_applicant2_pincode}
                              name="co_applicant2_pincode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant2_pincode && errors.co_applicant2_pincode)}
                              label="Pincode"
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_pincode && errors.co_applicant2_pincode && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_pincode}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant2_permanent_address && errors.co_applicant2_permanent_address)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant2_permanent_address"
                              multiline
                              value={values.co_applicant2_permanent_address}
                              name="co_applicant2_permanent_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant2_permanent_address && errors.co_applicant2_permanent_address)}
                              label="Permanent Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                            {touched.co_applicant2_permanent_address && errors.co_applicant2_permanent_address && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_permanent_address}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.co_applicant2_permanent_pincode && errors.co_applicant2_permanent_pincode)}
                          >
                            <TextField
                              id="outlined-adornment-co_applicant2_permanent_pincode"
                              type="text"
                              value={values.co_applicant2_permanent_pincode}
                              name="co_applicant2_permanent_pincode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.co_applicant2_permanent_pincode && errors.co_applicant2_permanent_pincode)}
                              label="Pincode"
                              variant="outlined" // Add this line
                            />
                            {touched.co_applicant2_permanent_pincode && errors.co_applicant2_permanent_pincode && (
                              <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.co_applicant2_permanent_pincode}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant2_year_in_current_address"
                              type="text"
                              value={values.co_applicant2_year_in_current_address}
                              name="co_applicant2_year_in_current_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="No. of Year in Current Address"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant2_reference_name"
                              type="text"
                              value={values.co_applicant2_reference_name}
                              name="co_applicant2_reference_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Reference Name"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant2_reference_phone_no"
                              type="number"
                              value={values.co_applicant2_reference_phone_no}
                              name="co_applicant2_reference_phone_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Reference Mobile No."
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant2_reference_address"
                              multiline
                              value={values.co_applicant2_reference_address}
                              name="co_applicant2_reference_address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Reference Address"
                              variant="outlined" // Add this line
                              rows={3}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-adornment-co_applicant2_loan_amount_required"
                              type="text"
                              value={values.co_applicant2_loan_amount_required}
                              name="co_applicant2_loan_amount_required"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Loan Requirement: In Rupees"
                              variant="outlined" // Add this line
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Business Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_type_of_employment"
                            type="text"
                            value={values.co_applicant2_type_of_employment}
                            name="co_applicant2_type_of_employment"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Type of Employement"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_company_name"
                            type="text"
                            value={values.co_applicant2_company_name}
                            name="co_applicant2_company_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Company Name"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_applicant_designation"
                            type="text"
                            value={values.co_applicant2_applicant_designation}
                            name="co_applicant2_applicant_designation"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Designation"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_work_experience"
                            type="text"
                            value={values.co_applicant2_work_experience}
                            name="co_applicant2_work_experience"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Total Work Of Experience"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_current_work_experience"
                            type="text"
                            value={values.co_applicant2_current_work_experience}
                            name="co_applicant2_current_work_experience"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="No Of Year IN Current Work"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_bussiness_address"
                            multiline
                            value={values.co_applicant2_bussiness_address}
                            name="co_applicant2_bussiness_address"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bussiness Address"
                            variant="outlined" // Add this line
                            rows={4}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_bussiness_pincode"
                            type="text"
                            value={values.co_applicant2_bussiness_pincode}
                            name="co_applicant2_bussiness_pincode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bussiness Pincode"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_net_monthly_income"
                            type="text"
                            value={values.co_applicant2_net_monthly_income}
                            name="co_applicant2_net_monthly_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Net Monthly Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_other_income"
                            type="text"
                            value={values.co_applicant2_other_income}
                            name="co_applicant2_other_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Other Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Investment Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_gold"
                            type="text"
                            value={values.co_applicant2_gold}
                            name="co_applicant2_gold"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Gold"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_land"
                            type="text"
                            value={values.co_applicant2_land}
                            name="co_applicant2_land"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Land"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_life_insurance_policy"
                            type="text"
                            value={values.co_applicant2_life_insurance_policy}
                            name="co_applicant2_life_insurance_policy"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Life Insurance Policy"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_property"
                            type="text"
                            value={values.co_applicant2_property}
                            name="co_applicant2_property"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Property"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_shares"
                            type="text"
                            value={values.co_applicant2_shares}
                            name="co_applicant2_shares"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Shares"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_rent_income"
                            type="text"
                            value={values.co_applicant2_rent_income}
                            name="co_applicant2_rent_income"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Rent Income"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_bank_balance"
                            type="text"
                            value={values.co_applicant2_bank_balance}
                            name="co_applicant2_bank_balance"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bank Balance"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Bank Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_bank_name"
                            type="text"
                            value={values.co_applicant2_bank_name}
                            name="co_applicant2_bank_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bank Name"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_account_number"
                            type="text"
                            value={values.co_applicant2_account_number}
                            name="co_applicant2_account_number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Account Number"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_ifsc_code"
                            type="text"
                            value={values.co_applicant2_ifsc_code}
                            name="co_applicant2_ifsc_code"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="IFSC Code"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      Currently Running Loan Details
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_currently_running_loan_bank"
                            type="text"
                            value={values.co_applicant2_currently_running_loan_bank}
                            name="co_applicant2_currently_running_loan_bank"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Bank Name"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_currently_running_loan_type"
                            type="text"
                            value={values.co_applicant2_currently_running_loan_type}
                            name="co_applicant2_currently_running_loan_type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Type Of Loan"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_currently_running_loan_sanction_amount"
                            type="text"
                            value={values.co_applicant2_currently_running_loan_sanction_amount}
                            name="co_applicant2_currently_running_loan_sanction_amount"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Sanctions Amount"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-adornment-co_applicant2_currently_running_loan_emi"
                            type="text"
                            value={values.co_applicant2_currently_running_loan_emi}
                            name="co_applicant2_currently_running_loan_emi"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="EMI of Loan"
                            variant="outlined" // Add this line
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Button disableElevation disabled={loading} size="large" type="submit" variant="contained" color="secondary" sx={{ mr: 2 }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
                <Button disableElevation size="large" type="reset" variant="outlined" color="secondary">
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </MainCard>
      <AlertComponent />
    </>
  );
};

export default EditCustomer;
