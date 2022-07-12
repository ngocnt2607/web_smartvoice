import { message } from "antd";
import React from "react";
import * as XLSX from "xlsx";
import PropTypes from 'prop-types'

const UploadXLSXProps =  {
  setPhoneNumber: PropTypes.func.isRequired,
}

//Get phone number 
const ROW_PHONE_NUMBER = 'msisdn'


function UploadXLSX({setPhoneNumber}) {

  const onImportExcel = async (event) => {
    event.preventDefault()
    const { files } = event.target;
    if (files.length === 1) {
      // Process a file if we have exact one
      const data = await readExcelFile(files[0])
      setPhoneNumber(data.map(item => item[ROW_PHONE_NUMBER]))
      return
    }

    setPhoneNumber([])
  }

  const readExcelFile = async (file) => {
    // Return a promise read file
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const { result } = event.target;
          const workbook = XLSX.read(result, { type: "binary" });
          for (const Sheet in workbook.Sheets) {
            // var XL_row_object =
            const sheetName = "Sheet1";
            XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (workbook.Sheets.hasOwnProperty(Sheet)) {
              const data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
              resolve(data)
            }
          }
          message.success("upload success!");
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsBinaryString(file);
    });
  }



  return (
    <div style={{ display: "flex" }}>
      <input type="file" accept=".xlsx, .xls" onChange={onImportExcel} />
      {/* {file > 0 && <PreviewXLSX data={fileData} />} */}
    </div>
  );
}

UploadXLSX.propTypes = UploadXLSXProps

export default React.memo(UploadXLSX) 
