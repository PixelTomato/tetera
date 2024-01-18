function readFile(path) {
    const request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);

    return request.responseText;
}

export { readFile };