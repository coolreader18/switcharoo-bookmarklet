# switcharoo bookmarklet
### Ah, the ol ' bookmarklet to easily switcharoo!

This is a tool to easily create and post a switcharoo to [/r/switcharoo/new](https://www.reddit.com/r/switcharoo/new). It uses api.reddit.com to get the link of the latest post there and inputs it into the comment field, then asks you for some info about the comment chain. It opens a new url, and bam! There's your switcharoo post.

## Usage

Copy everything from this file into a bookmark: [bookmarklet.js](bookmarklet.js). Then permalink to the comment that you'd like reply to, and click that bookmark. Follow the instructions, and congrats! You've made a switcharoo!

## Credit

[mrcoles' bookmarklet converter](https://github.com/mrcoles/bookmarklet) helped me with testing this, I'd recommend using it on [runkit](https://npm.runkit.com/bookmarklet) if you want to test something, just do
```
bookmarklet.convert(`code.code();
codecodecode;
code = code;`,{options});
```
for multiline code.
