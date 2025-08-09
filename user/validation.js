module.exports = function (req, res, next) {
    const name = req.body.username;
    const pw = req.body.pw;

    if(!name) return res.send("Enter a username.");
    else if(!pw || pw.length < 6) return res.send("Invalid password. Must be > 6.");

    next();
}