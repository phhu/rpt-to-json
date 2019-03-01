
//split txt into slices according to lengths
const splitRow = lengths => txt => {
  const ret = lengths.reduce(([txt,res],l)=>{
    res.push(txt.substr(0,l));
    return [txt.substr(l) ,res];
    },[txt,[]]);
  return ret[1];
};

const removeTail = arr => {
  const re= /^(\s*|\(\d+ row\(s\) affected\))$/;
  while(arr[arr.length-1] !== undefined && arr[arr.length-1].match(re) ){
    arr.pop();
  }  
  return arr;
}

const parseSingleResult = txt => {
  try{
  const [title, line, ...rest] = txt.split(/\r?\n/);
  //const countText = rest.slice(-2)[0];
  //const rowCount = parseInt(countText.replace(/^\((\d+) .*/,"$1"));
  // bad idea as last three might not be present.... better to detect via regexp
  //const dataRows = rest.slice(0,-3);    // last three are - 
  const dataRows = removeTail(rest);    // last three are - 
  
  
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
  } catch (e){
    return {ERROR:e};
  } 
}
// split into groups by return followed by one row of text (titles) and one row of lines
// then parse each one
const parseRptToJson = rpt => rpt
  //.split(/\r?\n(?=.+\n-{5}[ -]*[\r\n$]+)/)   
  .split(/\r?\n(?=.+\r?\n-{5}[ -]*[\r\n$]+)/)   
  //.split(/\r?\n(?=.+\r\n)/m)   
  .map(parseSingleResult)
;

module.exports = {
  parseRptToJson
};
