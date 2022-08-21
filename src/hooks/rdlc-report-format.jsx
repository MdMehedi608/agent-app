import printJS from "print-js";

export const RdlcReportAssignFormat = (reportFormat, data, rptTittle) =>{
    let sliceSize = 512;
    data = ("" + data).replace(/^[^,]+,/, ''); //Remove ^ from ParamCaption we use replace(/^[^,]+,/, '')
    data = ("" + data).replace(/\s/g, '');  //Remove space from ParamCaption we use replace(/[\s]/g, '')	

    //alert(data);
    let byteCharacters = window.atob(data);  //Bind with page by data         

    let byteArrays = [];
    //Convert to array
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    //Convert to blob and open file in different format
    if (reportFormat === "pdf") {
        let blob = new Blob(byteArrays, { type: "application/pdf" });
        let fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
    }
    if (reportFormat === "pdf-download") {
        let blob = new Blob(byteArrays, { type: "application/pdf" });
        let fileURL = window.URL.createObjectURL(blob);
        let anchor = document.createElement("a");
        anchor.download = rptTittle + ".pdf";
        anchor.href = fileURL;
        anchor.click();
    }
    else if (reportFormat === "print") {
        printJS({printable: data, type: 'pdf', base64: true});
    }
    else if (reportFormat === "viewer") {
        let blob = new Blob(byteArrays, { type: "application/pdf" });
        var fileURL = window.URL.createObjectURL(blob);
        const iframeEle = document.getElementById("iframe");
        if (iframeEle) {
            iframeEle.src = fileURL;
        }
    }

    else if (reportFormat === "WORD" || reportFormat === "word") {    
        let blob = new Blob(byteArrays, {type: "application/msword"});
        let blobURL = (window.URL || window.webkitURL).createObjectURL(blob);
        let anchor = document.createElement("a");
        anchor.download = rptTittle + ".doc";
        anchor.href = blobURL;
        anchor.click();
        // window.open(blobURL, '_blank');
    }
    else if (reportFormat === "Excel" || reportFormat === "excel") {
        let blob = new Blob(byteArrays, { type: "application/vnd.ms-excel" });
        let blobURL = (window.URL || window.webkitURL).createObjectURL(blob);
        let anchor = document.createElement("a");
        anchor.download = rptTittle + ".xls";
        anchor.href = blobURL;
        anchor.click();
        // window.open(blobURL, '_blank');
    }
  }