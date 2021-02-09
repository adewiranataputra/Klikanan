import Vue from "vue"
import moment from "./moment-locale.js";

Vue.filter("moment", function(value, format = "DD MMMM YYYY") {
    moment.locale("en");
    return moment(value, "YYYY/MM/DD").format(format);
});

Vue.filter("slash", function(str) {
    var x = str.split("/");
    return x[x.length - 1];
});

Vue.filter("currency", function(str) {
    str += "";
    var x = str.split(".");
    var x1 = x[0];
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "." + "$2");
    }
    return x1;
});