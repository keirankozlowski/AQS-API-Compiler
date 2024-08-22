// import { mkConfig, generateCsv, download, asString } from "/export-to-csv.js";
import fs from 'fs';
// const csvConfig = mkConfig({ useKeysAsHeaders: true });

const url = 'https://aqs.epa.gov/data/api';
const email = 'keiran.kozlowski@med.uvm.edu';
const key = 'amberbird38';

async function getDailySummaryByCounty(email, key, param, bdate, edate, state, county) {
    try {
        const response = await fetch(`${url}/dailyData/byCounty?email=${email}&key=${key}&param=${param}&bdate=${bdate}&edate=${edate}&state=${state}&county=${county}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        //   console.log(json);
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

// queries for Chittenden Co, VT
async function runChittendenCoVt() {
    const data1 = await getDailySummaryByCounty(email, key, '88101', '20230501', '20230930', '50', '007');
    const chittenden2pt5Data = data1.Data.map(row => {
        const processedRow = {date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean};
        return Object.values(processedRow).join(",");
      }).join("\n");
    
    fs.writeFile('./data/vt/chittenden/pm2.5.csv', chittenden2pt5Data, (err) => {
        if (err) {
          console.error('Error writing CSV file:', err);
        } else {
          console.log('CSV file written successfully!');
        }
      });

      const data2 = await getDailySummaryByCounty(email, key, '44201', '20230501', '20230930', '50', '007');
      const chittendenOzoneData = data2.Data.map(row => {
          const processedRow = {date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean};
          return Object.values(processedRow).join(",");
        }).join("\n");
      
      fs.writeFile('./data/vt/chittenden/ozone.csv', chittendenOzoneData, (err) => {
          if (err) {
            console.error('Error writing CSV file:', err);
          } else {
            console.log('CSV file written successfully!');
          }
        });

        const data3 = await getDailySummaryByCounty(email, key, '42602', '20230501', '20230930', '50', '007');
        const chittendenNO2Data = data3.Data.map(row => {
            // date_local, state, county,parameter, first_max_value, arithmetic_mean
            const processedRow = {date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean};
            return Object.values(processedRow).join(",");
          }).join("\n");
        
        fs.writeFile('./data/vt/chittenden/no2.csv', chittendenNO2Data, (err) => {
            if (err) {
              console.error('Error writing CSV file:', err);
            } else {
              console.log('CSV file written successfully!');
            }
          });
}

runChittendenCoVt();

