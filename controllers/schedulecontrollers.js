const conn = require('./../utils/dbconn');
const axios = require('axios');


exports.getDashboard = (req, res) => {

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
            res.json({
                status: 'success',
                message: `${rows.length} records retrieved dashboard data successfully`,
                result: rows
            });
        }
    });
};



//POST /snapshots
exports.postNewSnap = (req, res) => {
    //const { isloggedin, userid } = req.session;

    // const vals = { enjoyment, sadness, anger, contempt, disgust,
    //     fear, surprise, context, datetimerecord, userid } = req.body;

    // const vals = {context, datetimerecord, userid } = req.body;

    // const vals = { datetimerecord, enjoyment, sadness, anger, contempt, disgust, fear, surprise, context };
    // console.log(JSON.stringify(vals));


    //const vals = {enjoyment, sadness, anger, contempt, disgust, fear, surprise, context, datetimerecord, userid};

    // const insertSQL = `INSERT INTO emotiondata (enjoyment, sadness, anger, contempt, disgust, fear, surprise, context_trigger, date_time_record, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // const insertSQL = `INSERT INTO emotiondata (context_trigger, date_time_record, user_id) VALUES (?, ?, ?)`;

    //const insertSQL = 'INSERT INTO `emotiondata` (`emotion_data_id`, `date_time_record`, `enjoyment`, `sadness`, `anger`, `contempt`, `disgust`, `fear`, `surprise`, `context_trigger`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    //const { isloggedin, userid } = req.session;

    const { enjoyment, sadness, anger, contempt, disgust,
        fear, surprise, context, datetimerecord } = req.body;

    const { isloggedin, userid } = req.body;

    const vals = [enjoyment, sadness, anger, contempt, disgust, fear, surprise, context, datetimerecord, userid];

    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(vals));

    const insertSQL = 'INSERT INTO emotiondata (enjoyment, sadness, anger, contempt, disgust, fear, surprise, context_trigger, date_time_record, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    conn.query(insertSQL, vals, (err, rows) => {
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
                message: `Snapshot added successfully for user ${userid}`
            });
        }
    });

};

exports.getSelectSnapshot = (req, res) => {

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





//PUT /snapshots/updatesnapshot
exports.updateSnapshot = (req, res) => {

    const { id } = req.params;

    const { context } = req.body;
    const vals = [context, id];

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
            }
        }
    });
};


//DELETE /snapshots/deletesnapshot/:id
exports.deleteSnapshot = (req, res) => {

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
        }
    });
};
