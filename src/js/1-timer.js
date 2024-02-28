import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDateTime = document.querySelector("#datetime-picker");
const buttonTime = document.querySelector('button');
const remainingDay = document.querySelector('span[data-days]');
const remainingHours = document.querySelector('span[data-hours]');
const remainingMinutes = document.querySelector('span[data-minutes]');
const remainingSeconds = document.querySelector('span[data-seconds]');

buttonTime.dataset.start = 'start-btn';
buttonTime.disabled = true;

let userSelectedDate = "";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      userSelectedDate = selectedDates[0];
      buttonTime.disabled = false;
      buttonTime.style.backgroundColor = "#4E75FF";
      buttonTime.style.color = "#FFFFFF";
    }
    else {
      buttonTime.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
      })
    }
  }
}

flatpickr('#datetime-picker', options);

const timer = {
  start() {
    buttonTime.setAttribute("disabled", '');   
    buttonTime.style.backgroundColor = "#989898";
    buttonTime.style.color = "#fff";
    inputDateTime.disabled = true;
    const id = setInterval(() => {
      const currentDate = new Date();
      const difference = userSelectedDate.getTime() - currentDate.getTime();
      const remainingTime = convertMs(difference);
      remainingDay.textContent = remainingTime.days;
      remainingHours.textContent = remainingTime.hours;
      remainingMinutes.textContent = remainingTime.minutes;
      remainingSeconds.textContent = remainingTime.seconds;

      if (remainingTime === currentDate) {
        clearInterval(id);
      }
    }, 1000)
  }
}


function pad(value) {
  return String(value).padStart(2, "0");
}


function convertMs(ms) {
     // Number of milliseconds per unit of time
     const second = 1000;
     const minute = second * 60;
     const hour = minute * 60;
     const day = hour * 24;

     // Remaining days
     const days = Math.floor(ms / day);
     // Remaining hours
     const hours = pad(Math.floor((ms % day) / hour));
     // Remaining minutes
     const minutes = pad(Math.floor(((ms % day) % hour) / minute));
     // Remaining seconds
     const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

     return { days, hours, minutes, seconds };
};
    

buttonTime.addEventListener('click', timer.start);

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


 