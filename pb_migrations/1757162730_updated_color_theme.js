/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740924970")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number4159085377",
    "max": 100,
    "min": 0,
    "name": "transparency",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740924970")

  // remove field
  collection.fields.removeById("number4159085377")

  return app.save(collection)
})
