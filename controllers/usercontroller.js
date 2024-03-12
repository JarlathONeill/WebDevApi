const conn = require('./../utils/dbconn');
const axios = require('axios');

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


exports.postLogin = (req, res) => {

    const vals = { email, userpass } = req.body;
    console.log('>>>>>>>>VALS: ' + vals);

    const checkuserSQL = `SELECT user_id, email, password FROM user 
    WHERE user.email = '${email}' AND user.password = '${userpass}'`;

    conn.query(checkuserSQL, vals, (err, rows) => {
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
                res.status(401);
                res.json({
                    status: 'failure',
                    message: `Invalid user credentials`
                });
            }
        }
    });
};

exports.postRegister = (req, res) => {

    //deconstructing and getting user info from registration input
    const { firstname, lastname, email, userpass } = req.body;
    const vals = [firstname, lastname, email, userpass];

    const checkdetailsSQL = `SELECT * FROM user WHERE email = '${email}'`;
    const insertSQL = 'INSERT into user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';

    conn.query(checkdetailsSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            //console.log(`Length = ${rows.length}`);
            if (rows.length > 0) {
                res.status(401);
                res.json({
                    status: 'failure',
                    message: `Details already in use`,
                    result: rows
                });
            } else {
                conn.query(insertSQL, vals, (err, rows) => {
                    res.status(200);
                    res.json({
                        status: 'success',
                        message: `Registered new user`
                    });
                });
            }
        }
    });
}