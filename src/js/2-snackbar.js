import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const btnNotification = form.lastElementChild;
const inputNumber = form.firstElementChild;

inputNumber.classList.add("input-number");
btnNotification.classList.add("notification");


form.addEventListener("submit", makePromise);


function makePromise(event) {
    event.preventDefault();
    
    let delay = event.target.delay.value;

    const radioFulfilled = event.target.state.value;

    new Promise((res, rej) => {
        setTimeout(() => {
            if (radioFulfilled === "fulfilled") {
                res(iziToast.show({
                    title: 'Ok',
                    position: 'topRight',
                    message: `✅ Fulfilled promise in ${delay} ms`,
                    backgroundColor: '#59A10D',
                    titleColor: '#FFFFFF'
                }))
            } else {
                rej(
                    iziToast.show({
                        title: 'Error',
                        position: 'topRight',
                        message: `❌ Rejected promise in ${delay} ms`,
                        backgroundColor: '#EF4040',
                        titleColor: '#FFFFFF',
                    }))
            }
        }, delay);
        form.reset();
    }).then(_ => console.log(`✅ Fulfilled promise in ${delay} ms`)).catch(_ => console.log(`❌ Rejected promise in ${delay} ms`));
    
}


