var PenguinPromise = d3.json("classData.json");


var classroom = [];//to be used in log only


PenguinPromise.then(
function(data)
{
    classroom = data; //this lets us do the things to test
    console.log("baller code bro", data);
                //prints the data in the console
    console.log(classroom.map(makeSummary));
                //wanted to print all of the summaries in the log, mad about map? -> finally worked when I added a classroom.map, that makes sense because I needed to tell it to do it for all of the objects in the array
    
    AllGrades(data); //this is the function that fills the table, starts line 103
    

},

function(err)
{
  console.log("this code is bad", err);      
})
//end of promise

//function to return a summary of a given penguin
var makeSummary = function(penguin)
{   
    var summary = {};
    summary.picture = penguin.picture;
    summary.meanQuiz = getMeanQuiz(penguin);//mad about map?
    summary.meanHomework = getMeanHomework(penguin);
    summary.meanTests = getMeanTests(penguin);
    summary.final = getFinal(penguin);
    summary.totalGrade = weightThisGrade(penguin);
   
    return summary;
}


//get Grade function
var getGrade = function(quiz)
{
    return quiz.grade;
}

//average quiz grade for a given penguin function
var getMeanQuiz = function(penguin)
{
    var quizzes = penguin.quizes;
    var quizgrades = quizzes.map(getGrade) //mad about map?
    var meanQuizzes = d3.mean(quizgrades)
    return meanQuizzes;
}

//average homework grade for a given penguin function
var getMeanHomework = function(penguin)
{
    var homeworks = penguin.homework;
    var homeworkgrades = homeworks.map(getGrade)
    var meanHomework = d3.mean(homeworkgrades)
    return meanHomework;
}

//average test grade for a given penguin function
var getMeanTests = function(penguin)
{
    var tests = penguin.test;
    var testGrades = tests.map(getGrade)
    var meanTest = d3.mean(testGrades)
    return meanTest;
}

//grade on final exam for a given penguin function
var getFinal = function(penguin)
{
    var final = penguin.final;
    var mappedFinal = final.map(getGrade)
    var meanFinal = d3.mean(mappedFinal)
    return meanFinal;
}

//final weighted grade for a given penguin function
var weightThisGrade = function(penguin)
{
    var QuizTotal = getMeanQuiz(penguin);
    var HomeworkTotal = getMeanHomework(penguin);
    var TestTotal = getMeanTests(penguin);
    var FinalTotal = getFinal(penguin);
    
    var weightedQuiz = .2 * QuizTotal;
    var weightedHomework = .15 * HomeworkTotal;
    var weightedTest = .3 * TestTotal;
    var weightedFinal = .35 * FinalTotal;
    
    var weightedGrade = weightedQuiz + weightedHomework + weightedTest + weightedFinal;
    
    return weightedGrade;
}




//working function to fill in the table with all of the data that we need
var AllGrades = function(penguin)
{
    var showPictures = 
        d3.select("tbody")
        .selectAll("tr")
        .data(penguin)
        .enter()
        .append("tr")
    
    showPictures.append("img")
    .attr("src", function(totals)
        {
            return "penguins/" + totals.picture
        })
    
    showPictures.append("td")
    .text(function(penguin)
        {
            return getMeanQuiz(penguin)
        })
    
    showPictures.append("td")
    .text(function(penguin)
        {
            return getMeanHomework(penguin)
        })
    showPictures.append("td")
    .text(function(penguin)
        {
            return getMeanTests(penguin)
        })
    showPictures.append("td")
    .text(function(penguin)
        {
            return getFinal(penguin)
        })
    showPictures.append("td")
    .text(function(penguin)
        {
            return weightThisGrade(penguin)
        })
    .attr("class", "totalGrade")
    .attr("id", function(penguin)
        {
            if(weightThisGrade(penguin) <= 70)
                {
                    return "distress"
                }
            else
                {
                    return "happy"
                }
        })
}

