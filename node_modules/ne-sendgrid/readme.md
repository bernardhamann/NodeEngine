# ne-sendgrid (Node Engine Sendgrid


## Default use

neSendgrid = require('ne-sendgrid')

neSendgrid.sendText({
    to: "name@mail.com",
    from: "name@mail.com",
    subject: "This is the subject line",
    body: "This is the body 2"
})

// or 

neSendgrid.sendHTML({
    to: "name@mail.com",
    from: "name@mail.com",
    subject: "This is the subject line",
    body: "<h1>heading</h1><p>paragraph of text</p>"
})


## Contact form

Just make a form that posts to /emails/sendgrid/inbound with a fields for:

- to
- from
- subject
- body

Simple example with only required fields

```js

<form action="/emails/sendgrid/inbound" method="post">
    <input type="text" name="to"></input>
    <input type="text" name="from"></input>
    <input type="text" name="subject"></input>
    <input type="text" name="body"></input>
    <input type="submit" value="anything"></input>
</form>

```

Simple example with optional extra fields

```js

<form action="/emails/sendgrid/inbound" method="post">
    <input type="text" name="to"></input>
    <input type="text" name="from"></input>
    <input type="text" name="subject"></input>
    <input type="text" name="body"></input>
    <input type="text" name="name"></input>
    <input type="text" name="phone"></input>
    <input type="submit" value="anything"></input>
</form>

```

The order does not matter and you can add labels etc in between.


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