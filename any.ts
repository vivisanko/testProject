function Log(constructor: Function) {
    console.log("constructor", constructor);
}

function LogInside(target: any, name: string | symbol) {
    console.log("target", target);
    console.log("name", name);
}

function LogMethodInside(target: any, name: string | symbol) {
    console.log("target", target);
    console.log("name", name);
}