"use strict";

export function parseDate(date) {
    let trozos = date.split("-");
    return `${trozos[2]}/${trozos[1]}/${trozos[0]}`;
}

export function toSQLDate(date) {
    date = new Date(date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};