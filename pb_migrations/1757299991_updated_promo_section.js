/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3425959852")

  // remove field
  collection.fields.removeById("text1367709617")

  // add field
  collection.fields.addAt(13, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor1367709617",
    "maxSize": 0,
    "name": "subtitle",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "editor"
  }))

  // update field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "select3022959849",
    "maxSelect": 1,
    "name": "card_width",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "narrow",
      "medium",
      "wide"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3425959852")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1367709617",
    "max": 300,
    "min": 20,
    "name": "subtitle",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("editor1367709617")

  // update field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "select3022959849",
    "maxSelect": 1,
    "name": "card_width",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "narrow",
      "medium"
    ]
  }))

  return app.save(collection)
})
