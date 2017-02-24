/**
 * @license
 * This file is part of hterml
 *
 * hterml is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * hterml is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with hterml.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Initial function
 */

function init() {
    setReadyKeyboard();
    setDefaults();
    setVariables();
    printCss();
}

/**
 * Function to define keyboard actions
 */

function setReadyKeyboard() {
    document.addEventListener('keydown', function(event) {
	    if (commands[event.keyCode]) {
		var command = commands[event.keyCode];
		console.log(command[1] + " executed\n");
		window[command[1]]();
	    } else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
		var command = commands["48-57,96-105"];
		console.log(command[1] + " executed");
		if (event.keyCode <= 57) {
		    window[command[1]](event.keyCode - 48);
		} else {
		    window[command[1]](event.keyCode - 96);
		}
	    } else {
		console.log("Click h for help")
	    }
	scrollDown();
	});
}

/**
 * Functions to load the user configuration
 */

function setDefaults() {
    username = "user";
    hostname = "host";
    style = "whi_style";
}

function setVariables() {
    $.getJSON("conf/user.json", function(json) {
	    setBasicVariables(json.basics);
	    setPathsWithPages(json.pathWithPages);
	    setDirsWithElements(json.dirsWithElements)
	});
    $.getJSON("conf/hterml.json", function(json) {
	    htermlVersion = json.version;
	    licenseString = json.license;
	    licenseString = licenseString.replace("<version>", htermlVersion);
	    commands = json.commands;
	});
}

function setBasicVariables(vars) {
    if ( vars.style ) {
	style = vars.style;
    }
    if ( vars.username ) {
	username = vars.username;
    }
    if ( vars.hostname ) {
	hostname = vars.hostname;
    }
    $( "#style" ).attr("href", getStyle());
}

function setPathsWithPages(vars) {
    for (path in vars) {
	pathsWithPages[path] = vars[path];
    }
}

function setDirsWithElements(vars) {
    for (dir in vars) {
	dirsWithElements[dir] = [];
	for (file in vars[dir]) {
	    dirsWithElements[dir].push(file);
	}
	dirsWithElements[dir].sort();
    }
    var dirs = dirsWithElements;
    dirsWithElements = {};
    for (dir in dirs) {
	console.log(dir);
	dirsWithElements[dir] = {};
	for (file in dirs[dir]) {
	    var f = dirs[dir][file];
	    dirsWithElements[dir][f] = vars[dir][f];
	    console.log(dirs[dir][file]);
	}
    }
}

/**
 * Getters
 */

function getStyle() {
    return 'styles/' + style + ".css";
}

function getCss() {
    var css = "";
    css += '<link id="style" rel="stylesheet" type="text/css" href="';
    css += getStyle();
    css += '">';
    return css;
}

function getFilepath(pagetitle, fpath) {
    var filepath = fpath;
    if (filepath == "") {
	var currentTitle = $( document ).find("title").text();
	if (pagetitle === currentTitle) {
	    filepath = ".";
	} else if (pagetitle.includes(currentTitle)) {
	    filepath = pagetitle.substring(currentTitle.length + 1);
	} else {
	    filepath = "..";
	}
    }
    return filepath;
}

function getPrePrompt() {
    return username + "@" + hostname + ":";
}

function getPrompt(e = "") {
    var prompt = getPrePrompt();
    if (e == "") {
	prompt += getPagetitle();
    } else {
	prompt += e
    }
    prompt += "$ ";
    return prompt;
}

function getPagetitle() {
    return $( document ).find("title").text();
}

/**
 * Printers
 */

function printCss() {
    $( "head" ).append(getCss());
}

function printCd(filepath) {
    $( "pre" ).append( "cd " + filepath + "\n" );
}

function printPrompt(e = "") {
    if (e == "") {
	$( "pre" ).append(getPrompt());
    } else {
	$( "pre" ).append(getPrompt(e));
    }
}

function printLs(pagetitle) {
    $( "pre" ).append("ls ");
    if (pagetitle != "~") $( "pre" ).append("-a");
    $( "pre" ).append("\n");
}

function printLd(filepath) {
    filepath = getPagetitle();
    if (filepath != "~") {
	var prevFilepath = filepath.split("/");
	prevFilepath.pop();
	prevFilepath = prevFilepath.join("/");
	$( "pre" ).append('<a class="current directory" onclick="appendData(\'' + filepath + '\')" href="#">.</a> <a class="current directory" onclick="appendData(\'' + prevFilepath + '\')" href="#">..</a> ');
    }
    if ( ! pathsWithPages[filepath] ) {
	if ( dirsWithElements[filepath] ) {
	    for (f in dirsWithElements[filepath]) {
		var fd = dirsWithElements[filepath][f];
		var fs = "";
		fs += '<a class="current ' + fd[0] + '" ';
		if ( fd[0] === "directory" ) {
		    fs += 'onclick="appendData(\'' + filepath + '/' + f + '\')" href="#"';
		} else if (fd[0] === "symlink" ) {
		    fs +=  'target="_blank" href="' + fd[1] + '"';
		} else if (fd[0] === "executable" ) {
		    fs += 'href="' + fd[1] + '"';
		} else if (fd[0] === "device" ) {
		    fs += '';
		} else if (fd[0] === "image" ) {
		    fs += 'target="_blank" href="' + fd[1] + '"';
		}else if (fd[0] === "archive" ) {
		    fs += 'href ="' + fd[1] + '"';
		}
		fs +=  '>' + f + '</a> ';
		$( "pre" ).append(fs);
	    }
	}
    }
    $( "pre" ).append("<br>");
}

function printPwd() {
    clearPrevious();
    $( "pre" ).append("pwd\n" + getPagetitle() + "\n");
    printFile();
}

function printLsa() {
    clearPrevious();
    printLs(getPagetitle());
    printLd();
    printPrompt();
}

function printFile(filename) {
    if (filename) {
	$.get(filename, function(data) {
		$( "pre" ).append(data);
		if (! filename.startsWith("html/")) {
		    printPrompt();
		} else {
		    printPrompt("/");
		    printCd("~");
		    printPrompt("~");
		    printLs("~");
		    reducedAppendData("~", "~");
		}
	    });
    }
    if ( ! filename ) {
	printPrompt();
    }
}

/**
 * Actions
 */

function welcome() {
    $( "body" ).empty();
    $( "body" ).append("<pre></pre>");
    // console.clear();
    printPrompt("/");
    $( "pre" ).append("present\n\n");

    $( "pre" ).append("Click h for help\n\n");
    printFile("html/present.html");
}

function appendData( pagetitle, filepath = "" ) {
    clearPrevious();
    var filepath = getFilepath(pagetitle, filepath);
    var filename = pathsWithPages[pagetitle];
    changeTitle(pagetitle);
    printCd(filepath);
    printPrompt();
    printLs(pagetitle);
    printLd(filepath);
    printFile(filename);
    scrollDown();
}

function reducedAppendData( pagetitle, filepath = "" ) {
    clearPrevious();
    var filepath = getFilepath(pagetitle, filepath);
    var filename = pathsWithPages[pagetitle];
    changeTitle(pagetitle);
    printLd(filepath);
    printFile(filename);
    scrollDown();
}

function clearPrevious() {
    $( "a" ).attr("onclick", "nothing()");
    $( "a" ).attr("class", "deprecated");
    $( "a" ).removeAttr("href");
}

function changeTitle(pagetitle) {
    $( document ).prop('title', pagetitle);
}

function clickLink(n) {
    var link = $( ".current:nth(" + n + ")" );
    if (link.attr("href") != "#") {
	goToLink(link.attr("href"));
    }
    $( link ).click();
}

function goToLink(link) {
    window.open(link, '_blank');
}

function scrollDown() {
    $("html, body").animate({ scrollTop: $( document ).height() }, "slow");
}

function nothing() {
    // And it does nothing... As expected...
    // Well, if you want, we can log something...
    console.log("It does nothing... What did you expect?");
    $("html, body").animate({ scrollTop: $( document ).height() }, "slow");
}

/**
 * Commands
 */

function about() {
    clearPrevious();
    $( "pre" ).append("about\n");
    $( "pre" ).append(licenseString);
    printPrompt();
}

function cd(n) {
    clickLink(n);
}

function clear() {
    welcome();
}

function help() {
    clearPrevious();
    $( "pre" ).append("help\n");
    for (c in commands) {
	var command = commands[c];
	$( "pre" ).append("  " + command[0] + "\t" + command[2] + "\t".repeat(command[3]) + "(" + command[1] + ")\n");
    }
    printPrompt();
}

function ls() {
    printLsa();
}

function pwd() {
    printPwd();
}

/**
 * Variables
 */

var username = "";
var hostname = "";
var style = "";
var pathsWithPages = {};
var dirsWithElements = {};
var htermlVersion = "0.0";
var licenseString = "";
var commands = {};

/**
 * Initializing webpage...
 */

init();


