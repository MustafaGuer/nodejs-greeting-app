const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write("<html lang='en'>");
    res.write("<head><title>Node.js Users App</title></head>");
    res.write("<body>");
    res.write("<h1>Hello from Node.js Users App</h1>");
    res.write("<form action='/create-user' method='post'><input type='text' name='username' /><button type='submit'>Save</button></form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === '/users') {
    res.write("<html lang='en'>");
    res.write("<head><title>Node.js Users List</title></head>");
    res.write("<body>");
    res.write("<ul><li>MusG</li><li>Hanslan</li><li>Goodmen</li></ul>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const enteredUsername = parsedBody.split("=")[1];
      console.log(enteredUsername);
      res.writeHead(302, {Location: "/users"});
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html lang='en'>");
  res.write("<head><title>My first Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;