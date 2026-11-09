// ----------------------
//     Menu Bar Setup
// ----------------------

var bunkerMenu = new Array();
bunkerMenu[0] = new Array("Home","BJmenuHome");
bunkerMenu[1] = new Array("  News","BJmenuNew");
bunkerMenu[2] = new Array("Source Code","BJmenuCode");
bunkerMenu[3] = new Array("Level Design","BJmenuLev");
bunkerMenu[4] = new Array("Add-Ons","BJmenuAdd");
bunkerMenu[5] = new Array("My Projects","BJmenuProj");
bunkerMenu[6] = new Array("Articles","BJmenuArts");
bunkerMenu[7] = new Array("Links","BJmenuLinks");

// ----------------------
//          Home
// ----------------------

var BJmenuHome = new Array();
BJmenuHome[0] = new Array("L","Return Home","Go back to the home page of the Bunker","welcome.htm");

// ----------------------
//          News
// ----------------------

var BJmenuNew = new Array();
BJmenuNew[0] = new Array("L","Newswire","Check out the latest happenings at the Bunker","news.htm");
BJmenuNew[1] = new Array("L","Latest Updates","View what was changed last time this site was updated","updates.htm");
BJmenuNew[2] = new Array("S","","","");
BJmenuNew[3] = new Array("L","Revision History","See a chronological list of changes to the Bunker","revhistory.htm");

// ----------------------
//      Source Code
// ----------------------

var BJmenuCode = new Array();
BJmenuCode[0] = new Array("L","A Brief Chronology","From the code`s release in 1995, to the present-day crop of Wolfenstein TCs","src-chron.htm");
BJmenuCode[1] = new Array("L","What You'll Need","What you`ll need to get a functional compile of the Wolfenstein source code","src-what.htm");
BJmenuCode[2] = new Array("M","Compiler Set-Up","How to set up your Borland compiler","BJmenuCode2");
BJmenuCode[3] = new Array("M","Tutorials","How to do basic stuff with the source code","BJmenuCode3");
BJmenuCode[4] = new Array("S","","","");
BJmenuCode[5] = new Array("M","Download","Get the stuff!","BJmenuCode4");

   var BJmenuCode2 = new Array();
   BJmenuCode2[0] = new Array("L","Borland C++ (BC) 3.1","Setting up Borland C++ 3.1","src-setupbc31.htm");
   BJmenuCode2[1] = new Array("L","Borland C++ (BC) 3.0","Setting up Borland C++ 3.0","src-setupbc30.htm");
   BJmenuCode2[2] = new Array("L","Borland Turbo C (TC) 3.0","Setting up Borland Turbo C 3.0","src-setuptc3.htm");

   var BJmenuCode3 = new Array();
   BJmenuCode3[0] = new Array("L","Changing ceiling colors","How to change the ceiling colors","tutorials/tut-ceil.htm");
   BJmenuCode3[1] = new Array("L","Changing the music order","How to select which song plays on which level","tutorials/tut-music.htm");
   BJmenuCode3[2] = new Array("L","Changing the secret elevator levels","How to choose where to put your secret elevators","tutorials/tut-elev.htm");
   BJmenuCode3[3] = new Array("L","Adding 2 new keys and bar icons","How to add two new keys with corresponding status bar icons","tutorials/tut-keys.htm");
   BJmenuCode3[4] = new Array("L","Seamless level progression with ratio reporting","How to eliminate episode separation but still report ratios after each level","tutorials/tut-seamless.htm");

   var BJmenuCode4 = new Array();
   BJmenuCode4[0] = new Array("L","Wolfenstein source code","The source code to the game itself","files/wolfsrc.zip");
   BJmenuCode4[1] = new Array("L","Borland C++ 3.1 compiler","The premiere compiler used by id Software and the Wolf3D experts!","http://www.test.com");
   BJmenuCode4[2] = new Array("L","VGA files","The proper versions of the VGA*.WL6 files, needed for use with a custom EXE","files/vgafiles.zip");
   BJmenuCode4[3] = new Array("L","Turbo C objects","Two pre-built OBJ files (needed for use with Borland Turbo C 3.0 only)","files/tcobj.zip");

// ----------------------
//      Level Design
// ----------------------

var BJmenuLev = new Array();
BJmenuLev[0] = new Array("L","Utilities","All the software you need to make your own Wolfenstein add-on","utilities.htm");
BJmenuLev[1] = new Array("S","","","");
BJmenuLev[2] = new Array("M","Design Tips","this is the first sub menu","BJmenuLev2");

var BJmenuLev2 = new Array();
BJmenuLev2[0] = new Array("L","Designing Good Levels","A basic to intermediate guide to designing memorable and realistic levels","w3dltips.htm");
BJmenuLev2[1] = new Array("L","Advanced Design Philosophies","Level design philosophies and tactics for the conscientious level developer","w3dadvtips.htm");

// ----------------------
//        Add-ons
// ----------------------

var BJmenuAdd = new Array();
BJmenuAdd[0] = new Array("L","TCs (stand-alone games)","View B.J.`s hand-picked list of stand-alone Wolfenstein games (all game files supplied)","addons/add-tcs.htm");
BJmenuAdd[1] = new Array("L","Wolfenstein 3-D","View B.J.`s hand-picked list of add-ons for Wolfenstein 3-D (game required)","addons/add-wolf.htm");
BJmenuAdd[2] = new Array("L","Spear of Destiny","View B.J.`s hand-picked list of add-ons for Spear of Destiny (game required)","addons/add-spear.htm");
BJmenuAdd[3] = new Array("S","","","");
BJmenuAdd[4] = new Array("L","Reviews","Read B.J.`s reviews of various add-on missions","reviews/index.htm");
BJmenuAdd[5] = new Array("S","","","");
BJmenuAdd[6] = new Array("L","Utilities","All the software you need to make your own Wolfenstein add-on","utilities.htm");

// ----------------------
//       Articles
// ----------------------

var BJmenuArts = new Array();
BJmenuArts[0] = new Array("L","Reviews","Read B.J.`s reviews of various add-on missions","reviews/index.htm");
BJmenuArts[1] = new Array("L","Editorials","A selection of editorial columns about all things Wolfenstein","editorials/index.htm");
BJmenuArts[2] = new Array("S","","","");
BJmenuArts[3] = new Array("L","About the Bunker","How the Bunker got its start, and who this B.J. Rowan guy is","about.htm");

// ----------------------
//      My Projects
// ----------------------

var BJmenuProj = new Array();
BJmenuProj[0] = new Array("M","The Renovation (BJ1)","My first Wolfenstein add-on, circa 1994 -- featured as Game C of Wolfmaster","BJmenuProj2");
BJmenuProj[1] = new Array("M","Conflict in the Fatherland (BJ2)","My second add-on, a collection of 60 world-class levels and other custom resources","BJmenuProj3");
BJmenuProj[2] = new Array("M","Project Totengraeber","My critically-acclaimed first stand-alone Wolf TC with source code changes","BJmenuProj4");
BJmenuProj[3] = new Array("S","","","");
BJmenuProj[4] = new Array("L","Upcoming...","A sneak peek at future Wolfenstein missions by B.J. Rowan...","upcomingproj.htm");

   var BJmenuProj2 = new Array();
   BJmenuProj2[0] = new Array("L","Info","Stats, backstory, and screen shots from The Renovation","bj1-info.htm");
   BJmenuProj2[1] = new Array("L","Download","Get The Renovation right now (requires 6-episode Wolf3D","files/bjw60.zip");

   var BJmenuProj3 = new Array();
   BJmenuProj3[0] = new Array("L","Info","Stats, backstory, and screen shots from Conflict in the Fatherland","bj2-info.htm");
   BJmenuProj3[1] = new Array("L","Download","Get Conflict in the Fatherland right now (requires 6-episode Wolf3D)","files/bjw60ii.zip");

   var BJmenuProj4 = new Array();
   BJmenuProj4[0] = new Array("L","Info","Stats, backstory, and screen shots from Project Totengraeber","toten.htm");
   BJmenuProj4[1] = new Array("L","Download","Get Project Totengraeber right now","files/toten-p2final.zip");
//   BJmenuProj4[2] = new Array("S","","","");
//   BJmenuProj4[3] = new Array("L","Phase 2...","The latest news on the forthcoming PT: Phase 2...","pt2-news.htm");

// ----------------------
//         Links
// ----------------------

var BJmenuLinks = new Array();
BJmenuLinks[0] = new Array("L","Links Page","View a list of other Wolfenstein sites on the Web","links.htm");
BJmenuLinks[1] = new Array("S","","","");
BJmenuLinks[2] = new Array("L","Get the Games!","Download the shareware version of Wolfenstein or Spear of Destiny!","gamedownload.htm");
