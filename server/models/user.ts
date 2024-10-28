// server/models/user.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id?: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to check if the password matches
  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'USER',
      validate: {
        isIn: [['USER', 'ADMIN']],
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
