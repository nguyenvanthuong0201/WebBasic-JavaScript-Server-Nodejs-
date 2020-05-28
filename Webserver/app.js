
var NodeJs_https = require('http');
var Database = require("./Xu_ly/firebase");
var Port = normalizePort(process.env.PORT || 1200);
var Xu_ly_Tham_so = require('querystring');

var object = {}
var Danh_sach_Nguoi_dung = Database.Get_user();
Danh_sach_Nguoi_dung.then(Kq => {
    object.Danh_sach_Nguoi_dung =Kq;
})


var Server = NodeJs_https.createServer((Yeu_cau , Dap_ung)=>{
    var Chuoi_Nhan="";
    var Dia_chi_Xu_ly = Yeu_cau.url.replace("/","");
    Yeu_cau.on('data',(chuck) => { Chuoi_Nhan += chuck})
    Yeu_cau.on('end',() =>{ 
        var Tham_so= Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?",""))
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly;
        var Chuoi_Kq="";
        if(Ma_so_Xu_ly=="Doc_Danh_sach_Nguoi_dung")
        {
            var du_lieu = {}
            du_lieu.Danh_sach_Nguoi_dung = object.Danh_sach_Nguoi_dung
            Chuoi_Kq = JSON.stringify(object.Danh_sach_Nguoi_dung);
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Dap_ung.end(Chuoi_Kq);
        }
        else
        {
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Dap_ung.end("Trang Chủ");
        }
    })
})
Server.listen(Port,console.log(`dịch vụ dữ liệu thực thi tại địa chỉ http://localhost:${Port}`));

Server.on("error", onError);
Server.on("listening",onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string' ?
        'Pipe ' + Port :
        'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = Server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}