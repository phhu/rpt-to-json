This coverts SQL server textual output (.rpt) to JSON. 

```
npm install rptToJson
```

```
const {parseRptToJson} = require('rptToJson');

const rpt = 
`id          value
----------- ---------------
1           0
-23333      another
-23333      test
-23334      Not everything
-23335      false

(5 row(s) affected)

id
-----------
-2422012
-2422011
-2422010

(3 row(s) affected)
`;

const json = parseRptToJson(rpt);
// json = [[{"id":"1","value":"0"},{"id":"-23333","value":"another"},{"id":"-23333","value":"test"},{"id":"-23334","value":"Not everything"},{"id":"-23335","value":"false"}],[{"id":"-2422012"},{"id":"-2422011"},{"id":"-2422010"}]]

```