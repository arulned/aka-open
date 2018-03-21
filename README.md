# aka-open
Command line node client for the Akamai APIs

## Requirements
* Follow https://github.com/akamai/AkamaiOPEN-edgegrid-node

## Usage: 
`$ chmod +x aka-open` to make it executable.
`$ ./aka-open <http-method> <url> [@file] [--edgerc=<location of the .edgerc file>] [--section=<section in the .edgerc file>]`

## Example: 
`$ ./aka-open.js GET /url/of/the/resource`

`$ ./aka-open.js PUT /url/of/the/resource @putBody.json`

`$ ./aka-open.js POST /url/of/the/resource @postBody.json`
