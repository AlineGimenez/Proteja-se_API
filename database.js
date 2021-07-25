const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'ypaeaffputurlq',
    password: '6f4e0c5cb622ae39c06909ec958998bc13a557a8a10b7841f0e0d5d12b6fccee',
    host: 'ec2-54-145-249-177.compute-1.amazonaws.com',
    database: 'd994t1c2pvr9fj',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

// const script = 'CREATE TABLE IF NOT EXISTS credentials( uuid char(36) not null, tag_number char(11) not null, user_name varchar(50), privilege int not null, constraint uuid_pk primary key(uuid), constraint tag_number_uk unique(tag_number), constraint privilege_ck check(privilege in (0,1)) )'
// const script = 'DROP TABLE credentials';

// pool.query(script, function (error, result) {
//     if (error)
//         throw error;
//     else
//         console.log("Tabela criada com sucesso.");
// })

module.exports = {
    async readCredentials() {
        const sql = `SELECT * FROM credentials`;
        const result = await pool.query(sql);
        return result.rows;
    },

    async createTag(uuid, tag_number, user_name, privilege) {
        try {

            //privilege 0 (usuário comum), 1 (usuário privilegiado)
            const sql = `INSERT INTO credentials (uuid, tag_number, user_name, privilege) VALUES ($1, $2, $3, $4) `;
            const result = await pool.query(sql, [uuid, tag_number, user_name, privilege]);

            return result.rows;

        } catch (error) {
            console.log(error);
            return -1;
        }
    },

    async tagexist(tag_number) {
        const sql = `SELECT privilege FROM credentials WHERE tag_number = $1`;
        const result = await pool.query(sql, [tag_number]);
        //print(result);
        if (result.rows[0] != null) {
            return result.rows[0].privilege;
        }
        else {
            return null;
        }
    },
}