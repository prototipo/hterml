## Usage

You only have to download the lastest release.

Files to be edited:

```bash
conf/user.json
```
default_user.json contains the basics to use the webpage, but you can change prompt, and configure the site.

### Available styles

```bash
whi_style (by default)
mod_style (terminal with colors)
pho_style (phosphor screen)
```

### dirsWithElements

Define every directory with its subdirectories.

The usual definition is:

```json
"~" :
{
    "some-things" : [ "directory" ],
    "funny-page"  : [ "symlink", "~/link/to/another/directory" ],
    "new-program" : [ "executable", "http://www.newprogram.com/program.exe" ],
    "content-av"  : [ "device", "documents/projectR.pdf" ],
    "image"       : [ "image", "http://lotsofcats.com/beautiful_cat.jpg" ],
    "ext-page"    : [ "archive", "http://www.hitsofthemoment.com/past.txt" ],
    "html-file"   : [ "file", "personal/itsgoingtocatit.txt" ]
}

```
From version 0.2, you can add subdirectories even if the father dir is not defined.
If you do it, a new directory will be added to the father directory, with all its corresponding subdirectories.

### commands

From version 0.3, you can define your own functions right here!
To do this, add the function name right here like this:

```json
"commands" :
{
    "84" : ["t", "thesimpsons", "???", 3]
}
```

Where:
- 84 is the number of the key that you want to push (visit http://www.theasciicode.com.ar/ to know which are the numbers).
- "t" is the key (it is only explanatory).
- "thesimpsons" is the command defined in custom_commands.js (it is important! It has to have the same name!).
- "???" is the definition (not so explanatory in this case...) of what the command does.
- 3 is the number of tabs printed in help (you will need to look when it looks fine).

In the file ```custom_commands.js``` you will need to define all the custom functions. Remember to add
```clearPrevious()``` at the beginning, in order to disable previous links, and ```printPrompt()``` at
the end, to have the new prompt printed out to the "terminal".

```bash
html/present.html
```
Here, you can put a presentation to your website.
It will appear every time the page is loaded (or the command clear is used).

If you want to add permanent links in this file (or to another link), you can add
the class ```permanent``` to the ```a``` object.

## Contribute

You can suggest more commands to be implemented, or implement them by yourself!

## Sample site

Site of the author:

https://www.cs.us.es/~dorellana