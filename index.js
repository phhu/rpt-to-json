
//split txt into slices according to lengths
const splitRow = lengths => txt => {
  const ret = lengths.reduce(([txt,res],l)=>{
    res.push(txt.substr(0,l));
    return [txt.substr(l) ,res];
    },[txt,[]]);
  return ret[1];
};

const parseSingleResult = txt => {
  const [title, line, ...rest] = txt.split(/\r?\n/);
  //const countText = rest.slice(-2)[0];
  //const rowCount = parseInt(countText.replace(/^\((\d+) .*/,"$1"));
  const dataRows = rest.slice(0,-3);    // last three are 
  const lengths = line.split(" ").map(x=>x.length + 1);
  
  const splitter = splitRow(lengths);
  const splitTrim = x=> splitter(x).map(x=>x.trim())
  
  const fieldNames = splitTrim(title).map(x=>x.toLowerCase());
  //const lines = splitTrim(line);
  const data = dataRows.map(splitTrim);
  const objectWithFieldNames = fieldNames => row => 
    row.reduce((obj,value,i)=>{obj[fieldNames[i]]=value;return obj;}, {} );
  const dataObj = data.map(objectWithFieldNames(fieldNames));
  /*return {    
    //title,
    //titles
    //,line
    //,lines
    //,lengths
    //,dataRows
    dataObj: dataObj[0]
    ,txt
    //,countText
    //,rowCount
  };*/
  return dataObj;
}
// split into groups by return followed by one row of text (titles) and one row of lines
// then parse each one
const parseRptToJson = rpt => rpt
  .split(/\r\n(?=^.{1,}[\r\n]*^-{5}[ -]*$)/m)   
  .map(parseSingleResult)
;

module.exports = {
  parseRptToJson
};
