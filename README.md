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

### pathWithPages

You have to use it only if you want to add some handmade links or words to the directory listing of some page.

Then, you need to put the link to the html page like this:

```json
"~/path/to/virtual-file" : "personal/something.html"
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
    "ext-page"    : [ "archive", "http://www.hitsofthemoment.com/past.txt" ]
}

```
Now, in version 0.2, you can add subdirectories even if the father dir is not defined.
If you do it, a new directory will be added to the father directory, with all its corresponding subdirectories.



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