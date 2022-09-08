var multer = require('multer');
var path = require('path');
var fs = require('fs');

var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    var stat = null;
    var teraz = Date.now();
    //console.log(req.body.caseId)
    try {

      stat = fs.statSync('uploads/' + req.body.caseId);

    } catch (err) {
      fs.mkdirSync('uploads/' + req.body.caseId);

    }

    //tutaj clg tez zadziala
    cb(null, 'uploads/' + req.body.caseId)

  },
  filename: function (req, file, cb) {

    var nowe_filanme = Date.now() + file.originalname
    //tutaj clg tez zadziala
    cb(null, nowe_filanme)



  }
})
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.pdf') {
      return cb(new Error('Only pdfs are allowed'))
      //to jeszcze dziala
    }

    cb(null, true)
  }
})

var deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

router.post('/fileadd', upload.single('file'), function (req, res, next) {
  //tutaj juz sie nic nie wykonuje
}
