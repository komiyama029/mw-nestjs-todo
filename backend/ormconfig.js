module.exports = {
  // DB接続設定
  type: 'postgres',
  host: 'localhost',
  port: 5438,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadEntities: true,
  // マイグレーションの設定
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};
