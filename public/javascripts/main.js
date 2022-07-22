let arr = [];
let arr_dis = [];
let arr_ward = [];
let prov = "",
  dist = "",
  ward = "";
let arr_obj = [];
const postApi = "https://provinces.open-api.vn/api/?depth=3";
fetch(postApi)
  .then((response) => response.json())
  .then((json) => {
    arr = json;
    $("#exampleFormControlSelect1").append(
      "<option selected disabled hidden></option>"
    );
    json.forEach((value, index) => {
      $("#exampleFormControlSelect1").append(
        "<option value=" + index + ">" + value.name + "</option>"
      );
    });
    return json;
  });

function changed_Province(item) {
  $("#exampleFormControlSelect2").empty();
  $("#exampleFormControlSelect3").empty();
  $("#exampleFormControlSelect2").append(
    "<option selected disabled hidden></option>"
  );
  $("#exampleFormControlSelect2").prop("disabled", false);
  $("#exampleFormControlSelect2")[0].style.cursor = "pointer";
  $("#exampleFormControlSelect3")[0].style.cursor = "no-drop";
  $("#exampleFormControlSelect3").prop("disabled", true);
  prov = $("#exampleFormControlSelect1").val();
  $("#addr").val(arr[prov].name);
  arr_dis = arr[item.value].districts;
  arr_dis.forEach((value, index) => {
    $("#exampleFormControlSelect2").append(
      '<option value="' + index + '">' + value.name + "</option>"
    );
  });
}
function changed_District(item) {
  $("#exampleFormControlSelect3").empty();
  $("#exampleFormControlSelect3").append(
    "<option selected disabled hidden></option>"
  );
  $("#exampleFormControlSelect3").prop("disabled", false);
  $("#exampleFormControlSelect3")[0].style.cursor = "pointer";
  prov = $("#exampleFormControlSelect1").val();
  dist = $("#exampleFormControlSelect2").val();
  $("#addr").val(arr[prov].name + ", " + arr_dis[dist].name);
  arr_ward = arr_dis[item.value].wards;
  arr_ward.forEach((value, index) => {
    $("#exampleFormControlSelect3").append(
      '<option value="' + index + '">' + value.name + "</option>"
    );
  });
}

function changed_Ward(item) {
  prov = $("#exampleFormControlSelect1").val();
  dist = $("#exampleFormControlSelect2").val();
  ward = $("#exampleFormControlSelect3").val();
  $("#addr").val(
    arr[prov].name + ", " + arr_dis[dist].name + ", " + arr_ward[ward].name
  );
}

function load_data() {
  $.ajax({
    url: "http://localhost:3000/informations/showList",
    method: "POST",
    data: { action: "fetch" },
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      var html = "";
      $(".in4> ul").empty();
      if (data.data.length > 0) {
        for (var count = 0; count < data.data.length; count++) {
          html +=
            `
                      <li class="row mb-3 border-bot li_num_` +
            data.data[count].id +
            `" style="display: flex;">
                          <div class="col-9">
                              <div class="col-9">
                                  <div class="row">
                                      <div class="col-4">
                                          <p class="text-right text-secondary">Họ và tên</p>
                                      </div>
                                      <div class="col-8"> <span>
                                      ` +
            data.data[count].name +
            `
                                          </span> <span class="badge badge-success default_`+
                                          data.data[count].defau +
                                          `">Mặc
                                              định</span> </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-4">
                                          <p class="text-right text-secondary">Số điện thoại</p>
                                      </div>
                                      <div class="col-8">
                                          <p>
                                          ` +
            data.data[count].phone +
            `
                                          </p>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-4">
                                          <p class="text-right text-secondary">Địa chỉ</p>
                                      </div>
                                      <div class="col-8">
                                          <p>
                                          ` +
            data.data[count].full_addr +
            `
                                          </p>
                                          <p>
                                          ` +
            data.data[count].addr +
            `
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-3 ">
                              <div class="py-4"> <button type="button" class="btn btn-outline-secondary small-s ml-3 edit"                                     
                                      data-id="` +
            data.data[count].id +
            `">Sửa</button>
                                  <button type="button" class="btn btn-outline-secondary small-s float-right delete"
                                      data-id="` +
            data.data[count].id +
            `">Xóa</button>
                              </div> <button type="button" class="btn btn-outline-secondary small-s ml-2 styl`+
                              data.data[count].defau +
                              `"
                              data-id="` +
            data.data[count].id +
            `">Đặt làm mặc định</button>
                          </div>
                      </li>
                      
                    `;
        }
      }

      $(html).appendTo(".in4> ul");
    },
  });
}
$(document).ready(function () {
  load_data();
  $("#add_data").click(function () {
    $(".modal-title").html('Địa chỉ mới');
    $("#form-inf")[0].reset();

    $("#action").val("Add");

    $("#action_button").text("Add");

    $("#information").modal("show");
  });

  $("#form-inf").on("submit", function (event) {
    event.preventDefault();
    console.log($("#form-inf").serialize());
    if ($("#action").val() == "Add") {
      $.ajax({
        url: "http://localhost:3000/informations/add",
        method: "POST",
        data: $("#form-inf").serialize(),
        dataType: "JSON",
        beforeSend: function () {
          $("#action_button").attr("disabled", "disabled");
        },
        success: function (data) {
          $("#action_button").attr("disabled", false);

          $("#information").modal("hide");

          load_data();
        },
      });
    } else {
      $.ajax({
        url: "http://localhost:3000/informations/edit",
        method: "POST",
        data: $("#form-inf").serialize(),
        dataType: "JSON",
        beforeSend: function () {
          $("#action_button").attr("disabled", "disabled");
        },
        success: function () {
          $("#action_button").attr("disabled", false);

          $("#information").modal("hide");

          load_data();
        },
      });
    }
  });
  $(document).on("click", ".edit", function () {
    var id = $(this).data("id");
    $(".modal-title").html('Chỉnh sửa địa chỉ');
    $("#action").val("Edit");

    $("#action_button").text("Edit");

    $("#information").modal("show");

    $.ajax({
      url: "http://localhost:3000/informations/fetch1",
      method: "POST",
      data: { id: id, action: "fetch_single" },
      dataType: "JSON",
      success: function (data) {
        console.log(data.data);
        $("#name").val(data.data.name);
        $("#phone").val(data.data.phone);
        $("#exampleFormControlSelect1").val(data.data.prov);
        $("#exampleFormControlSelect1").change();
        $("#exampleFormControlSelect2").val(data.data.dist);
        $("#exampleFormControlSelect2").change();
        $("#exampleFormControlSelect3").val(data.data.ward);
        $("#exampleFormControlSelect3").change();
        $("#addr").val(data.data.addr);
        $("#full-addr").val(data.data.full_addr);
        $("#id").val(data.data.id);
        $("#default").val(data.data.defau);
      },
    });
  });
  $(document).on("click", ".delete", function () {
    var id = $(this).data("id");

    if (confirm("Are you sure you want to delete this data?")) {
      $.ajax({
        url: "http://localhost:3000/informations/delete",
        method: "POST",
        data: { id: id },
        dataType: "JSON",
        success: function (data) {
          load_data();
        },
      });
    }
  });
  $(document).on("click", ".styl0", function () {
    var id = $(this).data("id");

    if (confirm("Are you sure you want to set default?")) {
      $.ajax({
        url: "http://localhost:3000/informations/default",
        method: "POST",
        data: { id: id },
        dataType: "JSON",
        success: function (data) {
          load_data();
        },
      });
    }
  });
});
