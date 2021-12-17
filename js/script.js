const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
})

var year = new Date().getFullYear();

document.getElementById("year").innerHTML = year;


function get_date() {
    $.ajax({
        url: "https://www.hpb.health.gov.lk/api/get-current-statistical",
        type: 'GET',
        dataType: "json",
        success: function(data) {
            display_data(data);
        },
        error: function() {
            console.log("there is an error")
        }
    })
} 


function display_data(details) {
    var newCasesLocalSL = details.data.local_new_cases;
    var newDeathsLocalSL = details.data.local_new_deaths;
    var updatedTime = details.data.update_date_time;
    var activeCasesSL = details.data.local_active_cases;
    var totalCasesSL = details.data.local_total_cases;
    var totalDeathsSL = details.data.local_deaths;
    var totalRecoveredSL = details.data.local_recovered;

    var pcrCount = details.data.daily_pcr_testing_data[0].pcr_count;
    var pcrDate = details.data.daily_pcr_testing_data[0].date;

    var globalNew = details.data.global_new_cases;
    var globalNewDeaths = details.data.global_new_deaths;
    var globalTotal = details.data.global_total_cases;
    var globalDeaths = details.data.global_deaths;
    var globalRecovered = details.data.global_recovered;

    var totalPcr = details.data.total_pcr_testing_count;
    var totalAntigen = details.data.total_antigen_testing_count;

    $("#updated_date").text(updatedTime);
    $("#new-cases-local").text(newCasesLocalSL);
    $("#deaths-local").text(newDeathsLocalSL);
    $("#active-cases-local").text(activeCasesSL);
    $("#total-cases-local").text(totalCasesSL);
    $("#total-deaths-local").text(totalDeathsSL);
    $("#total-recovered-local").text(totalRecoveredSL);
    $("#pcr-date").text(pcrDate);
    $("#pcr-count").text(pcrCount);

    $("#new-cases-global").text(globalNew);
    $("#deaths-global").text(globalNewDeaths);
    $("#total-cases-Global").text(globalTotal);
    $("#total-deaths-global").text(globalDeaths);
    $("#global-recovered").text(globalRecovered);

    $("#total-pcr-count").text(totalPcr);
    $("#total-antigen-count").text(totalAntigen);
}

function local_storage() {

    $("#checkbox").change(function() {
        if(checkbox.checked) {
            localStorage.setItem("theme", "dark")
        } else {
            localStorage.setItem("theme", "light");
        }
    })

    if(localStorage.theme == "dark") {
        $("#checkbox").prop("checked", true);
        document.body.classList.toggle("dark");
    }

}

local_storage();

get_date();