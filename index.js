// import { mkConfig, generateCsv, download, asString } from "/export-to-csv.js";
import fs from 'fs';
// const csvConfig = mkConfig({ useKeysAsHeaders: true });

const url = 'https://aqs.epa.gov/data/api';
const email = 'keiran.kozlowski@med.uvm.edu';
const key = 'amberbird38';

const chittendenVtZips = "05468 05401 05408 05452 05461 05403 05446 05404 05445 05495 05482 05465 05489 05477 05477";
const franklinVtZips = "05450 05478 05448 05488 05459"
const addisonVtZips = "05491 05753 05443 05456 05487 05473 05770"
const rutlandVtZips = "05733 05738 05701 05731 05777"
const washingtonVtZips = "05676 05677 05650 05660 05602"
const lamoilleVtZips = "05680 05464 05656 05661 05654 05492 05672"
const orangeVtZips = "05086 05679"
const grandisleVtZips = "05458 05486 05463"
const franklinNyZips = "12983"
const essexNyZips = "12996 12928 12932 12997 12941"
const stlawrenceNyZips = "13680"
const clintonNyZips = "12918"
const warrenNyZips = "12836"
const hartfordCtZips = "06035"

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


async function runPM25(param, startDate, endDate) {

  // query for Chittenden Co, VT
  const data1 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '007');
  const chittendenVt2pt5Data = data1.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: chittendenVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, VT
  const data2 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '011');
  const franklinVt2pt5Data = data2.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: franklinVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Addison Co, VT
  const data3 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '001');
  const addisonVt2pt5Data = data3.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: addisonVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Rutland Co, VT
  const data4 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '021');
  const rutlandVt2pt5Data = data4.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: rutlandVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Washington Co, VT
  const data5 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '023');
  const washingtonVt2pt5Data = data5.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: washingtonVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Lamoille Co, VT
  const data6 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '015');
  const lamoilleVt2pt5Data = data6.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: lamoilleVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Orange Co, VT
  const data7 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '017');
  const orangeVt2pt5Data = data7.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: orangeVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Grand Isle Co, VT
  const data8 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '013');
  const grandisleVt2pt5Data = data8.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: grandisleVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, NY
  const data9 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '033');
  const franklinNy2pt5Data = data9.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: franklinNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Essex Co, NY
  const data10 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '031');
  const essexNy2pt5Data = data10.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: essexNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for St Lawrence Co, NY
  const data11 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '089');
  const stlawrenceNy2pt5Data = data11.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: stlawrenceNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Clinton Co, NY
  const data12 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '019');
  const clintonNy2pt5Data = data12.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: clintonNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Warren Co, NY
  const data13 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '113');
  const warrenNy2pt5Data = data13.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: warrenNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hartford Co, CT
  const data14 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '09', '003');
  const hartfordCt2pt5Data = data14.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: hartfordCtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Coos Co, NH
  const data15 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '007');
  const coosNh2pt5Data = data15.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Grafton Co, NH
  const data16 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '009');
  const graftonNh2pt5Data = data16.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Carroll Co, NH
  const data17 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '003');
  const carrollNh2pt5Data = data17.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Sullivan Co, NH
  const data18 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '019');
  const sullivanNh2pt5Data = data18.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Merrimack Co, NH
  const data19 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '013');
  const merrimackNh2pt5Data = data19.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Belknap Co, NH
  const data20 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '001');
  const belknapNh2pt5Data = data20.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Strafford Co, NH
  const data21 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '017');
  const straffordNh2pt5Data = data21.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Cheshire Co, NH
  const data22 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '005');
  const cheshireNh2pt5Data = data22.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hillsborough Co, NH
  const data23 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '011');
  const hillsboroughNh2pt5Data = data23.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Rockingham Co, NH
  const data24 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '015');
  const rockinghamNh2pt5Data = data24.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Berkshire Co, MA
  const data25 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '003');
  const berkshireMa2pt5Data = data25.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, MA
  const data26 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '011');
  const franklinMa2pt5Data = data26.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hampshire Co, MA
  const data27 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '015');
  const hampshireMa2pt5Data = data27.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hampden Co, MA
  const data28 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '013');
  const hampdenMa2pt5Data = data28.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });
  
  const combinedObject = Object.values({ ...chittendenVt2pt5Data, ...franklinVt2pt5Data, ...addisonVt2pt5Data, ...rutlandVt2pt5Data, ...washingtonVt2pt5Data, ...lamoilleVt2pt5Data, ...orangeVt2pt5Data, ...grandisleVt2pt5Data, ...franklinNy2pt5Data, ...essexNy2pt5Data, ...stlawrenceNy2pt5Data, ...clintonNy2pt5Data, ...warrenNy2pt5Data, ...hartfordCt2pt5Data, ...coosNh2pt5Data, ...graftonNh2pt5Data, ...carrollNh2pt5Data, ...sullivanNh2pt5Data, ...merrimackNh2pt5Data, ...belknapNh2pt5Data, ...straffordNh2pt5Data, ...cheshireNh2pt5Data, ...hillsboroughNh2pt5Data, ...rockinghamNh2pt5Data, ...berkshireMa2pt5Data, ...franklinMa2pt5Data, ...hampshireMa2pt5Data, ...hampdenMa2pt5Data }).join("\n");

  // final write for pm2.5
  fs.writeFile('./data/pm2.5.csv', combinedObject, (err) => {
    if (err) {
      console.error('Error writing CSV file:', err);
    } else {
      console.log('CSV file written successfully!');
    }
  });
}

async function runOzone(param, startDate, endDate) {

  // query for Chittenden Co, VT
  const data1 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '007');
  const chittendenVt2pt5Data = data1.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: chittendenVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, VT
  const data2 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '011');
  const franklinVt2pt5Data = data2.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: franklinVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Addison Co, VT
  const data3 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '001');
  const addisonVt2pt5Data = data3.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: addisonVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Rutland Co, VT
  const data4 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '021');
  const rutlandVt2pt5Data = data4.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: rutlandVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Washington Co, VT
  const data5 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '023');
  const washingtonVt2pt5Data = data5.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: washingtonVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Lamoille Co, VT
  const data6 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '015');
  const lamoilleVt2pt5Data = data6.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: lamoilleVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Orange Co, VT
  const data7 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '017');
  const orangeVt2pt5Data = data7.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: orangeVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Grand Isle Co, VT
  const data8 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '013');
  const grandisleVt2pt5Data = data8.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: grandisleVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, NY
  const data9 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '033');
  const franklinNy2pt5Data = data9.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: franklinNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Essex Co, NY
  const data10 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '031');
  const essexNy2pt5Data = data10.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: essexNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for St Lawrence Co, NY
  const data11 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '089');
  const stlawrenceNy2pt5Data = data11.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: stlawrenceNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Clinton Co, NY
  const data12 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '019');
  const clintonNy2pt5Data = data12.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: clintonNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Warren Co, NY
  const data13 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '113');
  const warrenNy2pt5Data = data13.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: warrenNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hartford Co, CT
  const data14 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '09', '003');
  const hartfordCt2pt5Data = data14.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: hartfordCtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Coos Co, NH
  const data15 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '007');
  const coosNh2pt5Data = data15.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Grafton Co, NH
  const data16 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '009');
  const graftonNh2pt5Data = data16.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Carroll Co, NH
  const data17 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '003');
  const carrollNh2pt5Data = data17.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Sullivan Co, NH
  const data18 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '019');
  const sullivanNh2pt5Data = data18.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Merrimack Co, NH
  const data19 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '013');
  const merrimackNh2pt5Data = data19.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Belknap Co, NH
  const data20 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '001');
  const belknapNh2pt5Data = data20.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Strafford Co, NH
  const data21 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '017');
  const straffordNh2pt5Data = data21.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Cheshire Co, NH
  const data22 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '005');
  const cheshireNh2pt5Data = data22.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hillsborough Co, NH
  const data23 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '011');
  const hillsboroughNh2pt5Data = data23.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Rockingham Co, NH
  const data24 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '015');
  const rockinghamNh2pt5Data = data24.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Berkshire Co, MA
  const data25 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '003');
  const berkshireMa2pt5Data = data25.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, MA
  const data26 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '011');
  const franklinMa2pt5Data = data26.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hampshire Co, MA
  const data27 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '015');
  const hampshireMa2pt5Data = data27.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hampden Co, MA
  const data28 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '013');
  const hampdenMa2pt5Data = data28.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });
  
  const combinedObject = Object.values({ ...chittendenVt2pt5Data, ...franklinVt2pt5Data, ...addisonVt2pt5Data, ...rutlandVt2pt5Data, ...washingtonVt2pt5Data, ...lamoilleVt2pt5Data, ...orangeVt2pt5Data, ...grandisleVt2pt5Data, ...franklinNy2pt5Data, ...essexNy2pt5Data, ...stlawrenceNy2pt5Data, ...clintonNy2pt5Data, ...warrenNy2pt5Data, ...hartfordCt2pt5Data, ...coosNh2pt5Data, ...graftonNh2pt5Data, ...carrollNh2pt5Data, ...sullivanNh2pt5Data, ...merrimackNh2pt5Data, ...belknapNh2pt5Data, ...straffordNh2pt5Data, ...cheshireNh2pt5Data, ...hillsboroughNh2pt5Data, ...rockinghamNh2pt5Data, ...berkshireMa2pt5Data, ...franklinMa2pt5Data, ...hampshireMa2pt5Data, ...hampdenMa2pt5Data }).join("\n");

  // final write for ozone
  fs.writeFile('./data/ozone.csv', combinedObject, (err) => {
    if (err) {
      console.error('Error writing CSV file:', err);
    } else {
      console.log('CSV file written successfully!');
    }
  });
}

async function runNO2(param, startDate, endDate) {

  // query for Chittenden Co, VT
  const data1 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '007');
  const chittendenVt2pt5Data = data1.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: chittendenVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, VT
  const data2 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '011');
  const franklinVt2pt5Data = data2.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: franklinVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Addison Co, VT
  const data3 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '001');
  const addisonVt2pt5Data = data3.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: addisonVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Rutland Co, VT
  const data4 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '021');
  const rutlandVt2pt5Data = data4.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: rutlandVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Washington Co, VT
  const data5 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '023');
  const washingtonVt2pt5Data = data5.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: washingtonVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Lamoille Co, VT
  const data6 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '015');
  const lamoilleVt2pt5Data = data6.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: lamoilleVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Orange Co, VT
  const data7 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '017');
  const orangeVt2pt5Data = data7.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: orangeVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Grand Isle Co, VT
  const data8 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '50', '013');
  const grandisleVt2pt5Data = data8.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: grandisleVtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, NY
  const data9 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '033');
  const franklinNy2pt5Data = data9.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: franklinNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Essex Co, NY
  const data10 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '031');
  const essexNy2pt5Data = data10.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: essexNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for St Lawrence Co, NY
  const data11 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '089');
  const stlawrenceNy2pt5Data = data11.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: stlawrenceNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Clinton Co, NY
  const data12 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '019');
  const clintonNy2pt5Data = data12.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: clintonNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Warren Co, NY
  const data13 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '36', '113');
  const warrenNy2pt5Data = data13.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: warrenNyZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hartford Co, CT
  const data14 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '09', '003');
  const hartfordCt2pt5Data = data14.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, zipCodes: hartfordCtZips, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Coos Co, NH
  const data15 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '007');
  const coosNh2pt5Data = data15.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Grafton Co, NH
  const data16 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '009');
  const graftonNh2pt5Data = data16.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Carroll Co, NH
  const data17 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '003');
  const carrollNh2pt5Data = data17.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Sullivan Co, NH
  const data18 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '019');
  const sullivanNh2pt5Data = data18.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Merrimack Co, NH
  const data19 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '013');
  const merrimackNh2pt5Data = data19.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Belknap Co, NH
  const data20 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '001');
  const belknapNh2pt5Data = data20.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Strafford Co, NH
  const data21 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '017');
  const straffordNh2pt5Data = data21.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Cheshire Co, NH
  const data22 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '005');
  const cheshireNh2pt5Data = data22.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hillsborough Co, NH
  const data23 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '011');
  const hillsboroughNh2pt5Data = data23.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Rockingham Co, NH
  const data24 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '33', '015');
  const rockinghamNh2pt5Data = data24.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Berkshire Co, MA
  const data25 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '003');
  const berkshireMa2pt5Data = data25.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Franklin Co, MA
  const data26 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '011');
  const franklinMa2pt5Data = data26.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hampshire Co, MA
  const data27 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '015');
  const hampshireMa2pt5Data = data27.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });

  // query for Hampden Co, MA
  const data28 = await getDailySummaryByCounty(email, key, param, startDate, endDate, '25', '013');
  const hampdenMa2pt5Data = data28.Data.map(row => {
    const processedRow = { date: row.date_local, state: row.state, county: row.county, parameter: row.parameter, maxVal: row.first_max_value, avgVal: row.arithmetic_mean };
    return Object.values(processedRow).join(",");
  });
  
  const combinedObject = Object.values({ ...chittendenVt2pt5Data, ...franklinVt2pt5Data, ...addisonVt2pt5Data, ...rutlandVt2pt5Data, ...washingtonVt2pt5Data, ...lamoilleVt2pt5Data, ...orangeVt2pt5Data, ...grandisleVt2pt5Data, ...franklinNy2pt5Data, ...essexNy2pt5Data, ...stlawrenceNy2pt5Data, ...clintonNy2pt5Data, ...warrenNy2pt5Data, ...hartfordCt2pt5Data, ...coosNh2pt5Data, ...graftonNh2pt5Data, ...carrollNh2pt5Data, ...sullivanNh2pt5Data, ...merrimackNh2pt5Data, ...belknapNh2pt5Data, ...straffordNh2pt5Data, ...cheshireNh2pt5Data, ...hillsboroughNh2pt5Data, ...rockinghamNh2pt5Data, ...berkshireMa2pt5Data, ...franklinMa2pt5Data, ...hampshireMa2pt5Data, ...hampdenMa2pt5Data }).join("\n");

  // final write for no2
  fs.writeFile('./data/no2.csv', combinedObject, (err) => {
    if (err) {
      console.error('Error writing CSV file:', err);
    } else {
      console.log('CSV file written successfully!');
    }
  });
}

runPM25('88101', '20230501', '20230930');
runOzone('44201', '20230501', '20230930');
runNO2('42602', '20230501', '20230930');
