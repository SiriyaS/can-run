async function callProcess(long, lat) {
    console.log("This is longitude " + long + "\tThis is latitude " + lat)
    // execute process
    var body = JSON.stringify({ "process": { "id": "f94911ae3c054e018d7be9bb", "title": "TMD forecast", "description": "พยากรณ์อากาศล่วงหน้า 7 วัน", "seemore": "", "inputs": { "input": [{ "id": "features", "title": "features", "description": "The features", "input": [{ "id": "input1", "required": true, "title": "Latitude", "format": "string", "value": lat.toString() }, { "id": "input2", "required": true, "title": "Longitude", "format": "string", "value": long.toString() }] }], "parameter": [{ "id": "parameter", "title": "parameter", "description": "", "input": [{ "id": "duration", "required": true, "title": "duration", "format": "string", "value": "7" }, { "id": "fields", "required": true, "title": "fields", "format": "string", "value": "rh,cond,rain,slp,tc_max,tc_min" }] }] }, "outputs": [{ "id": "result", "title": "result", "description": "The result features", "required": true, "format": "GeoJSON", "value": ["<collection-id>", "not specified"], "transmissionMode": "value" }], "response": "raw", "mode": "async", "createTemporary": false, "module": true, "public": false, "creator": true, "shareToMe": false, "owner": { "id": "62b143b82785dd14947b186d", "email": "can-run@gmail.com", "firstName": "can-run", "lastName": "gogo" }, "users": [], "createdAt": "2022-06-30T09:08:12.164Z", "createdBy": "62b143b82785dd14947b186d", "updatedAt": "2022-06-30T09:08:12.164Z", "updatedBy": "62b143b82785dd14947b186d", "order": 1 } })
    // console.log(body)

    // execute process
    var jobID = "";
    await $.ajax({
        type: "POST",
        url: "https://big-edu.vallarismaps.com/core/api/processes/1.0-beta/processes/f94911ae3c054e018d7be9bb/jobs",
        headers: {
            "API-Key": "bTFFNkgLwbufsljtfeu8d4f3nhvWNPaQcok7W3eQ3fjPha2JHbcg5ndvq82QbrJM",
            "Content-Type": "application/json"
        },
        data: body,
        dataType: "json",
        success: function (response) {
            // console.log("This is from execute process")
            // console.log(response);

            jobID = response.jobID
            // console.log(jobID);
        },
        error: function (errMsg) {
            alert("Some error occurred while getting data, please try again later\n", errMsg);
        }
    });

    // get job status
    var status = "";
    do {
        await $.ajax({
            type: "GET",
            url: `https://big-edu.vallarismaps.com/core/api/processes/1.0-beta/processes/f94911ae3c054e018d7be9bb/jobs/${jobID}`,
            headers: {
                "API-Key": "bTFFNkgLwbufsljtfeu8d4f3nhvWNPaQcok7W3eQ3fjPha2JHbcg5ndvq82QbrJM",
            },
            success: function (response) {
                // console.log("This is from get job status")
                // console.log(response);
                status = response.status
            },
            error: function (errMsg) {
                alert("Some error occurred while getting data, please try again later\n", errMsg);
            }
        });
    }
    while (status !== "successful");

    // get result
    var result_url = "";
    await $.ajax({
        type: "GET",
        url: `https://big-edu.vallarismaps.com/core/api/processes/1.0-beta/processes/f94911ae3c054e018d7be9bb/jobs/${jobID}/results`,
        headers: {
            "API-Key": "bTFFNkgLwbufsljtfeu8d4f3nhvWNPaQcok7W3eQ3fjPha2JHbcg5ndvq82QbrJM",
        },
        success: function (response) {
            // console.log("This is from get result")
            // console.log(response);
            result_url = response[0].value.inlineValue
        },
        error: function (errMsg) {
            alert("Some error occurred while getting data, please try again later\n", errMsg);
        }
    });

    // get json result
    var json_result = {};
    await $.ajax({
        type: "GET",
        url: result_url,
        success: function (response) {
            // console.log(response);
            json_result = response
        },
        error: function (errMsg) {
            alert("Some error occurred while getting data, please try again later\n", errMsg);
        }
    });
    return json_result;
}