const {expect} = require('chai');

//const {parseRptToJson} = require('../dist/index');
const {parseRptToJson} = require('../rptToJson');
const fs = require('fs');

const readFile = f => fs.readFileSync(f).toString()

const truncate = x => x.split("\n").slice(0,-3).join("\n");

describe("Tests", () => {
  const rptFile = readFile(__dirname + '/testdata.rpt');
  const res = parseRptToJson(rptFile);
  const resTrunc = parseRptToJson(truncate(rptFile));
  const target = JSON.parse(readFile(__dirname + '/output.json'));  
    
  //console.log(JSON.stringify(res,null,2)); 
  it("should find 4 data sets", () => {
    expect(res.length).to.equal(4);
  })
  it("should parse rpt data to json", () => {
    expect(res).to.deep.equal(target);
  })
  it("should handle missing tail rows", () => {
    expect(resTrunc).to.deep.equal(target);
  })
});
