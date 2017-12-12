var config = {
    apiKey: "AIzaSyANcUOX0qXiutqPqBMCNUEIQc30nrTppq8",
    authDomain: "train-time-197d2.firebaseapp.com",
    databaseURL: "https://train-time-197d2.firebaseio.com",
    projectId: "train-time-197d2",
    storageBucket: "",
    messagingSenderId: "627419492606"
  };

firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destination = "";
var time = "";
var frecuency = 0;

$('#data-submit').on('click', function(){
    event.preventDefault();

    train = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    time = $('#time').val().trim();
    frecuency = $('#frecuency').val().trim();

    var newTrain = {
        train_name: train,
        destination: destination,
        schedule: time,
        frecuency: frecuency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }

    database.ref().push(newTrain);

    $('#train-name').val("");
    $('#destination').val("");
    $('#time').val("");
    $('#frecuency').val("");

});

database.ref().on('child_added', function(snapshot){
    var trainName = $('#trainName').addClass('striped');
    var desti = $('#desti').addClass('striped');
    var frec = $('#frec').addClass('striped');

    trainName.append('<tr><td>' + snapshot.val().train_name + '</td></tr>');
    desti.append('<tr><td>' + snapshot.val().destination + '</td></tr>');
    frec.append('<tr><td>' + snapshot.val().frecuency + ' min' + '</td></tr>');

    var currentTime = moment().format('HH:mm');
    $('#now-time').html('<h1>' + currentTime + '</h1>');

    

})








$('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });