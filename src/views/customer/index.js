// material-ui
import { Grid, Box, Button, Tooltip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CommonTable from 'ui-component/table/CommonTable';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useNavigate } from 'react-router';
import moment from 'moment';
import GetRequestOnRole from 'commonRequest/getRequestRole';
const XLSX = require('xlsx');
import GetByIdRequest from 'commonRequest/getByIdRequest';

const StyledTooltip = styled('div')({
  cursor: 'pointer'
});
// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const Customer = () => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const tokenValue = localStorage.getItem('token');
  const userData = JSON.parse(tokenValue);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, valueGetter: (params) => params.row.id + 1 },
    {
      field: 'student_name',
      headerName: 'Customer name',
      width: 180,
      sortable: false,
      valueGetter: (params) => `${params.row.student_name || ''}`
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 210,
      valueGetter: (params) => {
        const email = params.row.email || '';
        if (email.length > 20) {
          return `${email.substr(0, 20)}...`; // Show first 20 characters with ellipsis
        }
        return email;
      },
      renderCell: (params) => <StyledTooltip title={params.row.email}>{params.value}</StyledTooltip>
    },
    { field: 'phone', headerName: 'Phone Number', width: 180 },
    {
      field: 'converted_date',
      headerName: 'Converted Date',
      width: 180,
      valueGetter: (params) => moment(params.row.converted_date).format('MM-DD-YYYY hh:mm A')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
            <Tooltip title="Update Customer">
              <Button
                onClick={() => handleEdit(params.row._id)}
                size="small"
                style={{
                  width: '40px',
                  minWidth: '40px',
                  height: '40px',
                  border: '1px solid rgb(220 220 220)',
                  borderRadius: '5px',
                  marginRight: '6px'
                }}
              >
                <EditOutlinedIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Download Customer Excel">
              <Button
                onClick={() => handleDownload(params.row._id)}
                size="small"
                style={{
                  width: '40px',
                  minWidth: '40px',
                  height: '40px',
                  border: '1px solid rgb(220 220 220)',
                  borderRadius: '5px',
                  marginRight: '6px'
                }}
              >
                <CloudDownloadIcon />
              </Button>
            </Tooltip>
          </div>
        </>
      )
    }
  ];

  useEffect(() => {
    getAllCustomer();
  }, []);

  const getAllCustomer = async () => {
    const userid =
      userData.data.role === 'Admin'
        ? 'admin'
        : userData.data.staff_team === 'service'
          ? `service-${userData.data._id}`
          : userData.data._id;
    setLoading(true);
    const response = await GetRequestOnRole('/customer/getallcustomer/', userid);
    if (response.data) {
      const modifiedData = response.data.map((row, index) => ({ ...row, id: index, status: row.user_status }));
      setStaffData(modifiedData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getStatusText = (status) => (status ? 'Active' : 'Inactive');
  const columnsWithStatusText = columns.map((col) =>
    col.field === 'user_status' ? { ...col, valueGetter: (params) => getStatusText(params.row.status) } : col
  );

  const handleEdit = async (id) => {
    navigate('/customer/editcustomer', { state: id });
  };

  const handleDownload = async (id) => {
    const response = await GetByIdRequest('/student/getcustomerbyid/', id);
    const dataForExcel = [
      ['DETAILS', 'APPLICANT (Student)', 'CO-APPLICANT-1', 'CO-APPLICANT-2'],
      ['NAME', response.data[0].applicantDetails.student_name, response.data[0].co_applicant1_name, response.data[0].co_applicant2_name],
      [
        'Relation with student',
        response.data[0].applicantDetails.relation_with_student,
        response.data[0].co_applicant1_relation_with_student,
        response.data[0].co_applicant2_relation_with_student
      ],
      [
        'DATE OF BIRTH',
        moment(response.data[0].applicantDetails.dob).format('dddd, MMMM D, YYYY'),
        moment(response.data[0].co_applicant1_dob).format('dddd, MMMM D, YYYY'),
        moment(response.data[0].co_applicant2_dob).format('dddd, MMMM D, YYYY')
      ],
      [
        'AADHAR NO. & PAN NO.& PASSPORT',
        `AADHAR NO-${response.data[0].applicantDetails?.aadhar_no !== undefined ? response.data[0].applicantDetails?.aadhar_no : ''}           PAN NO.-${response.data[0].applicantDetails?.pan_no !== undefined ? response.data[0].applicantDetails?.pan_no : ''}            PASSPORT- ${response.data[0].applicantDetails?.passport !== undefined ? response.data[0].applicantDetails?.passport : ''}`,
        `AADHAR NO-${response.data[0].co_applicant1_aadhar_no !== undefined ? response.data[0].co_applicant1_aadhar_no : ''}           PAN NO.-${response.data[0].co_applicant1_pan_no !== undefined ? response.data[0].co_applicant1_pan_no : ''}            PASSPORT- ${response.data[0].co_applicant1_passport !== undefined ? response.data[0].co_applicant1_passport : ''}`,
        `AADHAR NO-${response.data[0].co_applicant2_aadhar_no !== undefined ? response.data[0].co_applicant2_aadhar_no : ''}           PAN NO.-${response.data[0].co_applicant2_pan_no !== undefined ? response.data[0].co_applicant2_pan_no : ''}            PASSPORT- ${response.data[0].co_applicant2_passport !== undefined ? response.data[0].co_applicant2_passport : ''}`
      ],
      [
        'MARITAL STATUS',
        response.data[0].applicantDetails.marital_status,
        response.data[0].co_applicant1_marital_status,
        response.data[0].co_applicant2_marital_status
      ],
      ['CONTACT NO.', response.data[0].applicantDetails.phone, response.data[0].co_applicant1_phone, response.data[0].co_applicant2_phone],
      ['HEIGHT', response.data[0].applicantDetails.height, response.data[0].co_applicant1_height, response.data[0].co_applicant2_height],
      ['WEIGHT', response.data[0].applicantDetails.weight, response.data[0].co_applicant1_weight, response.data[0].co_applicant2_weight],
      ['E-MAIL ID', response.data[0].applicantDetails.email, response.data[0].co_applicant1_email, response.data[0].co_applicant2_email],
      [
        'FATHER NAME',
        response.data[0].applicantDetails.father_full_name,
        response.data[0].co_applicant1_father_full_name,
        response.data[0].co_applicant2_father_full_name
      ],
      [
        'MOTHER NAME',
        response.data[0].applicantDetails.mother_full_name,
        response.data[0].co_applicant1_mother_full_name,
        response.data[0].co_applicant2_mother_full_name
      ],
      [
        'CURRENT ADDRESS WITH PINCODE',
        `${response.data[0].applicantDetails?.resident_address !== undefined ? response.data[0].applicantDetails?.resident_address : ''} , ${response.data[0].applicantDetails.pincode !== undefined ? response.data[0].applicantDetails.pincode : ''}`,
        `${response.data[0].co_applicant1_resident_address !== undefined ? response.data[0].co_applicant1_resident_address : ''} , ${response.data[0].co_applicant1_pincode !== undefined ? response.data[0].co_applicant1_pincode : ''}`,
        `${response.data[0].co_applicant2_resident_address !== undefined ? response.data[0].co_applicant2_resident_address : ''} , ${response.data[0].co_applicant2_pincode !== undefined ? response.data[0].co_applicant2_pincode : ''}`
      ],
      [
        'PERMANENT ADDRESS WITH PINCODE',
        `${response.data[0].applicantDetails?.permanent_address !== undefined ? response.data[0].applicantDetails?.permanent_address : ''} , ${response.data[0].applicantDetails.permanent_pincode !== undefined ? response.data[0].applicantDetails.permanent_pincode : ''}`,
        `${response.data[0].co_applicant1_permanent_address !== undefined ? response.data[0].co_applicant1_permanent_address : ''} , ${response.data[0].co_applicant1_permanent_pincode !== undefined ? response.data[0].co_applicant1_permanent_pincode : ''}`,
        `${response.data[0].co_applicant2_permanent_address !== undefined ? response.data[0].co_applicant2_permanent_address : ''} , ${response.data[0].co_applicant2_permanent_pincode !== undefined ? response.data[0].co_applicant2_permanent_pincode : ''}`
      ],
      [
        'NO. OF YEAR IN CURRENT ADDRESS',
        response.data[0].applicantDetails.year_in_current_address,
        response.data[0].co_applicant1_year_in_current_address,
        response.data[0].co_applicant2_year_in_current_address
      ],
      [
        'REFERENCES : NAME',
        response.data[0].applicantDetails.reference_name,
        response.data[0].co_applicant1_reference_name,
        response.data[0].co_applicant2_reference_name
      ],
      [
        'Mob. No.',
        response.data[0].applicantDetails.reference_phone_no,
        response.data[0].co_applicant1_reference_phone_no,
        response.data[0].co_applicant2_reference_phone_no
      ],
      [
        'ADDRESS',
        response.data[0].applicantDetails.reference_address,
        response.data[0].co_applicant1_reference_address,
        response.data[0].co_applicant2_reference_address
      ],
      [
        'Loan Reqirement:-IN RUPEES',
        response.data[0].applicantDetails.loan_amount_required,
        response.data[0].co_applicant1_loan_amount_required,
        response.data[0].co_applicant2_loan_amount_required
      ],
      ['EDUCATION'],

      ['', 'YEAR OF PASSING', 'PERCENTAGE', 'SCHOOL/UNIVERSITY NAME'],
      ...response.data[0].applicantDetails.education.map((edu) => [edu.examination, edu.passingYear, edu.percentage, edu.school_name]),
      [],
      [
        'ENTRANCE EXAM(GRE/IELTS/DUOLINGO/TOEFL)',
        `${response.data[0].applicantDetails.exam !== undefined ? response.data[0].applicantDetails.exam : ''}          LISTENING.-${response.data[0].applicantDetails?.listening !== undefined ? response.data[0].applicantDetails?.listening : ''}          READING.-${response.data[0].applicantDetails?.reading !== undefined ? response.data[0].applicantDetails?.reading : ''}                      WRITING.-${response.data[0].applicantDetails?.writing !== undefined ? response.data[0].applicantDetails?.writing : ''}            SPEAKING.-${response.data[0].applicantDetails?.speaking !== undefined ? response.data[0].applicantDetails?.speaking : ''}`
      ],
      [
        'UNIVERSITY NAME AND COUSRE(THAT YOU ARE APPLYING FOR)',
        `UNIVERSITY :${response.data[0].applicantDetails?.university !== undefined ? response.data[0].applicantDetails?.university : ''}       COURSE: ${response.data[0].applicantDetails?.course_name !== undefined ? response.data[0].applicantDetails?.course_name : ''}`
      ],
      ['EMPLOYMENT OR BUSINESS DETAILS:-'],
      ['', '', 'CO-APPLICANT-1', 'CO-APPLICANT-2'],
      ['TYPES OF', response.data[0].applicantDetails.type_of_employment],
      [
        'COMPANY NAME',
        response.data[0].applicantDetails.company_name,
        response.data[0].co_applicant1_company_name,
        response.data[0].co_applicant2_company_name
      ],
      [
        'DESIGNATION',
        response.data[0].applicantDetails.applicant_designation,
        response.data[0].co_applicant1_applicant_designation,
        response.data[0].co_applicant2_applicant_designation
      ],
      [
        'TOTAL WORK EXPERIENCE',
        response.data[0].applicantDetails.work_experience,
        response.data[0].co_applicant1_work_experience,
        response.data[0].co_applicant2_work_experience
      ],
      [
        'NO OF YEAR IN current work',
        response.data[0].applicantDetails.current_work_experience,
        response.data[0].co_applicant1_current_work_experience,
        response.data[0].co_applicant2_current_work_experience
      ],
      [
        'BUSINESS ADDRESS/ company address WITH PINCODE',
        `${response.data[0].applicantDetails?.bussiness_address !== undefined ? response.data[0].applicantDetails?.bussiness_address : ''}  ${response.data[0].applicantDetails?.bussiness_address !== undefined ? 'Pin :' + response.data[0].applicantDetails?.bussiness_pincode : ''} `,
        `${response.data[0].co_applicant1_bussiness_address !== undefined ? response.data[0].co_applicant1_bussiness_address : ''}  ${response.data[0].co_applicant1_bussiness_address !== undefined ? 'Pin :' + response.data[0].co_applicant1_bussiness_pincode : ''} `,
        `${response.data[0].co_applicant2_bussiness_address !== undefined ? response.data[0].co_applicant2_bussiness_address : ''}  ${response.data[0].co_applicant2_bussiness_address !== undefined ? 'Pin :' + response.data[0].co_applicant2_bussiness_pincode : ''} `
      ],
      [
        'NET MONTHLY INCOME',
        response.data[0].applicantDetails.net_monthly_income,
        response.data[0].co_applicant1_net_monthly_income,
        response.data[0].co_applicant2_net_monthly_income
      ],
      [
        'OTHER INCOME',
        response.data[0].applicantDetails.other_income,
        response.data[0].co_applicant1_other_income,
        response.data[0].co_applicant2_other_income
      ],
      ['', '', 'INVESTMENT DETAILS:'],
      ['GOLD-', response.data[0].applicantDetails.gold, response.data[0].co_applicant1_gold, response.data[0].co_applicant2_gold],
      ['LAND-', response.data[0].applicantDetails.land, response.data[0].co_applicant1_land, response.data[0].co_applicant2_land],
      [
        'LIFE INSURANCE POLICY - ',
        response.data[0].applicantDetails.life_insurance_policy,
        response.data[0].co_applicant1_life_insurance_policy,
        response.data[0].co_applicant2_life_insurance_policy
      ],
      [
        'PROPERTY-',
        response.data[0].applicantDetails.property,
        response.data[0].co_applicant1_property,
        response.data[0].co_applicant2_property
      ],
      ['SHARES-', response.data[0].applicantDetails.shares, response.data[0].co_applicant1_shares, response.data[0].co_applicant2_shares],
      [
        'RENT INCOME-',
        response.data[0].applicantDetails.rent_income,
        response.data[0].co_applicant1_rent_income,
        response.data[0].co_applicant2_rent_income
      ],
      [
        'BANK BALANCE-',
        response.data[0].applicantDetails.bank_balance,
        response.data[0].co_applicant1_bank_balance,
        response.data[0].co_applicant2_bank_balance
      ],
      [''],
      ['', '', 'BANK DETAILS-'],
      [
        'BANK NAME',
        response.data[0].applicantDetails.bank_name,
        response.data[0].co_applicant1_bank_name,
        response.data[0].co_applicant2_bank_name
      ],
      [
        'ACCOUNT NUMBER',
        response.data[0].applicantDetails.account_number,
        response.data[0].co_applicant1_account_number,
        response.data[0].co_applicant2_account_number
      ],
      [
        'IFSC CODE',
        response.data[0].applicantDetails.ifsc_code,
        response.data[0].co_applicant1_ifsc_code,
        response.data[0].co_applicant2_ifsc_code
      ],
      ['', '', 'CURRENTLY RUNNING LOAN DETAILS'],
      ['BANK', 'TYPE OF LOAN', 'SANCTION  AMOUMT', 'EMI OF LOAN'],
      [
        response.data[0].applicantDetails.currently_running_loan_bank,
        response.data[0].applicantDetails.currently_running_loan_type,
        response.data[0].applicantDetails.currently_running_loan_sanction_amount,
        response.data[0].applicantDetails.currently_running_loan_emi
      ],
      [
        response.data[0].co_applicant1_currently_running_loan_bank,
        response.data[0].co_applicant1_currently_running_loan_type,
        response.data[0].co_applicant1_currently_running_loan_sanction_amount,
        response.data[0].co_applicant1_currently_running_loan_emi
      ],
      [
        response.data[0].co_applicant2_currently_running_loan_bank,
        response.data[0].co_applicant2_currently_running_loan_type,
        response.data[0].co_applicant2_currently_running_loan_sanction_amount,
        response.data[0].co_applicant2_currently_running_loan_emi
      ]
    ];
    const sheet = XLSX.utils.aoa_to_sheet(dataForExcel);
    const headerCellStyle = { font: { bold: true }, alignment: { wrapText: true } };
    for (let col = 0; col < dataForExcel[0].length; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
      XLSX.utils.format_cell(sheet[cellRef], headerCellStyle);
    }

    // Set border style for all cells
    const borderStyle = {
      top: { style: 'thin', color: { rgb: '000000' } },
      bottom: { style: 'thin', color: { rgb: '000000' } },
      left: { style: 'thin', color: { rgb: '000000' } },
      right: { style: 'thin', color: { rgb: '000000' } }
    };
    for (let row = 0; row < dataForExcel.length; row++) {
      for (let col = 0; col < dataForExcel[row].length; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
        if (!sheet[cellRef]) continue; // Skip if cell does not exist
        sheet[cellRef].s = { ...sheet[cellRef].s, border: borderStyle };
      }
    }

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // Width for the first column
      { wch: 30 }, // Width for the second column
      { wch: 30 }, // Width for the third column
      { wch: 30 } // Width for the fourth column
    ];

    // Apply column widths to the sheet
    columnWidths.forEach((width, colIndex) => {
      sheet['!cols'] = sheet['!cols'] || [];
      sheet['!cols'][colIndex] = width;
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

    // Save the Excel file
    XLSX.writeFile(workbook, 'applicant_details.xlsx');
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <MainCard title={'Customers'}>
            <Box sx={{ width: '100%', typography: 'subtitle1' }}>
              <CommonTable rows={staffData} columns={columnsWithStatusText} isloading={loading} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Customer;
