const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        acentoAgudo: false,
        acentoCircunflexo: false,
        acentoTio: false,
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input

        document.getElementById("btn-iniciar").addEventListener("click", () => {
            this.open();
        })

        document.getElementById("entrada").addEventListener("focus", () => {
            this.close();
        })

        document.getElementById("entrada").addEventListener("focusout", () => {
            this.open();
        })
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        let keyLayout = [
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "a", "s", "d", "f", "g", "h", "j", "k", "l",
            "z", "x", "c", "v", "b", "n", "m",
            "´", "~", "^"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["p", "l", "m"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "´":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = '´';

                    keyElement.addEventListener("click", () => {
                        this._toggleAcentoAgudo();
                        let elems = document.querySelectorAll(".keyboard__key--wide");

                        [].forEach.call(elems, function (el) {
                            if (el.classList.contains('keyboard__key--active')) {
                                el.classList.toggle("keyboard__key--active");
                            }
                        });
                        keyElement.classList.toggle("keyboard__key--active", this.properties.acentoAgudo);
                    });

                    break;
                case "~":

                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = '~';

                    keyElement.addEventListener("click", () => {
                        this._toggleAcentoTio();
                        let elems = document.querySelectorAll(".keyboard__key--wide");

                        [].forEach.call(elems, function (el) {
                            if (el.classList.contains('keyboard__key--active')) {
                                el.classList.toggle("keyboard__key--active");
                            }
                        });
                        keyElement.classList.toggle("keyboard__key--active", this.properties.acentoTio);
                    });

                    break;
                case "^":

                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = '^';

                    keyElement.addEventListener("click", () => {
                        this._toggleAcentoCircunflexo();
                        let elems = document.querySelectorAll(".keyboard__key--wide");

                        [].forEach.call(elems, function (el) {
                            if (el.classList.contains('keyboard__key--active')) {
                                el.classList.toggle("keyboard__key--active");
                            }
                        });
                        keyElement.classList.toggle("keyboard__key--active", this.properties.acentoCircunflexo);
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value = keyElement.textContent;
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
        chutarLetra(this.properties.value);
        // console.log(this.properties.value)
        // let letrachutada = document.getElementById("letra-chutada").innerHTML = this.properties.value;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _toggleAcentoAgudo() {
        this.properties.acentoAgudo = !this.properties.acentoAgudo;
        this.properties.acentoCircunflexo = false;
        this.properties.acentoTio = false;

        for (let key of this.elements.keys) {

            if (key.childElementCount === 0) {
                if (key.textContent == "a" || key.textContent == "á" || key.textContent == "â" || key.textContent == "ã") {
                    key.textContent = this.properties.acentoAgudo ? "á" : "a";
                    //key = this.properties.acentoAgudo ? "á" : "a";
                }
                if (key.textContent == "e" || key.textContent == "é" || key.textContent == "ê") {
                    key.textContent = this.properties.acentoAgudo ? "é" : "e";
                }

                if (key.textContent == "i" || key.textContent == "í" || key.textContent == "î") {
                    key.textContent = this.properties.acentoAgudo ? "í" : "i";
                }

                if (key.textContent == "o" || key.textContent == "ó" || key.textContent == "ô" || key.textContent == "õ") {
                    key.textContent = this.properties.acentoAgudo ? "ó" : "o";
                }

                if (key.textContent == "u" || key.textContent == "ú" || key.textContent == "û") {
                    key.textContent = this.properties.acentoAgudo ? "ú" : "u";
                }
            }
        }
    },

    _toggleAcentoCircunflexo() {
        this.properties.acentoCircunflexo = !this.properties.acentoCircunflexo;
        this.properties.acentoAgudo = false;
        this.properties.acentoTio = false;

        for (let key of this.elements.keys) {

            if (key.childElementCount === 0) {
                if (key.textContent == "a" || key.textContent == "á" || key.textContent == "â" || key.textContent == "ã") {
                    key.textContent = this.properties.acentoCircunflexo ? "â" : "a";
                    //key = this.properties.acentoAgudo ? "á" : "a";
                }
                if (key.textContent == "e" || key.textContent == "é" || key.textContent == "ê") {
                    key.textContent = this.properties.acentoCircunflexo ? "ê" : "e";
                }

                if (key.textContent == "i" || key.textContent == "í" || key.textContent == "î") {
                    key.textContent = this.properties.acentoCircunflexo ? "î" : "i";
                }

                if (key.textContent == "o" || key.textContent == "ó" || key.textContent == "ô" || key.textContent == "õ") {
                    key.textContent = this.properties.acentoCircunflexo ? "ô" : "o";
                }

                if (key.textContent == "u" || key.textContent == "ú" || key.textContent == "û") {
                    key.textContent = this.properties.acentoCircunflexo ? "û" : "u";
                }
            }
        }
    },

    _toggleAcentoTio() {
        this.properties.acentoTio = !this.properties.acentoTio;
        this.properties.acentoAgudo = false;
        this.properties.acentoCircunflexo = false;

        for (let key of this.elements.keys) {

            if (key.childElementCount === 0) {
                if (key.textContent == "a" || key.textContent == "á" || key.textContent == "â" || key.textContent == "ã") {
                    key.textContent = this.properties.acentoTio ? "ã" : "a";
                }
                if (key.textContent == "e" || key.textContent == "é" || key.textContent == "ê") {
                    key.textContent = "e";
                }

                if (key.textContent == "i" || key.textContent == "í" || key.textContent == "î") {
                    key.textContent = "i";
                }

                if (key.textContent == "o" || key.textContent == "ó" || key.textContent == "ô" || key.textContent == "õ") {
                    key.textContent = this.properties.acentoTio ? "õ" : "o";
                }

                if (key.textContent == "u" || key.textContent == "ú" || key.textContent == "û") {
                    key.textContent = "u";
                }
            }
        }
    },


    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});