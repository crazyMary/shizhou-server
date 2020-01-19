const assert = require('assert')
const { MongoClient, ObjectID } = require('mongodb')
const { db: dbconf } = require('./conf')

class DB {
  static getInstance() {
    return DB.instance || (DB.instance = new DB())
  }

  constructor() {
    this.client = null
    this.connect()
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        MongoClient.connect(dbconf.url, (err, client) => {
          assert.equal(err, null)
          this.client = client.db(dbconf.name)
          resolve(this.client)
        })
      } else {
        resolve(this.client)
      }
    })
  }

  findOne(CLN, condition) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(CLN).findOne(condition, (err, docs) => {
          assert.equal(err, null)
          resolve(docs)
        })
      })
    })
  }

  find(CLN, condition, options) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        const result = db.collection(CLN).find(condition, options)
        result.toArray(function(err, docs) {
          assert.equal(err, null)
          resolve(docs)
        })
      })
    })
  }

  update(CLN, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(CLN).updateOne(json1, { $set: json2 }, (err, result) => {
          assert.equal(err, null)
          assert.equal(1, result.result.n)
          resolve(result)
        })
      })
    })
  }

  insert(CLN, ...rest) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(CLN).insertMany(rest, function(err, result) {
          assert.equal(err, null)
          assert.equal(1, result.result.n)
          resolve(result)
        })
      })
    })
  }

  remove(CLN, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(CLN).removeOne(json, function(err, result) {
          assert.equal(err, null)
          assert.equal(1, result.result.n)
          resolve(result)
        })
      })
    })
  }

  getObjectId(id) {
    return new ObjectID(id)
  }
}

module.exports = DB.getInstance()
