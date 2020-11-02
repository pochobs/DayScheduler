// show current date at top of page
var currentDate = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDate);

// pulls array of stored tasks for current date only or creates empty list
var savedTasks = JSON.parse(localStorage.getItem(currentDate)) || [];
// display saved tasks to page 
var renderTasks = function () {

    // iterates over saved tasks list
    for (var i=0; i < savedTasks.length; i++) {
        // for each child of the container div 
        $(".container").children().each(function() {
            // if get-hour text is equal to the saved tasks hour 
            if ($(this).find(".get-hour").text() === savedTasks[i].hour) {
                // then add the text from the array into the task-text text area on the page
                $(this).find(".task-text").val(savedTasks[i].text)
            }
        }  
    )}
    auditTasks();
};

// save task on save button click
$(".saveBtn").on("click", function() {
    // creating saved tasks array
    var savedTasksArr = [];

    // when clicking on save btn, it saves all tasks to array
    $(".container").children().each(function() {
        // saves values in array
        savedTasksArr.push({
          text: $(this)
            .find(".task-text")
            .val()
            .trim(),
          hour: $(this)
            .find(".get-hour")
            .text()
            .trim()
        })
    // checks if array has already been saved for current date
    if (!(localStorage.getItem(currentDate))) {
        localStorage.setItem(currentDate, JSON.stringify(savedTasksArr));
    }
    else {
        localStorage.removeItem(currentDate);
        localStorage.setItem(currentDate, JSON.stringify(savedTasksArr));
        }
    });
})

var auditTasks = function () {
    // get current hour
    var currentHour = moment().hours()
    // go through each of the time blocks
    $(".container").children().each(function() {
        // grabs hour from page
        var pageHour = $(this).find(".get-hour").text().trim();

        // grabs only the number
        var hour = parseInt(pageHour.split(" ")[0]);

        if (hour < 6) {
            hour = hour+12;
        }

        //remove any current classes
        $(this).find(".task-text").removeClass("present");
        $(this).find(".task-text").removeClass("future");
        $(this).find(".task-text").removeClass("past");


        if (hour === currentHour) {
            $(this).find(".task-text").addClass("present");
        } 
        
        else if (hour > currentHour) {
            $(this).find(".task-text").addClass("future");
        }
        else {
            $(this).find(".task-text").addClass("past");
        }
    })
};

setInterval(auditTasks, ((1000*60))*60);

renderTasks();