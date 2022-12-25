const eq = document.getElementById("eq") as HTMLButtonElement;

async function generate_parsing_function() {
    let m = await WebAssembly.instantiateStreaming(fetch("./parser.wasm"), {
        env: {
            loggg: (x: number) => console.log(x)
        }
    });

    let parse = m.instance.exports["parse"] as () => number;
    let mem = m.instance.exports["memory"] as WebAssembly.Memory;
    mem.grow(1);

    return (str: string) => {
        const buf = new Uint8Array(mem.buffer)
        const enc = new TextEncoder()
        const s = enc.encode("\0" + str)

        buf.fill(0, 0, 128)
        buf.set(s)
        console.log(buf)
        const result = parse();
        console.log(result)
        return result
    }
}

generate_parsing_function().then((parse) => {
    let brackets_counter = 0;
    const screen = document.getElementsByTagName("input")[0];
    const buttons = document.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i += 1) {
        const btn = buttons[i];
        btn.addEventListener("click", function (ev) {
            switch (this.innerText) {
                case "C":
                    screen.value = "0";
                    break;
                case "DEL":
                    screen.value = screen.value.slice(0, screen.value.length - 1)
                    if (screen.value.length == 0) {
                        screen.value = "0";
                    }
                    break;
                case "()":
                    const last = screen.value[screen.value.length - 1]
                    if(/[0-9.]+/.test(last) && brackets_counter > 0) {
                        brackets_counter -= 1;
                        screen.value += ")"
                    } else {
                        brackets_counter += 1;
                        screen.value += "("
                    }
                    break;
                case ".":
                    screen.value += "."
                    break;
                case "+":
                    screen.value += "+"
                    break;
                case "-":
                    screen.value += "-"
                    break;
                case "*":
                    screen.value += "*"
                    break;
                case "/":
                    screen.value += "/"
                    break;
                case "=":
                    try {
                        screen.value = parse(screen.value).toString()
                    } catch {
                        alert("ERROR: Invalid Syntax")
                    }
                    break;
                case "|":
                    screen.value += "|"
                    break;
                case "0":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "0"
                    break;
                case "1":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "1"
                    break;
                case "2":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "2"
                    break;
                case "3":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "3"
                    break;
                case "4":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "4"
                    break;
                case "5":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "5"
                    break;
                case "6":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "6"
                    break;
                case "7":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "7"
                    break;
                case "8":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "8"
                    break;
                case "9":
                    if(screen.value == "0") screen.value = "";
                    screen.value += "9"
                    break;
            }
        });
    }
})