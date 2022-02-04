var measureTimeFromClickStartToEnd;

function startClickMeasurement() {
    start_time = new Date();
}
function endClickMeasurement() {
    var now = new Date();
    return now-start_time
}