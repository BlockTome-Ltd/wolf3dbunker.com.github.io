// +------------------------------------------------------------+
// | yx_menu                         Version 6                  |
// | Copyright 1999  Xin Yang        yangxin@iname.com          |
// | Created 11/03/1999              Last Modified 04/11/2000   |
// | Web Site:                       http://yx.webprovider.com  |
// +------------------------------------------------------------+
// | Copyright 1999,2000  Xin Yang   All Rights Reserved.       |
// +------------------------------------------------------------+
// | For personal purpose, send me your URL and put a link back |
// | to my web site, then you can use this script free.         |
// |                                                            |
// | For commercial purpose, obtain quotation for referencing,  |
// | using, hosting, selling or distributing this script.       |
// |                                                            |
// | In all cases copyright must remain intact.                 |
// +------------------------------------------------------------+

// Script begins

var isIE4 = false;
var isNN4 = false;

var flagMenu = "M";
var flagLink = "L";
var flagCommand = "C";
var flagSeparator = "S";

var titleWidth = 9; // title character width
var titleHeight = 15; // title character height
var charWidth = 6; // item character width
var charHeight = 13; // item character height

var titleNormal = "#660000"; // menu title pad color
var titleHighlighted = "#660000"; // menu title pad highlighted color
var itemNormal = "#990000"; // menu item color
var itemHighlighted = "#000000"; // menu highlighted item color
var upperLine = "#660000"; // separator upper line color
var lowerLine = "#FF6666"; // separator lower line color

var borderSize = 1;
var marginSize = 4;
var marginString = "&nbsp;&nbsp;";
var subMenuFlagSize = 4;
var menuHolder = "menuHolder";

var menuOffsetX = new Array();
var menuOffsetY = borderSize * 2 + titleHeight;

var menuShown = -1;
var itemOn = false;
var nnWidth = 0, nnHeight = 0;

var menuItemCount = -1;
var menuItem = new Array();
var menuFolderCount = -1;
var menuFolder = new Array();
var menuFolderSwitch = new Array();
var menuWidth = new Array();
var itemLayer = new Array();
var menuLayer = new Array();
var menuDone = new Array();

function launchCommand(commandString) {
  eval(commandString);
}

function launchPage(pageURL) {
  document.location.assign(pageURL);
}

function clickMenu(menuNum,itemIndex) {
  var menuIndex = menuItem[menuNum][itemIndex].myFolder;
  var folderIndex = menuItem[menuNum][itemIndex].folder;
  var itemX = menuItem[menuNum][itemIndex].x;
  var itemY = menuItem[menuNum][itemIndex].y;

  if (menuItem[menuNum][itemIndex].type == flagMenu) {
    if (menuFolderSwitch[menuNum][folderIndex])
      hideMenu(menuNum,folderIndex)
    else
      showMenu(menuNum,folderIndex,itemX + menuWidth[menuNum][menuIndex] * charWidth + subMenuFlagSize,itemY);
  }
  else if (menuItem[menuNum][itemIndex].type == flagLink) {
    closeMenu(menuNum);
    launchPage(menuItem[menuNum][itemIndex].url);
  }
  else if (menuItem[menuNum][itemIndex].type == flagCommand) {
    closeMenu(menuNum);
    launchCommand(menuItem[menuNum][itemIndex].command);
  }
}

function titleOver() {
  itemOn = true;

  if (isIE4)
    this.style.backgroundColor = titleHighlighted
  else
    this.document.bgColor = titleHighlighted;
}

function titleOut() {
  itemOn = false;

  if (isIE4)
    this.style.backgroundColor = titleNormal
  else
    this.document.bgColor = titleNormal;
}

function mouseOver() {
  var menuNum = this.menuNum;
  var itemIndex = this.itemIndex;
  var menuIndex = menuItem[menuNum][itemIndex].myFolder;
  var menuLength = menuFolder[menuNum][menuIndex].length;
  var folderIndex = menuItem[menuNum][itemIndex].folder;
  var itemX = menuItem[menuNum][itemIndex].x;
  var itemY = menuItem[menuNum][itemIndex].y;
  var thisFolder = 0;
  var thisItem = 0;

  itemOn = true;

  if (menuItem[menuNum][itemIndex].type != flagSeparator) {
    if (isIE4) {
      this.style.backgroundColor = itemHighlighted;
    }
    else if (isNN4) {
      this.document.bgColor = itemHighlighted;
    }
  }

  for (var i = 0; i < menuLength; i++) {
    thisItem = menuFolder[menuNum][menuIndex][i];

    if (thisItem != itemIndex)
      if (menuItem[menuNum][thisItem].type == flagMenu) {
        thisFolder = menuItem[menuNum][thisItem].folder;

        if (menuFolderSwitch[menuNum][thisFolder])
          hideMenu(menuNum,thisFolder);
      }
  }

  if (menuItem[menuNum][itemIndex].type == flagMenu)
    if (!menuFolderSwitch[menuNum][folderIndex])
      showMenu(menuNum,folderIndex,itemX + menuWidth[menuNum][menuIndex] * charWidth + subMenuFlagSize,itemY);

  window.status = menuItem[menuNum][itemIndex].description;
  return true;
}

function mouseOut() {
  itemOn = false;

  if (isIE4)
    this.style.backgroundColor = itemNormal
  else if (isNN4)
    this.document.bgColor = itemNormal;

  window.status = "";
  return true;
}

function menuItemUnit() {
  this.type = "";
  this.name = "";
  this.description = "";
  this.url = "";
  this.command = "";
  this.menu = "";
  this.folder = -1;
  this.myFolder = -1;
  this.x = -1;
  this.y = -1;
}

function readMenu(menuNum,menuName) {
  var menu = eval(menuName);
  var menuLength = menu.length
  var thisFolder = ++menuFolderCount;

  menuFolder[menuNum][thisFolder] = new Array();
  menuFolderSwitch[menuNum][thisFolder] = false;
  menuWidth[menuNum][thisFolder] = 0;
  menuLayer[menuNum][thisFolder] = false;
  menuDone[menuNum][thisFolder] = false;

  for (var i = 0; i < menuLength; i++) {
    menuFolder[menuNum][thisFolder][i] = ++menuItemCount;
    itemLayer[menuNum][menuItemCount] = false;

    menuItem[menuNum][menuItemCount] = new menuItemUnit();
    menuItem[menuNum][menuItemCount].myFolder = thisFolder;
    menuItem[menuNum][menuItemCount].type = menu[i][0];
    menuItem[menuNum][menuItemCount].name = menu[i][1];
    menuItem[menuNum][menuItemCount].description = menu[i][2];

    if (menuWidth[menuNum][thisFolder] < (menuItem[menuNum][menuItemCount].name.length + marginSize))
      menuWidth[menuNum][thisFolder] = menuItem[menuNum][menuItemCount].name.length + marginSize;

    if (menuItem[menuNum][menuItemCount].type == flagMenu) {
      menuItem[menuNum][menuItemCount].menu = menu[i][3];
      menuItem[menuNum][menuItemCount].folder = menuFolderCount + 1;
      readMenu(menuNum,menuItem[menuNum][menuItemCount].menu);
    }
    else if (menuItem[menuNum][menuItemCount].type == flagLink) {
      menuItem[menuNum][menuItemCount].url = menu[i][3];
    }
    else if (menuItem[menuNum][menuItemCount].type == flagCommand) {
      menuItem[menuNum][menuItemCount].command = menu[i][3];
    }
    else if (menuItem[menuNum][menuItemCount].type != flagSeparator) {
      alert("Error found in " + menuName);
    }
  }
}

function getItem(menuNum,itemIndex,itemDimX,itemDimY,menuIndex) {
  var thisLayer = null;
  var subMenuFlag = (menuItem[menuNum][itemIndex].type == flagMenu)?"../images/subMenu.gif":"../images/onePixel.gif";
  var singleQuote = "'";
  var itemID = "m" + menuNum + "i" + itemIndex + "";
  var layerString = '<div id="' + itemID + '" style="position:absolute; width:' + itemDimX + '; background-color:' + itemNormal + '; visibility:hidden;"></div>';
  var htmlString = (menuItem[menuNum][itemIndex].type == flagSeparator)?('<table width=' + itemDimX +' height=2 cellpadding=0 cellspacing=0 border=0><tr align=left valign=bottom><td bgcolor=' + upperLine + '><img src="../images/onePixel.gif" width=1 height=1 border=0></td></tr><tr align=left valign=top><td bgcolor=' + lowerLine + '><img src="../images/onePixel.gif" width=1 height=1 border=0></td></tr></table>'):('<table width=' + itemDimX +' height=' + itemDimY + ' cellpadding=0 cellspacing=0 border=0><tr align=left valign=middle><td nowrap><span id="menuText"><a class="menu" href="javascript:clickMenu(' + menuNum + ',' + itemIndex + ')" onMouseOver="window.status=' + singleQuote + menuItem[menuNum][itemIndex].description + singleQuote + ';return true;">' + marginString + menuItem[menuNum][itemIndex].name + marginString + '</a></span></td><td><img src="' + subMenuFlag + '" width=4 height=7 border=0 align=right></td></tr></table>');

  if (!itemLayer[menuNum][itemIndex]) {
    itemLayer[menuNum][itemIndex] = true;

    if (isIE4) {
      document.all[menuHolder].insertAdjacentHTML("BeforeEnd",layerString);
      thisLayer = document.all[itemID];

      thisLayer.innerHTML = htmlString;
      thisLayer.style.zIndex = menuIndex * 2 + 1;

      thisLayer.onmouseover = mouseOver;
      if (menuItem[menuNum][itemIndex].type != flagSeparator)
        thisLayer.onmouseout = mouseOut;
    }
    else if (isNN4) {
      document.layers[itemID] = new Layer(itemDimX,document.layers[menuHolder]);
      thisLayer = document.layers[itemID];

      thisLayer.visibility = "hidden";
      thisLayer.document.open();
      thisLayer.document.writeln(htmlString);
      thisLayer.document.close();
      thisLayer.document.bgColor = itemNormal;
      thisLayer.zIndex = menuIndex * 2 + 1;

      thisLayer.onmouseover = mouseOver;
      if (menuItem[menuNum][itemIndex].type != flagSeparator)
        thisLayer.onmouseout = mouseOut;
    }

    thisLayer.itemIndex = itemIndex;
    thisLayer.menuNum = menuNum;
  }

  return itemID;
}

function getMenu(menuNum,menuIndex,menuDimX,menuDimY) {
  var menuID = "m" + menuNum + "f" + menuIndex + "";
  var menuPadX = 0;
  var menuPadY = 0;
  var layerString = "";
  var htmlString = "";

  if (!menuLayer[menuNum][menuIndex]) {
    menuLayer[menuNum][menuIndex] = true;

    menuPadX = menuDimX + borderSize * 2;
    menuPadY = menuDimY + borderSize * 2;
    layerString = '<div id="' + menuID + '" style="position:absolute; width:' + menuPadX + '; visibility:hidden;"></div>';
    htmlString = '<table width=' + menuPadX +' height=' + menuPadY + ' cellpadding=0 cellspacing=0 border=' + borderSize + '><tr align=left valign=middle><td></td></tr></table>';

    if (isIE4) {
      document.all[menuHolder].insertAdjacentHTML("BeforeEnd",layerString);

      document.all[menuID].innerHTML = htmlString;
      document.all[menuID].style.zIndex = menuIndex * 2;
    }
    else if (isNN4) {
      document.layers[menuID] = new Layer(menuPadX,document.layers[menuHolder]);

      document.layers[menuID].visibility = "hidden";
      document.layers[menuID].zIndex = menuIndex * 2;
      document.layers[menuID].document.open();
      document.layers[menuID].document.writeln(htmlString);
      document.layers[menuID].document.close();
    }
  }

  return menuID;
}

function showTitle(menuArray,menuMaxX,menuMaxY) {
  var menuCount = menuArray.length;
  var menuTitleID = "menuTitle";
  var menuTitleBGID = "menuTitleBG";
  var menuTitleX = 0;
  var menuTitleY = titleHeight;
  var menuTitleBGX = 0;
  var menuTitleBGY = menuTitleY + borderSize * 2;
  var itemLength = 0;
  var titleLength = 0;
  var divStringFG = "";
  var divStringBG = "";
  var htmlStringFG = "";
  var htmlStringBG = "";
  var thisLayer = null;

  htmlStringFG = ' cellpadding=0 cellspacing=0 border=0><tr align=center valign=millde>';
  for (var i = 0; i < menuCount; i++) {
    itemLength = 2 + menuArray[i][0].length;
    menuOffsetX[i] = titleLength * titleWidth;
    htmlStringFG += ('<td width=' + (itemLength * titleWidth) + ' height=' + menuTitleY + '><nobr><span id="titleText">&nbsp;<a class="menuTitle" href="javascript:openMenu(' + i + ')" onMouseOver="overMenu(' + i + '); window.status=window.defaultStatus; return true;">' + menuArray[i][0] + '</a>&nbsp;</span></nobr></td>');
    titleLength += itemLength;
  }
  menuTitleX = titleLength * titleWidth;
  menuTitleBGX = menuTitleX + borderSize * 2;

  htmlStringFG = '<table width=' + menuTitleX + ' height=' + menuTitleY + htmlStringFG + '</tr></table>';

  divStringFG = '<div id="' + menuTitleID + '" style="position:absolute; width:' + menuTitleX + '; background-color:' + titleNormal + '; visibility:hidden; z-index:2;"></div>';
  divStringBG = '<div id="' + menuTitleBGID + '" style="position:absolute; width:' + menuTitleBGX + '; visibility:hidden; z-index:1;"></div>';

  htmlStringBG = '<table width=' + menuTitleBGX +' height=' + menuTitleBGY + ' cellpadding=0 cellspacing=0 border=' + borderSize + '><tr><td></td></tr></table>';

  if (isIE4) {
    document.all[menuHolder].insertAdjacentHTML("BeforeEnd",divStringBG);
    document.all[menuTitleBGID].innerHTML = htmlStringBG;

    document.all[menuHolder].insertAdjacentHTML("BeforeEnd",divStringFG);
    thisLayer = document.all[menuTitleID];
    thisLayer.innerHTML = htmlStringFG;
  }
  else if (isNN4) {
    menuMaxX += menuTitleBGX;
    menuMaxY += menuTitleBGY;
    setMenuSize(menuMaxX,menuMaxY);

    document.layers[menuTitleBGID] = new Layer(menuTitleBGX,document.layers[menuHolder]);
    thisLayer = document.layers[menuTitleBGID];

    thisLayer.visibility = "hidden";
    thisLayer.document.open();
    thisLayer.document.writeln(htmlStringBG);
    thisLayer.document.close();
    thisLayer.zIndex = 1;

    document.layers[menuTitleID] = new Layer(menuTitleX,document.layers[menuHolder]);
    thisLayer = document.layers[menuTitleID];

    thisLayer.visibility = "hidden";
    thisLayer.document.open();
    thisLayer.document.writeln(htmlStringFG);
    thisLayer.document.close();
    thisLayer.document.bgColor = titleNormal;
    thisLayer.zIndex = 2;
  }

  thisLayer.onmouseover = titleOver;
  thisLayer.onmouseout = titleOut;

  moveLayerTo(menuTitleBGID,0,0);
  moveLayerTo(menuTitleID,borderSize,borderSize);
  showLayer(menuTitleBGID);
  showLayer(menuTitleID);
}

function showLayer(layerID) {
  if (isIE4)
    document.all[layerID].style.visibility = "visible"
  else if (isNN4)
    document.layers[layerID].visibility = "show";
}

function hideLayer(layerID) {
  if (isIE4)
    document.all[layerID].style.visibility = "hidden"
  else if (isNN4)
    document.layers[layerID].visibility = "hidden";
}

function moveLayerTo(layerID,x,y) {
  if (isIE4) {
    document.all[layerID].style.pixelLeft = x;
    document.all[layerID].style.pixelTop = y;
  }
  else if (isNN4) {
    document.layers[layerID].left = x;
    document.layers[layerID].top = y;
  }
}

function hideMenu(menuNum,menuIndex) {
  var menuLength = menuFolder[menuNum][menuIndex].length;
  var menuID = getMenu(menuNum,menuIndex,0,0);
  var itemID = "";
  var itemIndex = 0;

  for (var i = 0; i < menuLength; i++) {
    itemIndex = menuFolder[menuNum][menuIndex][i];

    if (menuItem[menuNum][itemIndex].type == flagMenu)
      if (menuFolderSwitch[menuNum][menuItem[menuNum][itemIndex].folder])
        hideMenu(menuNum,menuItem[menuNum][itemIndex].folder);

    itemID = getItem(menuNum,itemIndex,0,0,0);
    hideLayer(itemID);
  }

  hideLayer(menuID);

  menuFolderSwitch[menuNum][menuIndex] = false;
}

function showMenu(menuNum,menuIndex,menuX,menuY) {
  var itemDimY = menuY;
  var menuLength = menuFolder[menuNum][menuIndex].length;
  var menuDimX = menuWidth[menuNum][menuIndex] * charWidth + subMenuFlagSize;
  var menuID = "";
  var itemID = "";
  var itemIndex = 0;

  if (menuShown != -1 && menuShown != menuNum)
    hideMenu(menuShown,0);

  menuShown = menuNum;

  if (!menuDone[menuNum][menuIndex]) {
    for (var i = 0; i < menuLength; i++) {
      itemIndex = menuFolder[menuNum][menuIndex][i];

      menuItem[menuNum][itemIndex].x = menuX;
      menuItem[menuNum][itemIndex].y = itemDimY;
      itemDimY +=  (menuItem[menuNum][itemIndex].type != flagSeparator)?charHeight:2;

      itemID = getItem(menuNum,itemIndex,menuDimX,charHeight,menuIndex);

      moveLayerTo(itemID,menuItem[menuNum][itemIndex].x,menuItem[menuNum][itemIndex].y);
    }

    menuID = getMenu(menuNum,menuIndex,menuDimX,itemDimY-menuY);
    moveLayerTo(menuID,menuX-borderSize,menuY-borderSize);

    menuDone[menuNum][menuIndex] = true;
  }

  for (var i = 0; i < menuLength; i++)
    showLayer(getItem(menuNum,menuFolder[menuNum][menuIndex][i],0,0,0));

  showLayer(getMenu(menuNum,menuIndex,0,0));

  menuFolderSwitch[menuNum][menuIndex] = true;
}

function getMenuSizeX(menuNum,menuIndex) {
  var menuLength = menuFolder[menuNum][menuIndex].length;
  var itemIndex = 0;
  var thisMenuDimX = menuWidth[menuNum][menuIndex] * charWidth + subMenuFlagSize;
  var menuDimX = thisMenuDimX;
  var subMenuDimX = 0;

  for (var i = 0; i < menuLength; i++) {
    itemIndex = menuFolder[menuNum][menuIndex][i];

    if (menuItem[menuNum][itemIndex].type == flagMenu) {
      subMenuDimX = getMenuSizeX(menuNum,menuItem[menuNum][itemIndex].folder);

      if (menuDimX < (thisMenuDimX + subMenuDimX))
        menuDimX = thisMenuDimX + subMenuDimX;
    }
  }

  return menuDimX;
}

function getMenuSizeY(menuNum,menuIndex) {
  var menuLength = menuFolder[menuNum][menuIndex].length;
  var itemIndex = 0;
  var menuDimY = 0;
  var subMenuDimY = 0;
  var maxSubMenuDimY = 0;

  for (var i = 0; i < menuLength; i++) {
    itemIndex = menuFolder[menuNum][menuIndex][i];

    if (menuItem[menuNum][itemIndex].type == flagMenu) {
      subMenuDimY = getMenuSizeY(menuNum,menuItem[menuNum][itemIndex].folder);

      if (maxSubMenuDimY < (menuDimY + subMenuDimY))
        maxSubMenuDimY = menuDimY + subMenuDimY;

      menuDimY += charHeight;
    }
    else if (menuItem[menuNum][itemIndex].type == flagSeparator)
      menuDimY += 2
    else
      menuDimY += charHeight;
  }

  if (menuDimY < maxSubMenuDimY)
    return maxSubMenuDimY
  else
    return menuDimY;
}

function setMenuSize(menuDimX,menuDimY) {
  document.layers[menuHolder].clip.width=menuDimX;
  document.layers[menuHolder].clip.height=menuDimY;
}

function buildMenu(menuArrayName) {
  isIE4 = document.all;
  isNN4 = document.layers;

  var menuArray = eval(menuArrayName);
  var menuCount = menuArray.length;
  var menuSizeX = 0;
  var menuSizeY = 0;
  var menuMaxX = 0;
  var menuMaxY = 0;

  if (isIE4 || isNN4) {
    for (var i = 0; i < menuCount; i++) {
      menuItemCount = -1;
      menuFolderCount = -1;

      menuItem[i] = new Array();
      menuFolder[i] = new Array();
      menuFolderSwitch[i] = new Array();
      menuWidth[i] = new Array();

      itemLayer[i] = new Array();
      menuLayer[i] = new Array();
      menuDone[i] = new Array();

      readMenu(i,menuArray[i][1]);

      if (isNN4) {
        menuSizeX = getMenuSizeX(i,0) + borderSize * 2;
        menuSizeY = getMenuSizeY(i,0) + borderSize * 2;

        if (menuMaxX < menuSizeX)
          menuMaxX = menuSizeX;
        if (menuMaxY < menuSizeY)
          menuMaxY = menuSizeY;
      }
    }

    if (isNN4) {
      nnWidth = window.innerWidth;
      nnHeight = window.innerHeight;
      window.onResize = reloadMenu;
    }

    showTitle(menuArray,menuMaxX,menuMaxY);
    captureClick();
  }
}

function switchMenu() {
  if (!itemOn)
    if (menuShown != -1)
      closeMenu(menuShown);

  return true;
}

function captureClick() {
  if (isIE4)
    document.onclick = switchMenu;
  else {
    document.onClick = switchMenu;
    document.captureEvents(Event.CLICK);
  }
}

function reloadMenu() {
  if (nnWidth != window.innerWidth || nnHeight != window.innerHeight)
    document.location.reload();
}

function overMenu(menuNum) {
  if (menuShown != -1 && menuShown != menuNum)
    openMenu(menuNum);
}

function openMenu(menuNum) {
  if (menuShown == menuNum)
    closeMenu(menuNum)
  else
    showMenu(menuNum,0,borderSize + menuOffsetX[menuNum],borderSize + menuOffsetY);
}

function closeMenu(menuNum) {
  menuShown = -1;
  hideMenu(menuNum,0);
}

// Script ends