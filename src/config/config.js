import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: "https://schoolpack.smart.edu.co/idiomas",
  loginPath: "/alumnos.aspx",
  username: process.env.USERNAME2,
  password: process.env.PASSWORD2
};
