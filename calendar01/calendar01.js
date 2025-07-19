// deno-lint-ignore-file prefer-const

let today = new Date();
let calendar = document.querySelector(".Calendar");
// Calendar Logic
function make_calendar(current_month) {
  let unorderlist = calendar.appendChild(document.createElement("ul"));
  unorderlist.setAttribute("id", "calendarDates");
  let first_month_date = new Date(today.getFullYear(), current_month, 1);
  let first_month_day = first_month_date.getDay();
  let previous_month_lastdate = new Date(today.getFullYear(), current_month, 0);
  let prev_mon_lsdate = previous_month_lastdate.getDate();
  let lsdate_diff = prev_mon_lsdate - (first_month_day - 1);
  let curr_mon_lsdate = new Date(today.getFullYear(), current_month + 1, 0);
  const month_label = document.querySelector(".CalendarMonth");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jan",
    "Jul",
    "Aus",
    "Sep",
    "Oct",
    "Nev",
    "Dec",
  ];

  month_label.textContent = months[current_month];
  // Previous month dates
  for (let i = lsdate_diff; i <= prev_mon_lsdate; i++) {
    let id = document.createElement("li");
    id.textContent = i;
    id.setAttribute("class", "notInMonth");
    unorderlist.appendChild(id);
  }

  // current month dates
  for (let i = 1; i <= curr_mon_lsdate.getDate(); i++) {
    let id = document.createElement("li");
    id.textContent = i;
    unorderlist.appendChild(id);
    if (i == today.getDate() && current_month == today.getMonth()) {
      id.setAttribute("id", "today");
    }
  }

  // next month dates
  for (let i = 1; i <= 6 - curr_mon_lsdate.getDay(); i++) {
    let id = document.createElement("li");
    id.textContent = i;
    id.setAttribute("class", "notInMonth");
    unorderlist.appendChild(id);
  }
}

function remove_calendar() {
  calendar.removeChild(calendar.lastChild);
}

var month_id = today.getMonth();
let month_up = document.querySelector(".month_up");
let month_down = document.querySelector(".month_down");

make_calendar(today.getMonth());
month_up.onclick = () => {
  remove_calendar();
  month_id = (month_id + 1) % 12;
  make_calendar(month_id);
};
month_down.onclick = () => {
  remove_calendar();
  month_id = (month_id + 11) % 12;
  make_calendar(month_id);
};
