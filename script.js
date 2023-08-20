document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate-button");
    calculateButton.addEventListener("click", calculateResults);

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", resetFields);

    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", saveResults);
});

function calculateResults() {
    const totalDefects = parseInt(document.getElementById("total-defects").value);
    const whiteDotDefects = parseInt(document.getElementById("white-dot-defects").value);
    const scratchDefects = parseInt(document.getElementById("scratch-defects").value);
    const cuttingTraceDefects = parseInt(document.getElementById("cutting-trace-defects").value);
    const inspectionNumber = parseInt(document.getElementById("inspection-number").value);

    const whiteDotRatio = whiteDotDefects / totalDefects;
    const scratchRatio = scratchDefects / totalDefects;
    const cuttingTraceRatio = cuttingTraceDefects / totalDefects;
    const defectRate = totalDefects / inspectionNumber;

    document.getElementById("white-dot-result").textContent = `${(whiteDotRatio * 100).toFixed(2)}%`;
    document.getElementById("scratch-result").textContent = `${(scratchRatio * 100).toFixed(2)}%`;
    document.getElementById("cutting-trace-result").textContent = `${(cuttingTraceRatio * 100).toFixed(2)}%`;
    document.getElementById("defect-rate-result").textContent = `${(defectRate * 100).toFixed(2)}%`;
}

function resetFields() {
    const inputFields = document.querySelectorAll("input[type='number']");
    inputFields.forEach(field => field.value = "");

    const outputValues = document.querySelectorAll(".output-value");
    outputValues.forEach(output => output.textContent = "");
}

function saveResults() {
    const inspectionNumber = document.getElementById("inspection-number").value;
    const totalDefects = document.getElementById("total-defects").value;
    const whiteDotDefects = document.getElementById("white-dot-defects").value;
    const scratchDefects = document.getElementById("scratch-defects").value;
    const cuttingTraceDefects = document.getElementById("cutting-trace-defects").value;

    const csvContent = [
        ["檢驗數 Inspection Number (pcs)", inspectionNumber],
        ["總缺陷數 Total Defects (pcs)", totalDefects],
        ["白點缺陷數 White Dot Defects (pcs)", whiteDotDefects],
        ["刮痕缺陷數 Scratch Defects (pcs)", scratchDefects],
        ["切割痕跡缺陷數 Cutting Trace Defects (pcs)", cuttingTraceDefects]
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const today = new Date();
    const filename = `inspection_results_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.csv`;

    saveAs(blob, filename);
}
