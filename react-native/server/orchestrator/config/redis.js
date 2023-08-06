const Redis = require("ioredis")
const redis = new Redis({
  port: 11842, // Redis port
  host: "redis-11842.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PW,
})

module.exports = redis