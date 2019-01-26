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
          var tName = childSnapshot.val().trainName;
          var trainDestination = childSnapshot.val().destination;
          var trainFrequency = childSnapshot.val().frequency;
          var fTrain = childSnapshot.val().firstTrain;
  
          // First Train Starts
          // Note the ".subtract(1, "years")" method corrects the calculation after midnight for some reason.
          // Investigate further
          var fTrainConverted = moment(fTrain, "hh:mm").subtract(1, "years");
          console.log("First Train Converted: " +fTrainConverted);  // use for diffs
         
          // Current Time
          var now = moment(); 
          console.log("NOW: " +now);   // user for diffs
          console.log("Formatted NOW: " +moment(now).format("hh:mm"));  // use for display
         
          // Difference between start of first train and Current Time in minutes
          // Converted from HH:mm (from user input) to time.math for calculations
          var diffTime = now.diff(moment(fTrainConverted), "minutes");  
          console.log("Diff Time: " + diffTime);
  
          // Frequency of Train MINUS ((Difference in time from First Train to Current time) MOD (Frequency))
          // calculate  how many minutes away the train is
          var minsAway = (trainFrequency - (diffTime % trainFrequency));
          console.log("Remainder: " + (diffTime % trainFrequency));
          console.log("Next Train Minutes Away: " +moment(minsAway));
  
          // calculate when the train arrives next
          // Current Time + Minutes away
          var nextArrival = now.add(minsAway, "minutes").format("hh:mm a");
  
  
          $empTableBody = $("#empTable tbody");
          $empTableBody.append(tr);
          tr.append('<td>' +tName+ '</td>');
          tr.append('<td>' +trainDestination+ '</td>');
          tr.append('<td>' +trainFrequency+ '</td>');
          tr.append('<td>' +nextArrival+ '</td>');
          tr.append('<td>' +minsAway+ '</td>');
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