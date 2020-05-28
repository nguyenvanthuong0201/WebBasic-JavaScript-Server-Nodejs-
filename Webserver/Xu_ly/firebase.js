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
  async Add_user(Loai_doi_tuong, Doi_tuong,id) {
    try {
      var them = await admin.firestore().collection(Loai_doi_tuong).doc(id).set(Doi_tuong);
      return them;
    } catch (error) {
      console.log(error);
    }
  }
}
var xuly=new Xu_ly_nhan_vien;
module.exports = xuly;
