import fs from "fs";

/*
    When?
    What request?
    What response status?
    How long did it take?

    Log rotation:
        logs/
        ├── app-2026-08-23.log
        ├── app-2026-08-22.log
        ├── app-2026-08-21.log
        └── ...
    Log levels:
        TRACE
        DEBUG
        INFO
        WARN
        ERROR
        FATAL
    Structured logs
        {
            timestamp: "...",
            level: "info",
            method: "GET",
            url: "/todos",
            status: 200,
            duration: 125
        }
*/
export const logRequest = (req, res, next) =>{
    const startTime = Date.now()
    let logText = 
`REQUEST
Date:${new Date().toISOString()}
Url: ${req.headers?.referer}${req.originalUrl}
User Agent: ${req.headers['user-agent']}\n`

    res.on("finish", ()=>{
        const duration = Date.now() - startTime;
        logText += 
`${req.method} → ${req.originalUrl} → ${res.statusCode}
Message: ${res.statusMessage}
Duration: ${duration}ms
\n`
        fs.appendFile('./logs.txt', logText,(err)=>{
            if(err)
                console.error(err)
        })    // Non-bloking or Async method of file system
    })

    return next()
}