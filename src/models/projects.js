const pool = require('./../config/database');

const index = async () => {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute('select * from projects');

    conn.release();

    return rows;
};

const show = async id => {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute('select * from projects where id = ?', [id]);

    conn.release();

    return rows[0];
};

const store = async data => {
    const conn = await pool.getConnection();
    const [
        rows,
    ] = await conn.execute(
        'insert into projects(active, client_id, domain, holder_name, document, registration_date, expiration_date, responsible_name, observations, ftp_host, ftp_user, ftp_password, db_host, db_user, db_password, hosting_name, hosting_ip, email_address, email_password, email_aborted, panelcontrol_address, panelcontrol_user, panelcontrol_password) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            data.active,
            data.client_id,
            data.domain,
            data.holder_name,
            data.document,
            data.registration_date,
            data.expiration_date,
            data.responsible_name,
            data.observations,
            data.ftp_host,
            data.ftp_user,
            data.ftp_password,
            data.db_host,
            data.db_user,
            data.db_password,
            data.hosting_name,
            data.hosting_ip,
            data.email_address,
            data.email_password,
            data.email_aborted,
            data.panelcontrol_address,
            data.panelcontrol_user,
            data.panelcontrol_password,
        ]
    );

    conn.release();

    return show(rows.insertId);
};

const update = async (id, data) => {
    const conn = await pool.getConnection();
    const [
        rows,
    ] = await conn.execute(
        'update projects set active=?,client_id=?,domain=?,holder_name=?,document=?,registration_date=?,expiration_date=?,responsible_name=?,observations=?,ftp_host=?,ftp_user=?,ftp_password=?,db_host=?,db_user=?,db_password=?,hosting_name=?,hosting_ip=?,email_address=?,email_password=?,email_aborted=?,panelcontrol_address=?,panelcontrol_user=?,panelcontrol_password=? where id=?',
        [
            data.active,
            data.client_id,
            data.domain,
            data.holder_name,
            data.document,
            data.registration_date,
            data.expiration_date,
            data.responsible_name,
            data.observations,
            data.ftp_host,
            data.ftp_user,
            data.ftp_password,
            data.db_host,
            data.db_user,
            data.db_password,
            data.hosting_name,
            data.hosting_ip,
            data.email_address,
            data.email_password,
            data.email_aborted,
            data.panelcontrol_address,
            data.panelcontrol_user,
            data.panelcontrol_password,
            id,
        ]
    );

    conn.release();

    return show(id);
};

const destroy = async id => {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute('delete from projects where id=?', [id]);

    conn.release();

    return { message: 'deleted' };
};

const getAllProjectsOfClient = async clientId => {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute('select * from projects where client_id = ?', [clientId]);

    conn.release();

    return rows;
};

module.exports = { index, show, store, update, destroy, getAllProjectsOfClient };
