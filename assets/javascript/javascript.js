$(document).ready(function(){

  // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAOwsgK4Ygz22q4AOIExME4FRxqnMTQRSk",
        authDomain: "hw-07-trainschedule.firebaseapp.com",
        databaseURL: "https://hw-07-trainschedule.firebaseio.com",
        projectId: "hw-07-trainschedule",
        storageBucket: "hw-07-trainschedule.appspot.com",
        messagingSenderId: "545033184118"
    };
    
    firebase.initializeApp(config);

    var database = firebase.database();


// Watchers

     // Firebase Watcher
     database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().firstTrain);
        var tr = $('<tr>');

        $empTableBody = $("#empTable tbody");
        $empTableBody.append(tr);
        tr.append('<td>' +childSnapshot.val().trainName+ '</td>');
        tr.append('<td>' +childSnapshot.val().destination+ '</td>');
        tr.append('<td>' +childSnapshot.val().frequency+ '</td>');
        tr.append('<td> Calculated Val </td>');
        tr.append('<td> Calculated Val </td>');
        $empTableBody.append('</tr>');
     });


// Even Triggers
     
    $(document).on("click", "#frmSubmit", function(){
        event.preventDefault();  //Prevent the Submit button from acting like a Submit button and do the following
        console.log("Add User was Clicked");
        var $trainName = $("#trainName");
        var $destination = $("#destination");
        var $firstTrain = $("#firstTrain");
        var $frequency = $("#frequency");
        console.log($trainName);
        console.log($destination);
        console.log($firstTrain);
        console.log($frequency);
        // Now add the variables to the Firebase DB
        database.ref().push({
            trainName: $trainName.val(),
            destination: $destination.val(),
            firstTrain: $firstTrain.val(),
            frequency: $frequency.val()
          });

          $trainName.val("");
          $destination.val("");
          $firstTrain.val("");
          $frequency.val("");

    });

    $(document).on("click", ".jumbotron", function(){
        // turn Jumbotron into a hyperlink and display full image of header...in a cool way
        $(".jumbotron").magnificPopup({
            items:{
                src:'assets/images/lirr.gif'
            },
            type: 'image'
        });
    });






});