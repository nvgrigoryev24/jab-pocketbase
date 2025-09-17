/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4037094689")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "select665545587",
    "maxSelect": 1,
    "name": "link_target",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "_blank",
      "_self"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4037094689")

  // remove field
  collection.fields.removeById("select665545587")

  return app.save(collection)
})
