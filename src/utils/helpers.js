import { format } from 'date-fns';

export function fillArray(from, to, step = 1) {
  const arr = [];
  for (let i = from; i <= to; i += step) {
    arr.push(i);
  }
  return arr;
}

export function getUniqueId() {
  return new Date().getTime() + String(Math.random());
}

export function formatNumberToAmount(amount, currency = 'USD') {
  const formatter = new window.Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
  return formatter.format(amount);
}

export const formatDateToFullStr = (date) => format(new Date(date), 'h:mm aa, dd.MM.yyyy');

export function getArrayWithSubArrays(arr, elemsInSubArray) {
  const newArr = [];
  for (let i = 0; i < arr.length; i += elemsInSubArray) {
    newArr.push(arr.slice(i, i + elemsInSubArray));
  }
  return newArr;
}

export const getRating = (rating) => Math.round(rating / 100);
export const getVehicleFullName = (vehicle) => {
  const {
    typeName, model, year, make,
  } = vehicle;
  return `${typeName} ${make} ${model} ${year}`;
};

export const carTypes = [
  { carType: 'Sedan', img: 'sedan.svg', value: 'SDN' },
  { carType: 'Suv', img: 'suv.svg', value: 'SUV' },
  { carType: 'Charter VAN', img: 'charter-one.svg', value: 'CVAN' },
  { carType: 'Charter bus', img: 'charter-bus.svg', value: 'CBUS' },
  { carType: 'Limo sedan', img: 'limo-sedan.svg', value: 'LSDN' },
  { carType: 'Limo SUV', img: 'limo-suv.svg', value: 'LSUV' },
  { carType: 'Limo VAN', img: 'limo-van.svg', value: 'LVAN' },
  { carType: 'Limo bus', img: 'limo-bus.svg', value: 'LBUS' },
];
