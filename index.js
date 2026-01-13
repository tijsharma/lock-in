let intervalId;

const onLoad = () => {
  renderWatch();
};

window.onload = onLoad;

const displayDivStartStopwatch = () => {
  document.getElementById("divStartStopwatch").style.display = "none";
  document.getElementById("divRunningStopwatch").style.display = "flex";
};

const startStopwatch = () => {
  displayDivStartStopwatch();
  const running_total_milliseconds =
    localStorage.getItem("running_total_milliseconds") || 0;
  localStorage.setItem(
    "reference_start_time",
    Date.now() - running_total_milliseconds
  ); // push back reference start time by current running total
  intervalId = setInterval(updateWatch, 100);
};

document.getElementById("btnStart").addEventListener("click", startStopwatch);

const displayDivRunningStopwatch = () => {
  document.getElementById("divStartStopwatch").style.display = "flex";
  document.getElementById("divRunningStopwatch").style.display = "None";
};

const pauseStopwatch = () => {
  displayDivRunningStopwatch();
  clearInterval(intervalId);
};

document.getElementById("btnPause").addEventListener("click", pauseStopwatch);

const reset = () => {
  if (window.confirm("Are you sure you want to reset your clock?")) {
    pauseStopwatch();
    localStorage.clear();
    renderWatch();
  }
};

document.getElementById("btnReset").addEventListener("click", reset);

const updateWatch = () => {
  const elapsed = Date.now() - localStorage.getItem("reference_start_time");
  localStorage.setItem("running_total_milliseconds", elapsed);
  renderWatch(elapsed);
};

const renderWatch = (elapsed) => {
  if (elapsed === undefined) {
    elapsed = localStorage.getItem("running_total_milliseconds");
  }

  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = String(Math.floor((elapsed / 1000 / 60) % 60)).padStart(
    2,
    "0"
  );
  const hours = String(Math.floor(elapsed / 1000 / 60 / 60)).padStart(2, "0");

  document.getElementById(
    "stopwatch"
  ).textContent = `${hours}:${minutes}:${String(seconds).padStart(2, "0")}`;
};
