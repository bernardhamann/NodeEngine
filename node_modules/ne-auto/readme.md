# ne-auto (Node Engine Auto)

## Inputs / Outputs

### neAuto.server(dirName, optionsObject)

Inputs
- optionsObject.cacheTime = 10000 // value in m-seconds
- var dirName = __dirname
- process.env.PORT
- process.env.MONGO_URL
- some tool must compile appmeta, routes, dataRef files to the neCompilePath, these files have specific formats, neGulp can compile these files 
- default neCompilePath is "../../../node_engine/ne-gulp/"
- optionsObject.neCompilePath = "../../../node_engine/ne-gulp/" // to change the neCompilePath the path is relative to the serverConfig.js file in the ne-auto folder in the node_modules folder

Outputs
- Creates a server at the port 
- etc


### More info

See the inputs and outputs file for this modules in the Node Engine Docs


## Changelog

See the changelog.md file


## License 

The MIT License (MIT)

Copyright (c) 2015 Bernard Hamann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.