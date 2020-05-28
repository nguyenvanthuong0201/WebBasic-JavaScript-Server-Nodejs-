var admin = require("firebase-admin");
var serviceAccount = require("../quanLyNhanVien.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quanlynhanvien-136ee.firebaseio.com",
});
let db= admin.firestore();
class Xu_ly_nhan_vien {
  async Get_user() {
    try {
      var db = await admin.firestore().collection("users").get();
      var Nguoi_dung = db.docs.map((doc) => doc.data());
      return Nguoi_dung;
    } catch (Loi) {
      console.log(Loi);
    }
  }
}
var xuly=new Xu_ly_nhan_vien;
module.exports = xuly;
