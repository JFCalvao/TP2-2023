const flameCastle = document.querySelector("#flameCastle");
const waterCastle = document.querySelector("#waterCastle");
const fourElementsCastle = document.querySelector("#fourElementsCastle");
const rockCastle = document.querySelector("#rockCastle");
const airCastle = document.querySelector("#airCastle");

flameCastle.addEventListener("click", () => {
    window.location = "firePhase.html";
});

waterCastle.addEventListener("click", () => {
    window.location = "waterPhase.html";
});

fourElementsCastle.addEventListener("click", () => {
    // window.location = "#";
});

rockCastle.addEventListener("click", () => {
    window.location = "rockPhase.html";
});

airCastle.addEventListener("click", () => {
    window.location = "airPhase.html";
});
