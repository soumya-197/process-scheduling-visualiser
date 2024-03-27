var avgWaitingTimeFCFS = 0,
    avgTurnaroundTimeFCFS = 0,
    avgResponseTimeFCFS = 0;
var ganttFCFS = [];
var completionTimeFCFS = 0;
let bestAlgo = [];

function init() {
    // avgWaitingTimeRoundRobin = 0;
    // avgWaitingTimePriorityPre = 0;
    // avgWaitingTimePriorityNonPre = 0;
    // avgWaitingTimeSJFPre = 0;
    // avgWaitingTimeSJFNonPre = 0;
    avgWaitingTimeFCFS = 0;

    // avgTurnaroundTimeRoundRobin = 0;
    // avgTurnaroundTimePriorityPre = 0;
    // avgTurnaroundTimePriorityNonPre = 0;
    // avgTurnaroundTimeSJFPre = 0;
    // avgTurnaroundTimeSJFNonPre = 0;
    avgTurnaroundTimeFCFS = 0;

    // avgResponseTimeRoundRobin = 0;
    // avgResponseTimePriorityPre = 0;
    // avgResponseTimePriorityNonPre = 0;
    // avgResponseTimeSJFPre = 0;
    // avgResponseTimeSJFNonPre = 0;
    avgResponseTimeFCFS = 0;

    ganttFCFS = [];
    // ganttSJFNonPre = [];
    // ganttSJFPre = [];
    // ganttPriorityNonPre = [];
    // ganttPriorityPre = [];
    // ganttRoundRobin = [];
    bestAlgo = [];

    completionTimeFCFS = 0;
    // completionTimeSJF = 0;
    // completionTimeSJFPre = 0;
    // completionTimePriority = 0;
    // completionTimePriorityPre = 0;
    // completionTimeRoundRobin = 0;

    $("#gantt_FCFS").empty();
    // $("#gantt_SJFNonPre").empty();
    // $("#gantt_SJFPre").empty();
    // $("#gantt_PriorityNonPre").empty();
    // $("#gantt_PriorityPre").empty();
    // $("#gantt_RoundRobin").empty();

    $("#final_result").empty();
}

function displayGanttChart() {
    for (i in ganttFCFS) {
        let diff = ganttFCFS[i].endTime - ganttFCFS[i].startTime + 80;
        if (ganttFCFS[i].processId != null)
            $("#gantt_FCFS").append(`<div class="gantt-box" style="width: ${diff}px"><span class="gantt-box-left">${ganttFCFS[i].startTime}</span>P${ganttFCFS[i].processId}<span class="gantt-box-right">${ganttFCFS[i].endTime}<span></div>`);
        else
            $("#gantt_FCFS").append(`<div class="gantt-box" style="background-color: #58D68D; width: ${diff}px"><span class="gantt-box-left">${ganttFCFS[i].startTime}</span><span class="gantt-box-right">${ganttFCFS[i].endTime}<span></div>`);
    }
    // for (i in ganttSJFNonPre) {
    //     let diff = ganttSJFNonPre[i].endTime - ganttSJFNonPre[i].startTime + 80;
    //     if (ganttSJFNonPre[i].processId != null)
    //         $("#gantt_SJFNonPre").append(`<div class="gantt-box" style="width:${diff}px"><span class="gantt-box-left">${ganttSJFNonPre[i].startTime}</span>P${ganttSJFNonPre[i].processId}<span class="gantt-box-right">${ganttSJFNonPre[i].endTime}<span></div>`);
    //     else
    //         $("#gantt_SJFNonPre").append(`<div class="gantt-box" style="background-color: #58D68D; width: ${diff}px"><span class="gantt-box-left">${ganttSJFNonPre[i].startTime}</span><span class="gantt-box-right">${ganttSJFNonPre[i].endTime}<span></div>`);
    // }
    // for (i in ganttSJFPre) {
    //     let diff = ganttSJFPre[i].endTime - ganttSJFPre[i].startTime + 80;
    //     if (ganttSJFPre[i].processId != null)
    //         $("#gantt_SJFPre").append(`<div class="gantt-box" style="width:${diff}px"><span class="gantt-box-left">${ganttSJFPre[i].startTime}</span>P${ganttSJFPre[i].processId}<span class="gantt-box-right">${ganttSJFPre[i].endTime}<span></div>`);
    //     else
    //         $("#gantt_SJFPre").append(`<div class="gantt-box" style="background-color: #58D68D; width: ${diff}px"><span class="gantt-box-left">${ganttSJFPre[i].startTime}</span><span class="gantt-box-right">${ganttSJFPre[i].endTime}<span></div>`);
    // }
    // for (i in ganttLJFNonPre) {
    //     let diff = ganttLJFNonPre[i].endTime - ganttLJFNonPre[i].startTime + 80;
    //     if (ganttLJFNonPre[i].processId != null)
    //         $("#gantt_LJFNonPre").append(`<div class="gantt-box" style="width:${diff}px"><span class="gantt-box-left">${ganttLJFNonPre[i].startTime}</span>P${ganttLJFNonPre[i].processId}<span class="gantt-box-right">${ganttLJFNonPre[i].endTime}<span></div>`);
    //     else
    //         $("#gantt_LJFNonPre").append(`<div class="gantt-box" style="background-color: #58D68D; width: ${diff}px"><span class="gantt-box-left">${ganttLJFNonPre[i].startTime}</span><span class="gantt-box-right">${ganttLJFNonPre[i].endTime}<span></div>`);
    // }
    // for (i in ganttLJFPre) {
    //     let diff = ganttLJFPre[i].endTime - ganttLJFPre[i].startTime + 80;
    //     if (ganttLJFPre[i].processId != null)
    //         $("#gantt_LJFPre").append(`<div class="gantt-box" style="width:${diff}px"><span class="gantt-box-left">${ganttLJFPre[i].startTime}</span>P${ganttLJFPre[i].processId}<span class="gantt-box-right">${ganttLJFPre[i].endTime}<span></div>`);
    //     else
    //         $("#gantt_LJFPre").append(`<div class="gantt-box" style="background-color: #58D68D; width: ${diff}px"><span class="gantt-box-left">${ganttLJFPre[i].startTime}</span><span class="gantt-box-right">${ganttLJFPre[i].endTime}<span></div>`);
    // }
    // for (i in ganttPriorityNonPre) {
    //     let diff = ganttPriorityNonPre[i].endTime - ganttPriorityNonPre[i].startTime + 80;
    //     if (ganttPriorityNonPre[i].processId != null)
    //         $("#gantt_PriorityNonPre").append(`<div class="gantt-box" style="width:${diff}px"><span class="gantt-box-left">${ganttPriorityNonPre[i].startTime}</span>P${ganttPriorityNonPre[i].processId}<span class="gantt-box-right">${ganttPriorityNonPre[i].endTime}<span></div>`);
    //     else
    //         $("#gantt_PriorityNonPre").append(`<div class="gantt-box" style="background-color: #58D68D; width: ${diff}px"><span class="gantt-box-left">${ganttPriorityNonPre[i].startTime}</span><span class="gantt-box-right">${ganttPriorityNonPre[i].endTime}<span></div>`);
    // }
    // for (i in ganttPriorityPre) {
    //     let diff = ganttPriorityPre[i].endTime - ganttPriorityPre[i].startTime + 80;
    //     if (ganttPriorityPre[i].processId != null)
    //         $("#gantt_PriorityPre").append(`<div class="gantt-box" style="width:${diff}px"><span class="gantt-box-left">${ganttPriorityPre[i].startTime}</span>P${ganttPriorityPre[i].processId}<span class="gantt-box-right">${ganttPriorityPre[i].endTime}<span></div>`);
    //     else
    //         $("#gantt_PriorityPre").append(`<div class="gantt-box" style="background-color: #58D68D; width: ${diff}px"><span class="gantt-box-left">${ganttPriorityPre[i].startTime}</span><span class="gantt-box-right">${ganttPriorityPre[i].endTime}<span></div>`);
    // }
    // for (i in ganttRoundRobin) {
    //     let diff = ganttRoundRobin[i].endTime - ganttRoundRobin[i].startTime + 80;
    //     if (ganttRoundRobin[i].processId != null)
    //         $("#gantt_RoundRobin").append(`<div class="gantt-box" style="width:${diff}px"><span class="gantt-box-left">${ganttRoundRobin[i].startTime}</span>P${ganttRoundRobin[i].processId}<span class="gantt-box-right">${ganttRoundRobin[i].endTime}<span></div>`);
    //     else
    //         $("#gantt_RoundRobin").append(`<div class="gantt-box" style="background-color: #58D68D; width: ${diff}px"><span class="gantt-box-left">${ganttRoundRobin[i].startTime}</span><span class="gantt-box-right">${ganttRoundRobin[i].endTime}<span></div>`);
    // }
    // for (i in ganttProposed) {
    //     let diff = ganttProposed[i].endTime - ganttProposed[i].startTime + 80;
    //     if (ganttProposed[i].processId != null)
    //         $("#gantt_Proposed").append(`<div class="gantt-box" style="width:${diff}px"><span class="gantt-box-left">${ganttProposed[i].startTime.toFixed(1)}</span>P${ganttProposed[i].processId}<span class="gantt-box-right">${ganttProposed[i].endTime.toFixed(1)}<span></div>`);
    // }
}

function createResultTable() {
    let resultHeaders = ['Scheduling Algorithm', 'Average Turnaround Time', 'Average Waiting Time'];
    let results = [{
            name: "FCFS",
            avgTA: avgTurnaroundTimeFCFS.toFixed(2),
            avgWT: avgWaitingTimeFCFS.toFixed(2)
        },
        // {
        //     name: "SJF",
        //     avgTA: avgTurnaroundTimeSJFNonPre.toFixed(2),
        //     avgWT: avgWaitingTimeSJFNonPre.toFixed(2)
        // },
        // {
        //     name: "SJF(Preemptive)",
        //     avgTA: avgTurnaroundTimeSJFPre.toFixed(2),
        //     avgWT: avgWaitingTimeSJFPre.toFixed(2)
        // },
        // {
        //     name: "Priority",
        //     avgTA: avgTurnaroundTimePriorityNonPre.toFixed(2),
        //     avgWT: avgWaitingTimePriorityNonPre.toFixed(2)
        // },
        // {
        //     name: "Priority(Preemptive)",
        //     avgTA: avgTurnaroundTimePriorityPre.toFixed(2),
        //     avgWT: avgWaitingTimePriorityPre.toFixed(2)
        // },
        // {
        //     name: "RoundRobin",
        //     avgTA: avgTurnaroundTimeRoundRobin.toFixed(2),
        //     avgWT: avgWaitingTimeRoundRobin.toFixed(2)
        // },
    ];
    header = "";
    for (head in resultHeaders) {
        header += "<th>" + resultHeaders[head] + "</th>";
    }
    $("#result_table").append(`<thead><tr>${header}</tr></thead>`)
    data = "";
    for (r in results) {
        let row = "";
        for (obj in results[r]) {
            row += "<td>" + results[r][obj] + "</td>";
        }
        data += "<tr>" + row + "</tr>";
    }
    $("#result_table").append(`<tbody>${data}</tbody>`);
}


function displayResultTable() {
    $("#result_table").empty();
    createResultTable();
}

function calculateRank(a, b) {
    let duplicate = [];
    let rank = [];
    currentRank = 0;
    for (i in a) {
        duplicate[i] = a[i];
    }
    if (b === 1) {
        duplicate.sort((a, b) => {
            return a - b;
        });
    } else {
        duplicate.sort((a, b) => {
            return b - a;
        });
    }
    let set = new Set(duplicate);
    set.forEach((values) => {
        currentRank++;
        for (i in a) {
            if (a[i] === values) {
                rank[i] = currentRank;
            }
        }
    });

    return rank;
}

var readyQueue = [];

function readyQueueInit() {
    for (i = 0; i < processes.length; i++) {
        let copiedProcess = Object.assign({}, processes[i]);
        readyQueue[i] = copiedProcess;
    }
}

async function FCFS(flag) {
    readyQueueInit();
    let p, min;
    let turnAroundFCFS = [];
    let waitingFCFS = [];
    let processQueue = [];
    let time = 0;
    if (flag) {
        $("#wq").attr("hidden", true)
        $("#vis").removeAttr("hidden");
        $('html, body').animate({
            scrollTop: $("#vis").offset().top
        }, 0);
    }
    outer: while (readyQueue.length != 0) {
        for (let process in readyQueue) {
            if (readyQueue[process].arrival_time <= time) {
                processQueue.push(readyQueue[process]);
            }
        }
        if (processQueue.length === 0) {
            if (ganttFCFS.length > 0 && ganttFCFS[ganttFCFS.length - 1].processId != null) {
                ganttFCFS[ganttFCFS.length - 1].endTime = time;
                ganttFCFS.push({
                    processId: null,
                    startTime: time,
                    endTime: time + 1
                });
            } else if (ganttFCFS.length == 0) {
                ganttFCFS.push({
                    processId: null,
                    startTime: time,
                    endTime: time + 1
                });
            }
            time++;
            continue outer;
        }
        let vis_block = "";
        min = Number.MAX_VALUE;
        for (let process in processQueue) {
            vis_block += `<span class='fitem'>P${processQueue[process].id}</span>`
            if (processQueue[process].arrival_time < min) {
                min = processQueue[process];
                p = process;
            }
        }
        if (flag) {
            $("#vis_name").empty().append("FCFS")
            $("#vis_rq").empty().html(vis_block)
            $("#vis_cpu").empty().html(`<span class='fitem'>P${processQueue[p].id}</span>`)
            $("#vis_time").empty().append(time)
            $(".btn").attr("disabled", true)
            await new Promise(r => setTimeout(r, 2000));
            if (stop_flag)
                break outer;
        }
        prev_time = time;
        time += processQueue[p].burst_time;
        turnAroundFCFS[processQueue[p].id] = time - processQueue[p].arrival_time;
        waitingFCFS[processQueue[p].id] = turnAroundFCFS[processQueue[p].id] - processQueue[p].burst_time;

        for (let pro in readyQueue) {
            if (readyQueue[pro].id === processQueue[p].id)
                readyQueue.splice(pro, 1);
        }

        if (ganttFCFS.length > 0) {
            ganttFCFS[ganttFCFS.length - 1].endTime = prev_time;
        }
        ganttFCFS.push({
            processId: processQueue[p].id,
            startTime: prev_time,
            endTime: time
        });
        processQueue.splice(0, processQueue.length);

    }
    $(".btn").removeAttr("disabled")
    stop_flag = false;
    completionTimeFCFS = time;
    avgTurnaroundTimeFCFS = calculateAvgTime(turnAroundFCFS);
    avgWaitingTimeFCFS = calculateAvgTime(waitingFCFS);
    avgResponseTimeFCFS = avgWaitingTimeFCFS;
}

function calculateAvgTime(waitingTime) {
    let avg = 0;
    for (i = 1; i < waitingTime.length; i++) {
        avg += waitingTime[i];
    }
    return avg / (waitingTime.length - 1);
}

function findBest(checked) {
    //calculate max CPU utilization
    //calculate min wt
    // calculate min tat
    // calculate max through put
    // cs is context switching
    // let algorithms = ["FCFS", "SJF", "SJF(Preemptive)", "LJF", "LJF(Preemptive)", "Priority", "Priority(Preemptive)", "Round Robin", "Proposed Algorithm"];
    let algorithms=["FCFS"];
    // let wt = [avgWaitingTimeFCFS, avgWaitingTimeSJFNonPre, avgWaitingTimeSJFPre, avgWaitingTimeLJFNonPre, avgWaitingTimeLJFPre, avgWaitingTimePriorityNonPre, avgWaitingTimePriorityPre, avgWaitingTimeRoundRobin, avgWaitingTimeNew];
    let wt = [avgWaitingTimeFCFS];
    let tat = [avgTurnaroundTimeFCFS];
    // let tat = [avgTurnaroundTimeFCFS, avgTurnaroundTimeSJFNonPre, avgTurnaroundTimeSJFPre, avgTurnaroundTimeLJFNonPre, avgTurnaroundTimeLJFPre, avgTurnaroundTimePriorityNonPre, avgTurnaroundTimePriorityPre, avgTurnaroundTimeRoundRobin, avgTurnAroundTimeNew];
    let rt = [avgResponseTimeFCFS];
    // let rt = [avgResponseTimeFCFS, avgResponseTimeSJFNonPre, avgResponseTimeSJFPre, avgResponseTimeLJFNonPre, avgResponseTimeLJFPre, avgResponseTimePriorityNonPre, avgResponseTimePriorityPre, avgResponseTimeRoundRobin, avgResponseTimeNew];
    let ct = [completionTimeFCFS];
    // let ct = [completionTimeFCFS, completionTimeSJF, completionTimeSJFPre, completionTimeLJF, completionTimeLJFPre, completionTimePriority, completionTimePriorityPre, completionTimeRoundRobin, completionTimeNew];
    let cs = [ganttFCFS.length - 1];
    // let cs = [ganttFCFS.length - 1, ganttSJFNonPre.length - 1, ganttSJFPre.length - 1, ganttLJFNonPre.length - 1, ganttLJFPre.length - 1, ganttPriorityNonPre.length - 1, ganttPriorityPre.length - 1, ganttRoundRobin.length - 1, ganttProposed.length - 1];
    let cpuUtil = [];
    let throughput = [];
    let minArrivalTime = Number.MAX_VALUE;
    for (p in processes) {
        if (processes[p].arrival_time < minArrivalTime)
            minArrivalTime = processes[p].arrival_time;
    }
    for (i in cs) {
        if (i != cs.length - 1) {
            cpuUtil.push(ct[i] / (ct[i] + cs[i]));
            throughput.push(processes.length / (ct[i] + cs[i] - minArrivalTime));
        } else {
            cpuUtil.push(ct[i] / (ct[i] + cs[i]));
            throughput.push(processes.length / (ct[i] + cs[i]));
        }
    }
    let throughputRank = [];
    let cpuUtilRank = [];
    let wtRank = [];
    let tatRank = [];
    let rtRank = [];
    let rank = [];
    throughputRank = calculateRank(throughput, 0);
    cpuUtilRank = calculateRank(cpuUtil, 0);
    wtRank = calculateRank(wt, 1);
    tatRank = calculateRank(tat, 1);
    rtRank = calculateRank(rt, 1);

    let minRank = Number.MAX_VALUE;
    for (a in algorithms) {
        if (checked[a]) {
            rank[a] = (wtRank[a] + tatRank[a] + cpuUtilRank[a] + throughputRank[a] + rtRank[a]) / 5;
            if (rank[a] < minRank)
                minRank = rank[a];
        }
    }
    for (a in algorithms) {
        if (checked[a] && rank[a] === minRank) {
            bestAlgo.push({
                algorithm: algorithms[a],
                cpu_util: (cpuUtil[a] * 100).toFixed(2) + " %",
                throughput: (throughput[a] * 100).toFixed(2) + " % (Process per unit time)",
                tat: tat[a].toFixed(2),
                wt: wt[a].toFixed(2),
                rt: rt[a].toFixed(2)
            });
        }
    }
}