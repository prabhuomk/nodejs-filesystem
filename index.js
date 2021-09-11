import express from "express";
import cors from "cors";
import fs  from "fs";

const app = express();
const PORT = process.env.PORT||5000 ;

app.use(express.json());
app.use(cors());

// creating time stamp

let content = Date.now();

let fn = new Date();
let filename = fn.getDate() + "-" + (fn.getMonth() + 1) + "-" + fn.getFullYear() +
   "-" + fn.getHours() + "-" + fn.getMinutes() + "-" + fn.getSeconds() + ".txt";

//creating directory
function directory(){
  var dir = './myfiles';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  return dir;
  }
   directory();
  
// creating new file in mylifes directory

app.get("/createNewFile", async (request, response) => {
  await fs.writeFileSync(`./myfiles/${filename}`, `${content}`, (err) => {
    console.log(err ? err : "Success!");
  });
  console.log("file created")
  response.send(filename);
});

// listing all the files from myfiles directory

app.get("/listFiles", (request, response) => {
  fs.readdir("./myfiles/", async (err, files) => {
    let list = [];
    await files.forEach((file) => {
      console.log(file);
      list.push(file);
    });
    response.send(list);
  });
});

app.listen(PORT, () => console.log("The server got takeoff: ", PORT));