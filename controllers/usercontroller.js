const conn = require('./../utils/dbconn');
const bcrypt = require('bcrypt');

exports.getUserDetails = (req, res) => {
    const { id } = req.params;

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

//Bcrypt knowledge came from https://www.youtube.com/watch?v=AzA_LTDoFqY&ab_channel=SamMeech-Ward and 
//fellow student Brian O'Neill

exports.postLogin = async  (req, res) => {

    const { email, userpass } = req.body;
    const vals = [email, userpass];

    const checkuserSQL = `SELECT user_id, email, password FROM user 
    WHERE user.email = ?`


    conn.query(checkuserSQL, vals, async (err, rows) => {
            if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else if (rows.length > 0) {
            const hashUserpass = rows[0].password;

            if (hashUserpass) {

                const dbPassword = hashUserpass.toString('utf-8');

                const isValid = await bcrypt.compare(userpass, dbPassword);

                if (isValid) {
                    res.status(200);
                    return res.json({
                        status:'success',
                        message: 'Login successful',
                        result: rows
                    })
                } else {
                    res.status(401);
                    res.json({
                        status: 'failure',
                        message: `Invalid user credentials`
                    });
                }

            } else {
                res.status(404);
                res.json({
                    status: 'failure',
                    message: `Invalid user credentials`
                });
            }

        }
});
}


exports.postRegister = async (req, res) => {

    //deconstructing and getting user info from registration input
    const { firstname, lastname, email, userpass } = req.body;

    const securePass = await bcrypt.hash(userpass, 13);

    const vals = [firstname, lastname, email, securePass];

    const checkdetailsSQL = `SELECT * FROM user WHERE email = '${email}'`;
    const insertSQL = 'INSERT into user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';

    conn.query(checkdetailsSQL, vals, (err, rows) => {
        if (err) {
            res.status(500).json;
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            if (rows.length > 0) {
                res.status(401).json;
                res.json({
                    status: 'failure',
                    message: `Email already in use`,
                    //result: rows
                });
            } else {
                conn.query(insertSQL, vals, (err, rows) => {
                    res.status(200).json;
                    res.json({
                        status: 'success',
                        message: `Registered new user`,
                        result: rows
                    });
                });
            }
        }
    });
}