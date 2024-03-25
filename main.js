var processes = [{
    id: 1,
    burst_time: 80,
    arrival_time: 0,
    priority: 1
},
{
    id: 2,
    burst_time: 60,
    arrival_time: 20,
    priority: 2
},
{
    id: 3,
    burst_time: 65,
    arrival_time: 40,
    priority: 3
},
{
    id: 4,
    burst_time: 120,
    arrival_time: 60,
    priority: 4
},
{
    id: 5,
    burst_time: 30,
    arrival_time: 80,
    priority: 5
},
{
    id: 6,
    burst_time: 90,
    arrival_time: 90,
    priority: 6
},
{
    id: 7,
    burst_time: 25,
    arrival_time: 120,
    priority: 7
},
{
    id: 8,
    burst_time: 40,
    arrival_time: 240,
    priority: 8
},
{
    id: 9,
    burst_time: 90,
    arrival_time: 260,
    priority: 9
},
{
    id: 10,
    burst_time: 75,
    arrival_time: 380,
    priority: 10
}
];
let headers = ['Process Id', 'Burst Time', 'Arrival Time', 'Priority'];
function createTable() {
    let table = $("#table");
    let head = "";
    for (h in headers) {
        head += "<th>" + headers[h] + "</th>";
    }
    table.append(`<thead><tr>${head}</tr></thead>`);

    data = "";
    for (p in processes) {
        let row = "";
        for (obj in processes[p]) {
            row += "<td>" + processes[p][obj] + "</td>";
        }
        data += "<tr>" + row + "</tr>";
    }
    table.append(`<tbody>${data}</tbody>`);
}
function displayTable() {
    $("#table").empty();
    createTable();
}   

function openAddModal(){
    document.getElementById("addform").style.display = "block";
    $('#modal_process_id').val(processes.length + 1);
    $('#modal_burst_time').val(Math.floor(Math.random() * 100));
    $('#modal_arrival_time').val(Math.floor(Math.random() * 100));
    $('#modal_priority').val(Math.floor(Math.random() * 100));
}

function closeForm() {
    document.getElementById("addform").style.display = "none";
}

function addProcess() {
    // let table = document.getElementById('table');

    if ($("#modal_burst_time").val() < 1) {
        $("#error_bt").removeAttr("hidden");
    } else {
        $("#error_bt").attr("hidden", true);
    }
    if ($("#modal_arrival_time").val() < 0) {
        $("#error_at").removeAttr("hidden");
    } else {
        $("#error_at").attr("hidden", true);
    }
    if ($("#modal_priority").val() < 0) {
        $("#error_pt").removeAttr("hidden");
    } else {
        $("#error_pt").attr("hidden", true);
    }
    if ($("#modal_burst_time").val() > 0 && $("#modal_arrival_time").val() >= 0 && $("#modal_priority").val() >= 0) {
        let input_burst = Number($('#modal_burst_time').val());
        let input_arrival = Math.max($('#modal_arrival_time').val(), 0);
        let input_priority = Math.max($('#modal_priority').val(), 0);

        obj = {
            id: processes.length + 1,
            burst_time: Number(input_burst),
            arrival_time: Number(input_arrival),
            priority: Number(input_priority)
        };

        processes.push(obj);
        displayTable();
        // $("#modal_add").modal("toggle");
    }
}
