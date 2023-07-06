var Connector = /** @class */ (function () {
    function Connector(printer, pcName, server) {
        this.operations = [];
        this.printer = "\\\\".concat(pcName, "\\\\").concat(printer);
        this.server = server;
    }
    Connector.prototype.text = function (text) {
        this.operations.push({
            action: 'text',
            data: text
        });
    };
    Connector.prototype.enter = function () {
        this.operations.push({
            action: "enter",
            data: ""
        });
    };
    Connector.prototype.feed = function (nLines) {
        if (Number.isInteger(nLines) && nLines > 0) {
            this.operations.push({
                action: "feed",
                data: nLines.toString()
            });
        }
    };
    Connector.prototype.fontSize = function (width, height) {
        if (Number.isInteger(width) && Number.isInteger(width)) {
            if (width >= 1 && width <= 8) {
                if (height >= 1 && height <= 8) {
                    this.operations.push({
                        action: "fontSize",
                        data: "".concat(width, ",").concat(height)
                    });
                }
            }
        }
    };
    Connector.prototype.fontType = function (fontType) {
        if (typeof fontType === "string") {
            fontType = fontType.toUpperCase();
            if (fontType === "A" || fontType === "B" || fontType === "C") {
                this.operations.push({
                    action: "fontType",
                    data: fontType
                });
            }
        }
    };
    Connector.prototype.alignment = function (alignment) {
        if (typeof alignment === "string") {
            alignment = alignment.toUpperCase();
            if (alignment === "L" || alignment === "C" || alignment === "R") {
                this.operations.push({
                    action: "alignment",
                    data: alignment
                });
            }
        }
    };
    Connector.prototype.boldText = function (isEnabled) {
        if (typeof isEnabled === "boolean") {
            this.operations.push({
                action: "boldText",
                data: isEnabled ? "1" : "0"
            });
        }
    };
    Connector.prototype.print = function () {
        var body = {
            operations: this.operations,
            printer: this.printer
        };
        try {
            fetch(this.server, {
                method: "POST",
                body: JSON.stringify(body)
            });
        }
        catch (error) {
            console.error(error);
        }
    };
    return Connector;
}());
