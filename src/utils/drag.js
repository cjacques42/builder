export default function (element, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // if present, the header is where you move the DIV from:
    if (header) header.addEventListener("mousedown", dragMouseDown)

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closedrag() {
        // stop moving when mouse button is released:
        document.removeEventListener("mouseup", closedrag)
        document.removeEventListener("mousemove", elementDrag)
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.addEventListener("mouseup", closedrag)
        // call a function whenever the cursor moves:
        document.addEventListener("mousemove", elementDrag)
    }
}