const conn = require('./../utils/dbconn');
const axios = require('axios');

/*
exports.getHome = (req, res) => {
    const { isloggedin } = req.session;
    console.log(`User logged in: ${isloggedin}`);

    res.render('index', { loggedin: isloggedin });
};
*/

/*
exports.getRegister = (req, res) => {
    var regError = false;
    const session = req.session;
    console.log(session);

    const { isloggedin } = req.session;
    console.log(`User logged in: ${isloggedin}`);

    res.render('register', { loggedin: isloggedin, regError: regError });
};
*/

exports.postRegister = (req, res) => {
    var message = "";

    const session = req.session;
    const { isloggedin } = req.session;

    //deconstructing and getting user info from registration input
    const { firstname, lastname, email, userpass } = req.body;
    const vals = [firstname, lastname, email, userpass];

    //variable for error message
    const nodata = "Please enter your first name, last name, email and password";

    //SQL to be used
    const checkdetailsSQL = `SELECT * FROM user WHERE email = '${email}'`;
    const insertSQL = 'INSERT into user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';


    conn.query(checkdetailsSQL, [email], async (err, result) => {
        if (err) throw err;

        //check if user has missed any input boxes
        if (!firstname || !lastname || !email || !userpass) {
            message = "Please enter your first name, last name, email and password";
            return res.render('register', { loggedin: isloggedin, regError: true, message: message });
            //return res.status(400).send('Please enter your first name, last name, email and password');
        } else if (result.length > 0) {
            //return res.render('register', { loggedin: isloggedin, errmsg: "email already in use" });
            message = 'Email has already been registered';
            return res.render('register', { loggedin: isloggedin, regError: true, message: message });
        } else {
            conn.query(insertSQL, vals, async (err, rows) => {
                if (err) throw err;
                //console.log(vals);

                res.redirect('login');
            });
        };
    });
};

/*
exports.getLogin = (req, res) => {
    var logError = false;
    const session = req.session;
    console.log(session);

    const { isloggedin } = req.session;
    console.log(`User logged in: ${isloggedin}`);

    res.render('login', { loggedin: isloggedin, logError: logError });
};
*/


exports.postLogin = (req, res) => {
    const session = req.session;
    console.log(session);

    const { email, userpass } = req.body;
    const vals = [email, userpass];
    console.log(vals);

    const checkuserSQL = `SELECT user_id, email, password 
    FROM user 
    WHERE user.email = '${email}' AND user.password = '${userpass}'`;

    conn.query(checkuserSQL, vals, (err, rows) => {
        if (err) throw err;

        const numrows = rows.length;
        console.log(numrows);

        if (numrows > 0) {
            console.log(rows);
            const session = req.session;
            session.isloggedin = true;
            session.userid = rows[0].user_id;
            console.log(session);
            //res.render('login', { logError: true, message: "Successfully logged in" });
            res.redirect('/dashboard');
        } else {
            //res.redirect('/');
            res.render('login', { loggedin: false, logError: true, message: "Incorrect email or password" });
        }
    });
};

// exports.getUsername = (req, res) => {

//     const getuserSQL = `SELECT * FROM user`;

//     conn.query(getuserSQL, (err, rows) => {
//         if (err) {
//             res.status(500);
//             res.json({
//                 status: 'failure',
//                 message: err
//             });
//         } else {
//             res.status(200);
//             console.log(rows);
//             res.json({
//                 status: 'success',
//                 message: `${rows.length} records retrieved from user table successfully`,
//                 result: rows
//             });
//         }
//     });
// };







exports.getDashboard = (req, res) => {

    //const { userid } = req.session;
    //console.log(`USER SIGNED IN AS ${userid}`);

    const selectSQL = `SELECT * FROM emotiondata`;

    conn.query(selectSQL, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200);
            //console.log(rows);
            res.json({
                status: 'success',
                message: `${rows.length} records retrieved dashboard data successfully`,
                result: rows
            });
        }
    });
};





/*
exports.getNewSnap = (req, res) => {
    const session = req.session;
    
    console.log(session);

    const { isloggedin, userid } = req.session;

    //const { isloggedin } = req.session;
    console.log(`User logged in: ${isloggedin}`);

    res.render('addsnapshot', { loggedin: isloggedin });
};
*/

exports.postNewSnapshot = (req, res) => {

    const newdata =

        axios
            .post(endpoint, newdata)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response.data);
                } else {
                    console.log(`Response status code: ${response.status}`);
                }
            })
            .catch((error) => {
                console.log(error.response);
            });

}


//POST /snapshots
exports.postNewSnap = (req, res) => {
    const { isloggedin, userid } = req.session;

    const { enjoyment, sadness, anger, contempt, disgust,
        fear, surprise, context, datetimerecord } = req.body;


    const vals = [enjoyment, sadness, anger, contempt, disgust, fear, surprise, context, datetimerecord, userid];

    const insertSQL = 'INSERT INTO emotiondata (enjoyment, sadness, anger, contempt, disgust, fear, surprise, context_trigger, date_time_record, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    conn.query(insertSQL, vals, (err, results) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(201);
            res.json({
                status: 'success',
                message: `Snapshot ${id} added successfully`
            });
            //res.redirect('dashboard');
        }
    });
    console.log(req.body);
};

exports.getSelectSnapshot = (req, res) => {

    //const endpoint = `http://localhost:3002/selectsnapshot/9`;

    /*
    fetch(endpoint)
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.log(error));
   */

    /*
    const axiosconfig = {method: 'GET'};
 
    axios(endpoint, axiosconfig)
    .then((response) => {
     if(response.status == 200) {
         console.log(response.data);
     } else {
         console.log(`Response status code: ${response.status}`);
     }
    })
    .catch((error) => {
     console.log(error);
    });
    */

    // const config = { validateStatus: (status) => { return status < 500 } };

    // axios
    //     .get(endpoint, config)
    //     .then((response) => {
    //         console.log('Promise resolved!');
    //         console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log('Promise rejected!');
    //         console.log(error.response);
    //     });

    const { id } = req.params;
    const selectSQL = `SELECT * FROM emotiondata WHERE emotion_data_id = ${id}`;
    conn.query(selectSQL, (err, rows) => {
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
                    message: `Record ID ${id} retrieved`,
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

}


//GET /snapshots/:id
/*
exports.selectSnapshot = (req, res) => {
    const session = req.session;

    console.log(session);

    const { isloggedin, userid } = req.session;

    const { id } = req.params;

    console.log(isloggedin);

    const selectSQL = `SELECT * FROM emotiondata WHERE emotion_data_id = ${id}`;
    conn.query(selectSQL, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            })
        } else {
            if (rows.length > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `Snapshot ${id} selected successfully`,
                    result: rows
                });

            } else {
                res.status(404);
                res.json({
                    status: 'failure',
                    message: `Invalid ID ${id}`
                })
            }

            //res.render('editsnapshot', {loggedin: isloggedin, details: rows});
        }
    });
};
*/


//PUT /snapshots/updatesnapshot
exports.updateSnapshot = (req, res) => {

    // const session = req.session;
    // const { isloggedin, userid } = req.session;

    const { id } = req.params;

    //const emotion_data_id = req.params.snapshotid;  
    const { context } = req.body;
    const vals = [context, id];
    //console.log('VALS ARE ' + vals);
    //console.log('PARAMS ARE ' + req.params);
    console.log(JSON.stringify(req.body));

    const updateSQL = `UPDATE emotiondata SET context_trigger = ? WHERE emotion_data_id = ?`;

    conn.query(updateSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            })
        } else {
            if (rows.affectedRows > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `Snapshot ${id} updated successfully`
                });
            } else {
                res.status(404);
                res.json({
                    status: 'failure',
                    message: `Invalid ID ${id}`
                });
            }    //res.redirect('/dashboard');
        }
    });
};


//DELETE /snapshots/deletesnapshot/:id
exports.deleteSnapshot = (req, res) => {
    //const run_id = req.params.id;

    const { id } = req.params;

    console.log('>>>>>>ID IS ' + id);

    const deleteSQL = `DELETE FROM emotiondata WHERE emotion_data_id = ${id}`;
    conn.query(deleteSQL, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            })
        } else {
            if (rows.affectedRows > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `Snapshot ${id} deleted successfully`
                });
            } else {
                res.status(404);
                res.json({
                    status: 'failure',
                    message: `Invalid ID ${id}`
                });
            }
            //res.redirect('/dashboard');
        }
    });
};


/*
exports.getLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
*/