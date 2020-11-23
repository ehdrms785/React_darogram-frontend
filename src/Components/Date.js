import React from "react";

export default ({ date }) => {
  // now date
  var nDate = Date.now();
  // console.log("date : " + date);

  var d = date.split(/[- T : .]/);
  //before date
  var bd = new Date(Date.UTC(d[0], d[1] - 1, d[2], d[3], d[4], d[5]));

  var diff_time = (nDate - bd.getTime()) / 1000;
  //   var diff_time = (bd.getTime() - pd.getTime()) / 1000;
  let unitList = ["초", "분", "시간", "일", "년"];
  let time = 0;
  let unit = "";
  if (diff_time < 60) {
    time = diff_time;
    unit = unitList[0];
  } else if (diff_time < 3600) {
    time = diff_time / 60;
    unit = unitList[1];
  } else if (diff_time < 86400) {
    time = diff_time / 3600;
    unit = unitList[2];
  } else if (diff_time < 2592000) {
    time = diff_time / 86400;
    unit = unitList[3];
  } else {
    time = diff_time / 2592000;
    unit = unitList[4];
  }
  time = Math.round(time, 0);
  return (
    <div>
      <div>
        <time dateTime={date}>{`${time}${unit}전`}</time>
      </div>
    </div>
  );
};
