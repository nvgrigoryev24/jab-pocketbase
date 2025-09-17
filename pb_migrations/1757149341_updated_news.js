/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_987692768")

  // add field
  collection.fields.addAt(13, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_62739941",
    "hidden": false,
    "id": "relation1542800728",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "field",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_987692768")

  // remove field
  collection.fields.removeById("relation1542800728")

  return app.save(collection)
})
