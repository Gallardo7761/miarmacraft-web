"use strict";

const errorsDiv = document.getElementById("errors");

export function errorsDivYaContieneError(error) {
    for(let child of errorsDiv.children) {
        if(child.textContent.includes(error)) {
            return true;
        }
    }
    return false;
}