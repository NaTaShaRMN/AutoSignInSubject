// Coded by Duc Lv
$registrationAvailable = "True".toLowerCase();
if (typeof App !== 'undefined') App.blockUI = function(n) {};
CheckConflict = function () {
  var i = $("input[data-crdid]")
    , r = $("td[data-crdid-registered]")
    , t = [];
  r.each(function () {
    t.push($(this).attr("data-crdid-registered"))
  });
  i.each(function () {
    if ($.inArray($(this).attr("data-crdid"), t) > -1) {
      var n = $(this).parent().parent();
      n.find("td.over").is(".over") ? n.attr("title", "Môn học đã đủ số lượng sinh viên đăng ký! và Môn học đã đăng ký lớp môn học khác!") : (n.addClass("conflict"),
        n.attr("title", "Môn học đã đăng ký lớp môn học khác!"))
    }
  });
  var u = $(".time-table-1")
    , f = $(".time-table-2")
    , n = [];
  f.each(function () {
    n.push($(this).attr("data-time-table-2"))
  });
  u.each(function () {
    var t = $(this).parent().parent()
      , i = $(this).attr("data-time-table-1");
    $.inArray(i, n) > -1 ? (t.find("td.over").is(".over") ? t.attr("title", "Môn học đã đủ số lượng sinh viên đăng ký! và Môn học bị trùng lịch học!") : (t.addClass("conflict"),
      t.attr("title", "Môn học bị trùng lịch học!"))) : $.each(n, function (n, r) {
        var u = i.split(":")
          , f = r.split(":");
        u[0] == f[0] && (parseInt(u[1]) >= parseInt(f[1]) && parseInt(u[1]) <= parseInt(f[2]) || parseInt(u[2]) >= parseInt(f[1]) && parseInt(u[2]) <= parseInt(f[2]) || parseInt(u[1]) <= parseInt(f[1]) && parseInt(u[2]) >= parseInt(f[2]) || parseInt(u[1]) >= parseInt(f[1]) && parseInt(u[2]) <= parseInt(f[2])) && (t.find("td.over").is(".over") ? t.attr("title", "Môn học đã đủ số lượng sinh viên đăng ký! và Môn học bị trùng lịch học!") : (t.addClass("conflict"),
          t.attr("title", "Môn học bị trùng lịch học!")))
      })
  })
}
ajaxRequest = function(n, t, i, r, u, f, e) {
  $.ajax({
    type: n,
    cache: !1,
    async: e,
    url: t,
    dataType: i,
    success: function(n) {
      r != null && r(n);
    },
    error: function(n) {
      u != null && u(n);
    },
    complete: function(n) {
      f != null && f(n);
    }
  });
};
CheckPrerequisite = function(n) {
  var r = new Date().getTime(),
    i = "",
    t = "/kiem-tra-tien-quyet/" + n + "/" + $registrationMode;
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      async: !1,
      url: t,
      dataType: "json",
      success: function(n) {
        i = n.message;
      },
      complete: function() {
        var n = new Date().getTime(),
          i = n - r;
      }
    }),
    i
  );
};
Pending = function(n) {
  var r = new Date().getTime(),
    i = "",
    t = "/chon-mon-hoc/" + n + "/" + $registrationMode + "/" + $dsdkMod;
  return (
    $.ajax({
      type: "POST",
      cache: !1,
      async: !1,
      url: t,
      dataType: "json",
      success: function(n) {
        i = n.message;
      },
      complete: function() {
        var n = new Date().getTime(),
          i = n - r;
      }
    }),
    i
  );
};
successCallback1 = function(n) {
  $("#divDSDK table tbody").html(n);
  var list = document.querySelectorAll(".order");
  for (var i = 0; i < list.length; i++) {
    list[i].after(list[i].getAttribute("data-rowindex"));
  }
};
function kq(n) {
  $("#resultAuto").html(JSON.stringify(n));
  DSDK($(".sel-dsdk-mod").select2("val"));
}
function fastDK() {
  var subarr = $("#subject")
    .val()
    .split("\n");
  for (var i = 0; i < subarr.length; i++) {
    if (subarr[i]) Pending(subarr[i]);
  }
  RegisteredSubject();
  ajaxRequest(
    "POST",
    "/xac-nhan-dang-ky/" + $registrationMode,
    "json",
    kq,
    null,
    null,
    !0
  );
};
var autoInterval = 0;
function autoDK() {
  if(autoInterval) {
    clearInterval(autoInterval);
    autoInterval=0;
    $("#autoDK").attr("class","btn btn-success");
    $("#autoDK").html("Auto");
  } else {
    var timeAuto = $("#timeAuto").val()*1000;
    autoInterval = setInterval(fastDK, timeAuto<1000?1000:timeAuto);
    $("#autoDK").attr("class","btn btn-danger");
    $("#autoDK").html("Stop");
  }
}
if (typeof DSDK !== 'undefined') DSDK($(".sel-dsdk-mod").select2("val"));
if ($(".confirm-registration").length === 0) {
  $(".col-md-offset-0").append(
    '<button style="margin-bottom:5px" class="btn btn-success confirm-registration"><i class="icon-save"></i> Ghi nhận</button>'
  );
}
$("#main-nav").append(
  '<div class="box bordered-box green-border box-header green-background" style=" margin-top: 10px; margin-left: 10px; margin-bottom: 0px; margin-right: 10px; color: #fff;font-weight: bold;display: block; height: 100%; text-align:center;"> Tool tự động đăng ký môn học VNU 2019 ^-^<br/>LƯU Ý: Mã số của môn học nằm ngay trong ô tick chọn môn học (ko phải tên lớp môn học như version cũ)</div><div style="padding-left: 10px; padding-right: 10px;"> <textarea placeholder="Nhập các mã số của môn học vào đây, mỗi môn một dòng!\nSau đó bấm Đăng ký nhanh và chờ ghi nhận thành công! Good Luck :D" style="padding-bottom: 2px; margin: 10px 0px; width: 100%; height: 100%; resize: both;" id="subject" rows="4" ></textarea> <div style="margin-bottom: 10px;"> <label for="timeAuto">Lặp lại sau</label>&nbsp; <input type="number" id="timeAuto" name="timeAuto" min="1" step="1" value="3" style="border-color: initial; max-width: 80px; text-align: center;"/>&nbsp;<span>giây</span> </div><button style="margin-bottom:5px" class="btn btn-success" onclick="fastDK()"> <i class="icon-save"></i> Đăng Ký Nhanh</button >&nbsp;&nbsp;<button id="autoDK" style="margin-bottom:5px" class="btn btn-success" onclick="autoDK()">Auto</button> <label>Kết quả:</label>&nbsp;<p id="resultAuto" style="color:green;font-weight:bold;word-wrap: break-word;"></p></div><div style="padding-left: 10px;padding-right: 10px;color: grey;"> * Nút Đăng Ký Nhanh đã bao gồm chức năng tự động chọn các môn và bấm nút Ghi Nhận.<br/>* Nút Auto dùng để tự động đăng ký liên tục sau mỗi x giây, dùng cho việc trao đổi môn, canh môn liên tục.<br/>* Chỉ trong thời hạn đăng ký mới ghi nhận các môn được. Một số trường hợp gần đến giờ mở đăng ký thì server đã mở đăng ký trước nên có thể đăng ký được (cứ thử đi, biết đâu bất ngờ :V)</div>'
);
