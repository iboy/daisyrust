      $(document).ready(function() {

        var sciBG = document.getElementById("Sci-BG");
        var scienceDropdown = document.getElementById("Science_Dropdown");

        var techBG = document.getElementById("Tech-BG");
        var techDropdown = document.getElementById("Tech_Dropdown");

        var engBG = document.getElementById("Eng-BG");
        var engDropdown = document.getElementById("Eng_Dropdown");

        var artsBG = document.getElementById("Arts-BG");
        var artsDropdown = document.getElementById("Arts_Dropdown");

        var mathsBG = document.getElementById("Maths-BG");
        var mathsDropdown = document.getElementById("Maths_Dropdown");
// Steam Divs
        //var steamdiv = document.getElementById("steam");
        //var steam2div = document.getElementById("steam2");
        //var steam3div = document.getElementById("steam3");
        //var steam4div = document.getElementById("steam4");


        // reposition some of the elements
        //TweenLite.set("#CLUB", {
        //  visibility: "hidden"
        //});
        
        
// Repoistion CAMP letters
        //TweenLite.set("#CAMP", {
        //  y: "40px"
        //});
// rotate Steam Elements
        //TweenLite.set(steamdiv, {
        //  rotation: "90"
        //});
        //TweenLite.set(steam2div, {
        //  rotation: "180"
        //});
        //
        //TweenLite.set(steam3div, {
        //  rotation: "90"
        //});

// Reposition dropdowns. This leads to a visual glitch on reload - so avoid this.
       //TweenLite.set(scienceDropdown, {
       //  y: "-60px"
       //});
       //TweenLite.set(techDropdown, {
       //  y: "-60px"
       //});
       //TweenLite.set(engDropdown, {
       //  y: "-60px"
       //});
       //TweenLite.set(artsDropdown, {
       //  y: "-60px"
       //});
       //TweenLite.set(mathsDropdown, {
       //  y: "-60px"
       //});

       // TweenLite.set("#steam", {
       //   opacity: "0"
       // });
       // TweenLite.set("#steam2", {
       //   opacity: "0"
       // });
       // TweenLite.set("#steam3", {
       //   opacity: "0"
       // });
       // TweenLite.set("#steam4", {
       //   opacity: "0"
       // });

        // helpers to move the objects

        function bounceDropdowns(dropdownElement, midPoint, endPoint, thisduration) {

          
          TweenMax.to(dropdownElement, thisduration / 4, {
            y: midPoint,
            ease: Power2.easeOut
          });
          TweenMax.to(dropdownElement, thisduration / 2, {
            y: endPoint,
            ease: Bounce.easeOut,
            delay: thisduration / 4
          });
             
      };
      

      

      function SciObjectsAnimations() {
        
        TweenLite.to("#S-Object", 1, {
          rotation: 360,
          transformOrigin: "center center"
        });
        //TweenLite.to("#steam", 2, {
        //  opacity: "1"
        //});
        TweenLite.to("#S-Gear", 1, {
          rotation: -360,
          transformOrigin: "center center"
        });
        
      }
      
      
    function resetSciObjectsAnimations() {
      
      
      
      TweenLite.set("#S-Object", {
        rotation: 0,
        transformOrigin: "center center"
      });
      //TweenLite.to("#steam", 2, {
      //  delay: "6",
      //  opacity: "0"
      //});
  
      TweenLite.set("#S-Gear", {
        rotation: 0,
        transformOrigin: "center center"
      });
      TweenLite.to("#S-Gear", 1, {
        rotation: -360,
        transformOrigin: "center center"
      });
      TweenLite.set("#S-Gear", {
        rotation: 0,
        transformOrigin: "center center"
      });
      
    }

// Attach mouse listeners onto elements
// Science    
 $("#Sci-BG").mouseenter(function(e) {
   bounceDropdowns(scienceDropdown,80,120, 1);
   SciObjectsAnimations();
   
 });
 
 $("#Sci-BG").mouseleave(function(e) {
   bounceDropdowns(scienceDropdown,120,80, 1);
   resetSciObjectsAnimations();
   
 });

// tech
 $("#Tech_BG").mouseenter(function(e) {
   bounceDropdowns(techDropdown,80,120, 1);
   
   //TweenLite.to("#steam2", 2, {
   //  opacity: "1"
   //});
   
 });
 
 $("#Tech_BG").mouseleave(function(e) {
   bounceDropdowns(techDropdown,120,80, 1);
   
   //TweenLite.to("#steam2", 2, {
   //  delay: "6",
   //  opacity: "0"
   //});
   
 });
 
// Eng
 $("#Eng_BG").mouseenter(function(e) {
   bounceDropdowns(engDropdown,80,120, 1);
   
   //TweenLite.to("#steam3", 2, {
   //  opacity: "1"
   //});
   
 });
 
 $("#Eng_BG").mouseleave(function(e) {
   bounceDropdowns(engDropdown,120,80, 1);
   //TweenLite.to("#steam3", 2, {
   //  delay: "6",
   //  opacity: "0"
   //});
   
 });
 
// Arts
 $("#Arts-BG").mouseenter(function(e) {
   bounceDropdowns(artsDropdown,80,120, 1);
   
 });
 
 $("#Arts-BG").mouseleave(function(e) {
   bounceDropdowns(artsDropdown,120,80, 1);
   
 });
 
 // Maths   
 $("#Math-BG").mouseenter(function(e) {
   bounceDropdowns(mathsDropdown,80,120, 1);
   TweenLite.to("#M-Handle", 4, {
     rotation: 360,
     transformOrigin: "9px 10px"
   });

   TweenLite.to("#M-Cog", 4, {
     rotation: 360,
     transformOrigin: "30px 30px"
   });
 });
 
 $("#Math-BG").mouseleave(function(e) {
   bounceDropdowns(mathsDropdown,120,80, 1);
   TweenLite.to("#M-Handle", 1, {
     rotation: 0,
     transformOrigin: "9px 10px"
   });

   TweenLite.to("#M-Cog", 1, {
     rotation: 0,
     transformOrigin: "30px 30px"
   });
 });



       
// these run on load

        TweenLite.to("#S-Gear", 1, {
          rotation: 360,
          transformOrigin: "center center"
        });

        TweenLite.set("#S-Gear", {
          rotation: 0,
          transformOrigin: "center center"
        });



        //TweenLite.to("#E-Top", 1, {rotation:2, transformOrigin:"-15px 5px"}); 

        //TweenLite.to("#E-Bottom", 1, {rotation:-10, transformOrigin:"-15px 55px"}); 

        // bouncing letters
        var mydelay = 2;
        // Letter C        
        var letterC = document.querySelector('#Camp_C');
        var circleC = document.querySelector('#Camp_C_Circle');
        // Letter A
        var letterA = document.querySelector('#Camp_A');
        var circleA = document.querySelector('#Camp_A_Circle');
        // Letter M
        var letterM = document.querySelector('#Camp_M');
        var circleM = document.querySelector('#Camp_M_Circle');
        // Letter P
        var letterP = document.querySelector('#Camp_P');
        var circleP = document.querySelector('#Camp_P_Circle');

        letterPulse(letterC, circleC, mydelay);
        letterPulse(letterA, circleA, mydelay + .1);
        letterPulse(letterM, circleM, mydelay + .2);
        letterPulse(letterP, circleP, mydelay + .3);

        function letterPulse(elem1, elem2, mydelay) {

          TweenMax.set(elem1, {
            transformOrigin: "50% 50% 0",
            scale: 1
          });
          TweenMax.set(elem2, {
            transformOrigin: "50% 50% 0",
            scale: 1
          });
          var overshoot = .9;
          var period = 0.3;
          (function bounce() {
            TweenMax.to(elem1, 0.5, {
              delay: mydelay,
              scale: 0.4,
              onComplete: function() {
                TweenMax.to(elem1, 1.4, {
                  scale: 1,
                  ease: Elastic.easeOut,
                  easeParams: [overshoot, period],
                  //onComplete:bounce
                })
              }
            })

            TweenMax.to(elem2, 0.5, {
              delay: mydelay,
              scale: 0.3,
              onComplete: function() {
                TweenMax.to(elem2, 1.4, {
                  scale: 1,
                  ease: Elastic.easeOut,
                  easeParams: [overshoot, period],
                  //onComplete:bounce
                })
              }
            })
          }());
        }

        // this hides the steam if it is resized.
        //$(window).resize(function() {
        //  $('#steam').hide();
        //  $('#steam2').hide();
        //  $('#steam3').hide();
        //  $('#steam4').hide();
        //});
        // useful - does action after resize is over...
        //var resizeId;
        //$(window).resize(function() {
        //    clearTimeout(resizeId);
        //    resizeId = setTimeout(doneResizing, 500);
        //});
        //
        //
        //function doneResizing(){
        //    //whatever we want to do 
        //}



      });
