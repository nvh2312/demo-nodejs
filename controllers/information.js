var modelInformation = require("../models/information");

exports.getInformation = async (req, res, next) => {
  let data = await modelInformation.fetchAll();
  res.json({
    data: data,
  });
};

exports.addInformation = (req, res, next) => {
  let name = req.body.name,
    phone = req.body.phone,
    prov = req.body.province,
    dist = req.body.district,
    ward = req.body.ward,
    addr = req.body.address,
    full_addr = req.body.fulladdress,
    defau = req.body.default;
  modelInformation.add(name, phone, prov, dist, ward, addr, full_addr, defau);
  res.json({
    message: "data",
  });
};
exports.fetchSingleInformation = async (req, res, next) => {
  let id = req.body.id;
  let data = await modelInformation.fetchSingle(id);
  res.json({
    data: data,
  });
};
exports.editInformation = (req, res, next) => {
  let name = req.body.name,
    phone = req.body.phone,
    prov = req.body.province,
    dist = req.body.district,
    ward = req.body.ward,
    addr = req.body.address,
    full_addr = req.body.fulladdress,
    defau =req.body.default ,
    id = req.body.id;
  modelInformation.edit(
    name,
    phone,
    prov,
    dist,
    ward,
    addr,
    full_addr,
    defau,
    id
  );
  res.json({
    message: "data-edit",
  });
};
exports.deleteInformation = (req, res, next) => {
  id = req.body.id;
  modelInformation.delete(id);
  res.json({
    message: "data-delete",
  });
};
exports.defaultInformation = (req, res, next) => {
  id = req.body.id;
  modelInformation.editDefault(id);
  res.json({
    message: "data-update-df",
  });
};
