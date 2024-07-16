const { error } = require("toastr");

const saveSuccessful = "Dokument sikeresen mentve";
const saveUnSuccessful = "Dokument mentése sikertelen";
const saveFailed = saveUnSuccessful;


const getSessionFromServer = (url) => {
        /* 
        template for url
        protocol://domain.postfix/session-data
        it returns an already rendered HTML for 
        easy fetchability
    */
    var sessionId = fetch(url).then(response => response.json()).then(data => data.sessionId).catch(error => toastr.error(error));
    return sessionId;
}

const getCSRFFromServer = (url) => {
        /* 
        template for url
        protocol://domain.postfix/csrf-token
        it returns an already rendered HTML for 
        easy fetchability
    */
    var sessionId = fetch(url).then(response => response.json()).then(data => data.csrfToken).catch(error => toastr.error(error));
    return sessionId;
}

const getDocFromServer = (url) => {
    /* 
        template for url
        protocol://domain.postfix/document/get_document/{file_name}
        it returns an already rendered HTML for 
        easy fetchability
    */
    var document = fetch(url).then((r) => {
        if(!r.ok)
            throw new Error(`HTTP status code ${r.status}:${r.statusText}`);
        return r.blob()
    }).then((docblob) => {
        let docfile = new File(docblob, "docname", {type: "text/html"});
        return docfile;
    });
    return document;
}

const saveDocToServer = (documentName, documentFile, domainName = "http://repatriation.hu", route = "/document/save_document/") => {
    /*
        it sends the document as a json string to the controller
        via POST method, as it is defined on the controller
        ONLY WORKS ON ALREADY EXISTING DOCUMENTS
    */
    let success = false;
    let url = domainName + route + documentName;
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(documentFile.text()),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function(data){
            if(data.success){
                toastr.success(saveSuccessful);
                success = true;
            }
            else{toastr.error(saveFailed);}
        },
    });
    return success;
}

// const saveAsNewDocToServer = (documentFile, domainName = "repatriation.hu", route = "/document/save_document/") => {
//     //create or render a new form for setting the name and author
//     var form = $("#form");


// };