const conn = require('./../utils/dbconn');

exports.getUserDetails = (req, res) => {
    const { id } = req.params;
    console.log(`>>>>>>>>> ${id}`);

    const getuserSQL = `SELECT user.first_name FROM user WHERE user.user_id = ${id}`;

    conn.query(getuserSQL, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            if (rows.length > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `${rows.length} records retrieved`,
                    result: rows
                });
            } else {
                res.status(404);
                res.json({
                    status: 'failure',
                    message: `Invalid ID ${id}`
                });
            }
        }
    });
};


