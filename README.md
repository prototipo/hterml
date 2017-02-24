## Usage

You only have to download the lastest release.

Files to be edited:

```conf/user.json```
default_user.json contains the basics to use the webpage, but you can change prompt, and configure the site.

# Available styles

```whi_style (by default)
mod_style (terminal with colors)
pho_style (phosphor screen)
```

# pathWithPages

You have to use it only if you want to add some handmade links or words to the directory listing of some page.

# dirsWithElements

Define every directory with its subdirectories.

The usual definition is:

```"~" :
{
    "some-things" : [ "directory" ],
    "funny-page"  : [ "symlink", "http://www.somefunnypage.com/go.html" ],
    "new-program" : [ "executable", "http://www.newprogram.com/program.exe" ],
    "image"       : [ "image", "http://lotsofcats.com/beautiful_cat.jpg" ],
    "int-page"    : [ "archive", "things/past.txt" ]
}
```

```html/present.html```
Here, you can put a presentation to your website.
It will appear every time the page is loaded (or the command clear is used).

## Contribute

You can suggest more commands to be implemented, or implement them by yourself!

## Sample site

Site of the author:

(https://www.cs.us.es/~dorellana)