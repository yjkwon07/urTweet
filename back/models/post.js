const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        sequelize,
      },
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User); // [UserId 생성 => User 를 리턴한다.]
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // [Post 명칭을 Retweet으로 모두 바꾼다 => RetweetId 생성]
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // [foreignKey 기준으로 PostId 가지고 => Likers를 리턴한다.]
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // [foreignKey 기준으로 PostId 가지고 => Hashtags를 리턴한다.]
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
  }
};
