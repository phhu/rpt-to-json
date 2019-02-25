const {expect} = require('chai');

//const {parseRptToJson} = require('../dist/index');
const {parseRptToJson} = require('../index');
const fs = require('fs');

const readFile = f => fs.readFileSync(f).toString()

describe("Tests", () => {
  const rptFile = readFile(__dirname + '/testdata.rpt');
  const res = parseRptToJson(rptFile)
  const target = JSON.parse(readFile(__dirname + '/output.json'));  
    
  it("should parse rpt data to json", () => {
    expect(res).to.deep.equal(target);
  })
});

//fs.writeFileSync(__dirname + '/output.json',JSON.stringify(res,null,2));
