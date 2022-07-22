var db = require("./database");

let data = [];

module.exports = class Information {
  constructor() {}
  static fetchAll() {
    let sql = `select * from information`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, data) => {
        if (err) throw err;
        else {
          resolve(data);
        }
      });
    });
  }
  static add(name, phone, prov, dist, ward, addr, full_addr, defau) {
    let sql = `insert into information
    (name, phone, prov, dist,ward,addr,full_addr,defau) 
    VALUES ("${name}", "${phone}", "${prov}", "${dist}", "${ward}", "${addr}", "${full_addr}", "${defau}")`;

    db.query(sql, (err, data) => {
      if (err) throw err;
      else {
        return true;
      }
    });
  }
  static fetchSingle(id) {
    let sql = `SELECT * FROM information WHERE id = "${id}"`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, data) => {
        if (err) throw err;
        else resolve(data[0]);
      });
    });
  }
  static edit(name, phone, prov, dist, ward, addr, full_addr, defau, id) {
    let sql = `update information set
    name ="${name}",
    phone = "${phone}",
    prov = "${prov}",
    dist = "${dist}",
    ward = "${ward}",
    addr = "${addr}",
    full_addr = "${full_addr}",
    defau = "${defau}"
    WHERE id = "${id}"`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      return true;
    });
  }
  static delete(id) {
    let sql = `delete FROM information WHERE id = "${id}"`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      return true;
    });
  }
  static editDefault(id) {
    let sql = `update information set defau = 0`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      let sql1 = `update information set defau = 1 where id = "${id}"`;
      db.query(sql1, (err, data) => {
        if (err) throw err;
        return true;
      });
    });
  }
};
