const SOURCECODE = `function sayHello() {
console.log('Hello, Elbrus');
}

sayHello();

/*
Your previous Plain Text content is preserved below:

This is just a simple shared plaintext pad, with no 
execution capabilities.

Enjoy your interview!
1+1
*/`;

let editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setValue(SOURCECODE);
editor.setOptions({
    fontSize: "22px",
    printMargin: false,
});

