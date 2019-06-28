const SOURCECODE = `function sayHello() {
console.log('Hello, Elbrus');
}

sayHello();

/*
It always seems impossible until it's done...

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
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true

});