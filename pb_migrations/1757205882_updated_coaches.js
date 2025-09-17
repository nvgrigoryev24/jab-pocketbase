/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1430284431")

  // remove field
  collection.fields.removeById("geoPoint1542800728")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1430284431")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "geoPoint1542800728",
    "name": "field",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "geoPoint"
  }))

  return app.save(collection)
})
