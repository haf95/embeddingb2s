// logging to the console
console.log("Hello from DS14");
let viz;
// Create a variable for the url
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
// Create a variable for the vizContainer
const vizContainer = document.getElementById("vizContainer");
// Create a variable for the viz options
const options = {
  device: "desktop",
  hideTabs: true,
};
const hideButton = document.getElementById("hidebutton");
hideButton.addEventListener("click", function () {
  console.log("Hello from the button!");
  viz.hide();
  showbutton.style.display = "inline";
  hideButton.style.display = "none";
});

const showbutton = document.getElementById("showbutton");
showbutton.addEventListener("click", function () {
  console.log("Showing the viz!");
  viz.show();
  showbutton.style.display = "none";
  hideButton.style.display = "inline";
});

const pdfbutton = document.getElementById("pdfbutton");
pdfbutton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

const powerpointbutton = document.getElementById("powerpointbutton");
powerpointbutton.addEventListener("click", function () {
  viz.showExportPowerPointDialog();
});

const crosstabbutton = document.getElementById("crosstabbutton");
crosstabbutton.addEventListener("click", function () {
  viz.showExportCrossTabDialog();
});
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
  showbutton.style.display = "none";
}

function getrangevalues() {
  // get the values from the input
  const minvalue = document.getElementById("minvalue").value;
  const maxvalue = document.getElementById("maxvalue").value;
  console.log(minvalue, maxvalue);
  //get the workbook
  const workbook = viz.getWorkbook();
  console.log(workbook);
  //get the active sheet -- dashboard
  const activesheet = workbook.getActiveSheet();
  console.log(activesheet);
  //get all the sheets in the dashboard
  const sheets = activesheet.getWorksheets();

  //apply the filter to the sheet with the sales measure
  const sheettofilter = sheets[1];
  sheettofilter.applyRangeFilterAsync("SUM(Sales)", {
    min: +minvalue,
    max: +maxvalue,
  });
}

document.getElementById("filterbutton").addEventListener("click", function () {
  getrangevalues();
});

document.addEventListener("DOMContentLoaded", initViz);
