module.exports = {
 dialect: 'postgres',
 port:'5433',
 host:'localhost',
 username: 'postgres',
 password: 'docker',
 database: 'GymPoint',
 define:{
    timestamps: true,
    underscored: true,
    underscoredAll: true,
 },
};
