"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

function errorFunction() {
  alert("couldn't get your position,\n Please check your navigaror");
}

function position(pos) {
  const { latitude } = pos.coords;
  const { longitude } = pos.coords;
  const map = L.map("map").setView([latitude, longitude], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position, errorFunction);
}
