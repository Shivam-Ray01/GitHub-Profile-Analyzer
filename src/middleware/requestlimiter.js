const requestCounts = new Map();

function requestLimiter(req, res, next){
    const ip = req.ip;
    const time = Date.now();
    const seconds = 60 * 1000;
    const maxRequests = 30;
    if (!requestCounts.has(ip)){
    requestCounts.set(ip, { count: 1, startTime: time });
    return next();
   }
   
    const record = requestCounts.get(ip);
    if (time - record.startTime >  seconds) {
    requestCounts.set(ip, { count: 1, startTime: time });
    return next();
   }
    if (record.count >= maxRequests) {
    return res.status(429).json({ success: false, message: "Already Too many requests!" });
   }
   record.count++;
   return next();
 
}
export{requestLimiter}